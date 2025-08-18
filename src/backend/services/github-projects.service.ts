import { Octokit } from "@octokit/rest";
import { mkdirSync, existsSync, readFileSync, writeFileSync } from "fs";
import { dirname } from "path";

interface StatusCardData {
  title: string;
  icon: string;
  description: string;
  repository: string;
  url: string;
  progress: number;
  openIssues: number;
  totalIssues: number;
  features: Array<{ icon: string; text: string }>;
  status: "in-progress" | "planned" | "completed";
  gradientFrom: "primary" | "accent" | "secondary";
  lastUpdated: Date;
}

interface RepositoryProgress {
  name: string;
  url: string;
  openIssues: number;
  totalIssues: number;
  progress: number;
}

// Custom error to surface GitHub specifics up to the route
export class GitHubAPIError extends Error {
  status?: number;
  code?: string;
  rateLimit?: { limit?: number; remaining?: number; reset?: number };
  op?: string;
  constructor(
    message: string,
    options?: {
      status?: number;
      code?: string;
      rateLimit?: { limit?: number; remaining?: number; reset?: number };
      op?: string;
    },
  ) {
    super(message);
    this.name = "GitHubAPIError";
    this.status = options?.status;
    this.code = options?.code;
    this.rateLimit = options?.rateLimit;
    this.op = options?.op;
  }
}

function parseRateLimitHeaders(headers?: Record<string, string | undefined>) {
  if (!headers) return undefined;
  const limit = headers["x-ratelimit-limit"]
    ? Number(headers["x-ratelimit-limit"])
    : undefined;
  const remaining = headers["x-ratelimit-remaining"]
    ? Number(headers["x-ratelimit-remaining"])
    : undefined;
  const reset = headers["x-ratelimit-reset"]
    ? Number(headers["x-ratelimit-reset"])
    : undefined;
  if (limit == null && remaining == null && reset == null) return undefined;
  return { limit, remaining, reset };
}

function isOctokitRequestError(e: unknown): e is {
  status?: number;
  message: string;
  name?: string;
  response?: { headers?: Record<string, string | undefined> };
  request?: unknown;
} {
  return !!e && typeof e === "object" && "message" in e;
}

const REPOSITORIES = [
  { owner: "rollercoaster-dev", name: "openbadges-modular-server" },
  { owner: "rollercoaster-dev", name: "openbadges-ui" },
  { owner: "rollercoaster-dev", name: "openbadges-system" },
];

const STATUS_CARD_CONFIG = {
  coreEngine: {
    title: "Core Badge Engine",
    icon: "⚙️",
    description:
      "The foundational server that processes and validates Open Badges, handles credential verification, and manages the core badge ecosystem.",
    features: [
      { icon: "🔒", text: "Secure badge validation" },
      { icon: "📊", text: "Progress tracking" },
      { icon: "🔄", text: "Real-time updates" },
    ],
    status: "in-progress" as const,
    gradientFrom: "primary" as const,
  },
  userInterface: {
    title: "User Interface (Vue)",
    icon: "🎨",
    description:
      "Modern, accessible Vue.js components and interfaces that make badge management intuitive and engaging for neurodivergent users.",
    features: [
      { icon: "♿", text: "Accessibility focused" },
      { icon: "📱", text: "Mobile responsive" },
      { icon: "🎯", text: "User-centered design" },
    ],
    status: "in-progress" as const,
    gradientFrom: "accent" as const,
  },
  backendApi: {
    title: "Backend API",
    icon: "🔌",
    description:
      "RESTful API services that power the badge ecosystem, providing secure endpoints for badge creation, validation, and community features.",
    features: [
      { icon: "🚀", text: "High performance" },
      { icon: "🔐", text: "Secure authentication" },
      { icon: "📈", text: "Scalable architecture" },
    ],
    status: "in-progress" as const,
    gradientFrom: "secondary" as const,
  },
  communityFeatures: {
    title: "Open Badges System",
    icon: "🏆",
    description:
      "The complete open badges platform where server and UI meet to create the first fully open-source Rollercoaster.dev-powered system.",
    features: [
      { icon: "🔗", text: "Integrates core engine & UI" },
      { icon: "🌟", text: "Complete badge ecosystem" },
      { icon: "📖", text: "Fully open source" },
      { icon: "🚀", text: "Production-ready platform" },
      { icon: "🎯", text: "Reference implementation" },
    ],
    status: "in-progress" as const,
    gradientFrom: "secondary" as const,
  },
};

