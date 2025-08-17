import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

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
  [key: string]: StatusCardData;
}

export function useGitHubProjects() {
  const { t } = useI18n();
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Store dynamic GitHub data separately
  const githubData = ref<Record<string, Partial<StatusCardData>>>({});

  const projectData = computed<GitHubProjectsData>(() => ({
    coreEngine: {
      title: t("home.projects.coreEngine.title"),
      icon: "⚙️",
      description: t("home.projects.coreEngine.description"),
      repository: "openbadges-modular-server",
      url: "https://github.com/rollercoaster-dev/openbadges-modular-server",
      progress: 0,
      openIssues: 0,
      totalIssues: 0,
      features: [
        { icon: "🔒", text: t("home.projects.coreEngine.features.secure") },
        { icon: "📊", text: t("home.projects.coreEngine.features.tracking") },
        { icon: "🔄", text: t("home.projects.coreEngine.features.realtime") },
      ],
      status: "in-progress" as const,
      gradientFrom: "primary" as const,
      lastUpdated: new Date(),
      // Merge with GitHub data
      ...githubData.value.coreEngine,
    },
    userInterface: {
      title: t("home.projects.userInterface.title"),
      icon: "🎨",
      description: t("home.projects.userInterface.description"),
      repository: "openbadges-ui",
      url: "https://github.com/rollercoaster-dev/openbadges-ui",
      progress: 0,
      openIssues: 0,
      totalIssues: 0,
      features: [
        {
          icon: "♿",
          text: t("home.projects.userInterface.features.accessibility"),
        },
        {
          icon: "📱",
          text: t("home.projects.userInterface.features.responsive"),
        },
        {
          icon: "🎯",
          text: t("home.projects.userInterface.features.userCentered"),
        },
      ],
      status: "in-progress" as const,
      gradientFrom: "accent" as const,
      lastUpdated: new Date(),
      // Merge with GitHub data
      ...githubData.value.userInterface,
    },
    communityFeatures: {
      title: t("home.projects.communityFeatures.title"),
      icon: "🏆",
      description: t("home.projects.communityFeatures.description"),
      repository: "openbadges-system",
      url: "https://github.com/rollercoaster-dev/openbadges-system",
      progress: 0,
      openIssues: 0,
      totalIssues: 0,
      features: [
        {
          icon: "🔗",
          text: t("home.projects.communityFeatures.features.integrates"),
        },
        {
          icon: "🌟",
          text: t("home.projects.communityFeatures.features.ecosystem"),
        },
        {
          icon: "📖",
          text: t("home.projects.communityFeatures.features.openSource"),
        },
        {
          icon: "🚀",
          text: t("home.projects.communityFeatures.features.production"),
        },
        {
          icon: "🎯",
          text: t("home.projects.communityFeatures.features.reference"),
        },
      ],
      status: "in-progress" as const,
      gradientFrom: "secondary" as const,
      lastUpdated: new Date(),
      // Merge with GitHub data
      ...githubData.value.communityFeatures,
    },
  }));

  const fetchStatusCards = async () => {
    try {
      isLoading.value = true;
      error.value = null;

      const response = await fetch("/api/github/status-cards");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Update GitHub data - only extract numeric/date fields, ignore text content
      Object.keys(data).forEach((key) => {
        if (data[key]) {
          githubData.value[key] = {
            // Only extract the GitHub stats, not the text content
            progress: data[key].progress,
            openIssues: data[key].openIssues,
            totalIssues: data[key].totalIssues,
            lastUpdated: new Date(data[key].lastUpdated),
          };
        }
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
