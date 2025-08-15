import { ref, reactive } from "vue";

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

interface GitHubProjectsData {
  coreEngine: StatusCardData;
  userInterface: StatusCardData;
  backendApi: StatusCardData;
  communityFeatures: StatusCardData;
}

export function useGitHubProjects() {
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const projectData = reactive<GitHubProjectsData>({
    coreEngine: {
      title: "Core Badge Engine",
      icon: "⚙️",
      description: "Loading project status...",
      repository: "openbadges-modular-server",
      url: "https://github.com/rollercoaster-dev/openbadges-modular-server",
      progress: 0,
      openIssues: 0,
      totalIssues: 0,
      features: [{ icon: "🔒", text: "Secure badge validation" }],
      status: "in-progress" as const,
      gradientFrom: "primary" as const,
      lastUpdated: new Date(),
    },
    userInterface: {
      title: "User Interface (Vue)",
      icon: "🎨",
      description: "Loading project status...",
      repository: "openbadges-ui",
      url: "https://github.com/rollercoaster-dev/openbadges-ui",
      progress: 0,
      openIssues: 0,
      totalIssues: 0,
      features: [{ icon: "♿", text: "Accessibility focused" }],
      status: "in-progress" as const,
      gradientFrom: "accent" as const,
      lastUpdated: new Date(),
    },
    backendApi: {
      title: "Backend API",
      icon: "🔌",
      description: "Loading project status...",
      repository: "openbadges-modular-server",
      url: "https://github.com/rollercoaster-dev/openbadges-modular-server",
      progress: 0,
      openIssues: 0,
      totalIssues: 0,
      features: [{ icon: "🚀", text: "High performance" }],
      status: "in-progress" as const,
      gradientFrom: "secondary" as const,
      lastUpdated: new Date(),
    },
    communityFeatures: {
      title: "Community Features",
      icon: "🤝",
      description: "Loading project status...",
      repository: "openbadges-system",
      url: "https://github.com/rollercoaster-dev/openbadges-system",
      progress: 0,
      openIssues: 0,
      totalIssues: 0,
      features: [{ icon: "🌐", text: "Social sharing" }],
      status: "planned" as const,
      gradientFrom: "primary" as const,
      lastUpdated: new Date(),
    },
  });

  const fetchStatusCards = async () => {
    try {
      isLoading.value = true;
      error.value = null;

      const response = await fetch("/api/github/status-cards");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Update reactive data
      Object.assign(projectData.coreEngine, {
        ...data.coreEngine,
        lastUpdated: new Date(data.coreEngine.lastUpdated),
      });

      Object.assign(projectData.userInterface, {
        ...data.userInterface,
        lastUpdated: new Date(data.userInterface.lastUpdated),
      });

      Object.assign(projectData.backendApi, {
        ...data.backendApi,
        lastUpdated: new Date(data.backendApi.lastUpdated),
      });

      Object.assign(projectData.communityFeatures, {
        ...data.communityFeatures,
        lastUpdated: new Date(data.communityFeatures.lastUpdated),
      });
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to fetch project data";
      console.error("Error fetching GitHub projects:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const refresh = () => {
    return fetchStatusCards();
  };

  return {
    projectData,
    isLoading,
    error,
    fetchStatusCards,
    refresh,
  };
}