export class GitHubProjectsService {
  private octokit: Octokit;
  private cacheFilePath =
    process.env.RD_GITHUB_CACHE_FILE || "./.cache/github-status.json";
  private cache: {
    data: {
      coreEngine: StatusCardData;
      userInterface: StatusCardData;
      communityFeatures: StatusCardData;
    } | null;
    timestamp: number;
    ttl: number;
  } = {
    data: null,
    timestamp: 0,
    ttl: 5 * 60 * 1000, // 5 minutes
  };

  constructor(githubToken?: string) {
    this.octokit = new Octokit({
      auth: githubToken || process.env.GITHUB_TOKEN,
    });
    // Attempt to load cache from disk on startup
    this.loadCacheFromDisk();
  }

  /**
   * Public: get status card data with optional force refresh and stale allowance
   */
  async getStatusCardData(options?: {
    force?: boolean;
    allowStale?: boolean;
  }): Promise<{
    coreEngine: StatusCardData;
    userInterface: StatusCardData;
    communityFeatures: StatusCardData;
  }> {
    const force = options?.force === true;
    const allowStale = options?.allowStale !== false; // default true

    // Return fresh in-memory cache if valid and not forcing
    if (
      !force &&
      this.cache.data &&
      Date.now() - this.cache.timestamp < this.cache.ttl
    ) {
      return this.cache.data;
    }

    try {
      const fresh = await this.fetchAll();
      this.updateCache(fresh);
      this.saveCacheToDisk();
      return fresh;
    } catch (err) {
      // If rate-limited or failed, optionally return stale cache
      if (allowStale) {
        const stale = this.getCachedStatusCardData();
        if (stale) return stale;
      }
      throw err;
    }
  }

  /**
   * Public: refresh cache from GitHub
   */
  async refresh(): Promise<{
    coreEngine: StatusCardData;
    userInterface: StatusCardData;
    communityFeatures: StatusCardData;
  }> {
    const fresh = await this.fetchAll();
    this.updateCache(fresh);
    this.saveCacheToDisk();
    return fresh;
  }

  /**
   * Get cached data (memory or disk) without fetching
   */
  getCachedStatusCardData() {
    if (this.cache.data) return this.cache.data;
    // Try disk
    const disk = this.loadCacheFromDisk();
    return disk?.data || null;
  }

  /**
   * Internal: fetch all repos and map to status cards
   */
  private async fetchAll() {
    const repositoryData = await Promise.all(
      REPOSITORIES.map(async (repo) => {
        const progress = await this.fetchRepositoryProgress(
          repo.owner,
          repo.name,
        );
        return { name: repo.name, progress };
      }),
    );

    const coreEngineData = repositoryData.find(
      (r) => r.name === "openbadges-modular-server",
    );
    const userInterfaceData = repositoryData.find(
      (r) => r.name === "openbadges-ui",
    );
    const communityFeaturesData = repositoryData.find(
      (r) => r.name === "openbadges-system",
    );

    const now = new Date();

    return {
      coreEngine: {
        ...STATUS_CARD_CONFIG.coreEngine,
        ...coreEngineData?.progress,
        repository: coreEngineData?.name || "openbadges-modular-server",
        lastUpdated: now,
      } as StatusCardData,
      userInterface: {
        ...STATUS_CARD_CONFIG.userInterface,
        ...userInterfaceData?.progress,
        repository: userInterfaceData?.name || "openbadges-ui",
        lastUpdated: now,
      } as StatusCardData,
      communityFeatures: {
        ...STATUS_CARD_CONFIG.communityFeatures,
        ...communityFeaturesData?.progress,
        repository: communityFeaturesData?.name || "openbadges-system",
        lastUpdated: now,
      } as StatusCardData,
    };
  }

