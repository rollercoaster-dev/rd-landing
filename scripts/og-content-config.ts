// Route-based content configuration for OG images
// This defines the default content for each route

export interface OGContentItem {
  title: string;
  subtitle?: string;
  description?: string;
  template: "default" | "page" | "feature";
}

export interface OGTemplateConfig {
  width: number;
  height: number;
  layout: string;
}

export const OGContentConfig = {
  // Route-based defaults (automatically used if no custom og provided)
  routes: {
    index: {
      title: "RollerCoaster.dev",
      subtitle: "Tools for Neurodivergent Minds",
      description: "Open Badges • Flexible Progress • Community",
      template: "default" as const,
    },

    about: {
      title: "About Us",
      subtitle: "By and for neurodivergent minds",
      description: "Building tools that understand your journey",
      template: "page" as const,
    },

    "how-it-works": {
      title: "How It Works",
      subtitle: "Your journey, your pace",
      description: "Flexible progress tracking with Open Badges",
      template: "feature" as const,
    },

    roadmap: {
      title: "Roadmap",
      subtitle: "What's next for 2025",
      description: "Our vision for neurodivergent-centered tools",
      template: "page" as const,
    },

    "legal-impressum": {
      title: "Legal Notice",
      subtitle: "Impressum",
      template: "page" as const,
    },

    "legal-privacy": {
      title: "Privacy Policy",
      subtitle: "Datenschutz",
      template: "page" as const,
    },

    contributors: {
      title: "Contributors",
      subtitle: "Building together",
      description: "Meet the amazing people behind RollerCoaster.dev",
      template: "page" as const,
    },

    // Admin pages (if needed)
    admin: {
      title: "Admin",
      subtitle: "Dashboard",
      template: "page" as const,
    },
  } as const,

  // Template definitions
  templates: {
    default: {
      width: 1200,
      height: 630,
      layout: "hero", // Centered with gradient title, great for homepage
    },
    page: {
      width: 1200,
      height: 630,
      layout: "title-context", // Title + subtitle + site context
    },
    feature: {
      width: 1200,
      height: 630,
      layout: "feature-highlight", // Highlight layout for special content
    },
  } as const,

  // Global defaults
  defaults: {
    siteName: "RollerCoaster.dev",
    siteDescription: "Tools for Neurodivergent Minds",
    fallbackTemplate: "page" as const,
  } as const,
};

// Type helpers for content configuration
export type RouteKey = keyof typeof OGContentConfig.routes;
export type TemplateKey = keyof typeof OGContentConfig.templates;

// Helper function to get content for a route
export function getOGContentForRoute(routeName: string): OGContentItem {
  const route = routeName as RouteKey;

  // Return configured content if it exists
  if (route in OGContentConfig.routes) {
    return OGContentConfig.routes[route];
  }

  // Fallback for unknown routes
  return {
    title: formatRouteTitle(routeName),
    subtitle: OGContentConfig.defaults.siteDescription,
    template: OGContentConfig.defaults.fallbackTemplate,
  };
}

// Helper function to format route names into titles
function formatRouteTitle(routeName: string): string {
  return routeName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Helper function to get template config
export function getTemplateConfig(templateName: TemplateKey): OGTemplateConfig {
  return OGContentConfig.templates[templateName];
}

// Validation helper
export function validateOGContent(
  content: Partial<OGContentItem>,
): OGContentItem {
  return {
    title: content.title || "RollerCoaster.dev",
    subtitle: content.subtitle,
    description: content.description,
    template: content.template || "page",
  };
}
