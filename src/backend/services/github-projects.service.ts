import { Octokit } from "@octokit/rest";

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
  }

  /**
   * Get status card data with in-memory caching
   */
  async getStatusCardData(): Promise<{
    coreEngine: StatusCardData;
    userInterface: StatusCardData;
    communityFeatures: StatusCardData;
  }> {
    // Check cache first
    if (this.cache.data && Date.now() - this.cache.timestamp < this.cache.ttl) {
      return this.cache.data;
    }

    // Fetch fresh data
    const repositoryData = await Promise.all(
      REPOSITORIES.map(async (repo) => {
        const progress = await this.fetchRepositoryProgress(
          repo.owner,
          repo.name,
        );
        return {
          name: repo.name,
          progress,
        };
      }),
    );

    // Map to status cards
    const coreEngineData = repositoryData.find(
      (r) => r.name === "openbadges-modular-server",
    );
    const userInterfaceData = repositoryData.find(
      (r) => r.name === "openbadges-ui",
    );
    const communityFeaturesData = repositoryData.find(
      (r) => r.name === "openbadges-system",
    );

    const result = {
      coreEngine: {
        ...STATUS_CARD_CONFIG.coreEngine,
        ...coreEngineData?.progress,
        repository: coreEngineData?.name || "openbadges-modular-server",
        lastUpdated: new Date(),
      } as StatusCardData,
      userInterface: {
        ...STATUS_CARD_CONFIG.userInterface,
        ...userInterfaceData?.progress,
        repository: userInterfaceData?.name || "openbadges-ui",
        lastUpdated: new Date(),
      } as StatusCardData,
      communityFeatures: {
        ...STATUS_CARD_CONFIG.communityFeatures,
        ...communityFeaturesData?.progress,
        repository: communityFeaturesData?.name || "openbadges-system",
        lastUpdated: new Date(),
      } as StatusCardData,
    };

    // Update cache
    this.cache.data = result;
    this.cache.timestamp = Date.now();

    return result;
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

    const response = await this.octokit.graphql<{
      repository: {
        name: string;
        url: string;
        openIssues: { totalCount: number };
        closedIssues: { totalCount: number };
      };
    }>(query, { owner, name });

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
  }
}