  private updateCache(data: {
    coreEngine: StatusCardData;
    userInterface: StatusCardData;
    communityFeatures: StatusCardData;
  }) {
    this.cache.data = data;
    this.cache.timestamp = Date.now();
  }

  /**
   * Fetch progress data for a specific repository using GraphQL
   */
  private async fetchRepositoryProgress(
    owner: string,
    name: string,
  ): Promise<RepositoryProgress> {
    const query = `
      query GetRepositoryProgress($owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
          name
          url
          openIssues: issues(states: OPEN) {
            totalCount
          }
          closedIssues: issues(states: CLOSED) {
            totalCount
          }
        }
      }
    `;

    type RepoGQLResponse = {
      repository: {
        name: string;
        url: string;
        openIssues: { totalCount: number };
        closedIssues: { totalCount: number };
      };
    };

    try {
      const response = await this.octokit.graphql<RepoGQLResponse>(query, {
        owner,
        name,
      });

      const repo = response.repository;
      const openIssues = repo.openIssues.totalCount;
      const closedIssues = repo.closedIssues.totalCount;
      const totalIssues = openIssues + closedIssues;
      const progress =
        totalIssues > 0 ? Math.round((closedIssues / totalIssues) * 100) : 0;

      return {
        name: repo.name,
        url: repo.url,
        openIssues,
        totalIssues,
        progress,
      };
    } catch (err) {
      // Surface rate-limit and status info
      const e = err as unknown;
      let status: number | undefined;
      let headers: Record<string, string | undefined> | undefined;
      let message = "GitHub GraphQL error";
      let code: string | undefined;

      if (isOctokitRequestError(e)) {
        status = e.status;
        headers = e.response?.headers;
        message = e.message || message;
        code = e.name;
      }

      const rateLimit = parseRateLimitHeaders(headers);

      throw new GitHubAPIError(message, {
        status,
        code,
        rateLimit,
        op: `fetchRepositoryProgress:${owner}/${name}`,
      });
    }
  }

  private ensureCacheDir() {
    const dir = dirname(this.cacheFilePath);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  }

  private loadCacheFromDisk(): {
    data: GitHubProjectsService["cache"]["data"];
    timestamp: number;
    ttl: number;
  } | null {
    try {
      if (!existsSync(this.cacheFilePath)) return null;
      const raw = readFileSync(this.cacheFilePath, "utf-8");
      type CacheData = GitHubProjectsService["cache"]["data"];
      const parsed = JSON.parse(raw) as {
        data: CacheData;
        timestamp: number;
        ttl: number;
      };
      // Convert dates back to Date objects
      if (parsed?.data) {
        const d = parsed.data as Record<string, StatusCardData>;
        for (const k of Object.keys(d)) {
          const item = d[k];
          if (item && item.lastUpdated)
            item.lastUpdated = new Date(item.lastUpdated as unknown as string);
        }
      }
      this.cache = {
        data: parsed.data || null,
        timestamp: parsed.timestamp || 0,
        ttl: parsed.ttl || this.cache.ttl,
      };
      return {
        data: this.cache.data,
        timestamp: this.cache.timestamp,
        ttl: this.cache.ttl,
      };
    } catch {
      // Ignore disk cache errors
      return null;
    }
  }

  private saveCacheToDisk() {
    try {
      this.ensureCacheDir();
      const serializable = {
        data: this.cache.data
          ? Object.fromEntries(
              Object.entries(this.cache.data).map(([k, v]) => [
                k,
                {
                  ...v,
                  lastUpdated:
                    (v.lastUpdated as Date)?.toISOString?.() || v.lastUpdated,
                },
              ]),
            )
          : null,
        timestamp: this.cache.timestamp,
        ttl: this.cache.ttl,
      };
      writeFileSync(
        this.cacheFilePath,
        JSON.stringify(serializable, null, 2),
        "utf-8",
      );
    } catch {
      // Swallow write errors to avoid breaking the API
    }
  }
}
