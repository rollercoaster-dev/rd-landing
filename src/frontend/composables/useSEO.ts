// Vue composable for easy SEO and OG image integration
import { useHead } from "@unhead/vue";
import { useRoute } from "vue-router";

interface SEOOptions {
  title: string;
  description: string;
  og?: {
    title?: string;
    subtitle?: string;
    template?: "default" | "page" | "feature";
  };
}

/**
 * Composable for handling SEO meta tags with automatic OG image generation
 *
 * @example
 * ```vue
 * // Simple usage - OG image automatically generated
 * useSEO({
 *   title: "About Us",
 *   description: "Building tools by and for neurodivergent minds"
 * })
 *
 * // Advanced usage with custom OG content
 * useSEO({
 *   title: "Roadmap",
 *   description: "Our journey ahead",
 *   og: {
 *     title: "Roadmap 2025",
 *     subtitle: "What's next for RollerCoaster.dev",
 *     template: "feature"
 *   }
 * })
 * ```
 */
export function useSEO(options: SEOOptions) {
  const route = useRoute();
  const siteName = "RollerCoaster.dev";

  // Use environment variable with safe fallbacks
  const envSiteUrl = import.meta.env.VITE_SITE_URL;
  const siteUrl =
    envSiteUrl ||
    (typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : "http://localhost:5173");

  // Get the current route name for OG image path generation
  const routeName = (route.name as string) || "index";

  // Generate OG image path based on route and template
  const ogImagePath = generateOGImagePath(routeName, options.og);

  // Build absolute URLs robustly
  const ogImageUrl = new URL(ogImagePath, siteUrl).toString();
  const pageUrl = new URL(route.path, siteUrl).toString();

  // Handle all meta tags automatically using @unhead/vue
  useHead({
    // Page title
    title: `${options.title} | ${siteName}`,

    // Meta tags
    meta: [
      // Basic SEO
      { name: "description", content: options.description },

      // Open Graph
      { property: "og:title", content: options.og?.title || options.title },
      { property: "og:description", content: options.description },
      { property: "og:image", content: ogImageUrl },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:site_name", content: siteName },
      { property: "og:type", content: "website" },
      { property: "og:url", content: pageUrl },

      // Twitter Cards
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: ogImageUrl },
      { name: "twitter:title", content: options.og?.title || options.title },
      { name: "twitter:description", content: options.description },

      // Additional meta tags for better sharing
      { name: "robots", content: "index, follow" },
      { name: "author", content: siteName },
    ],

    // Canonical link
    link: [{ rel: "canonical", href: pageUrl }],
  });

  // Return useful information for debugging or further use
  return {
    ogImagePath,
    ogImageUrl,
    pageUrl,
    routeName,
  };
}

/**
 * Generate OG image path based on route name and template
 * This matches the naming convention used by our generator script
 */
function generateOGImagePath(
  routeName: string,
  ogOptions?: SEOOptions["og"],
): string {
  // Default to 'page' template if not specified
  const template = ogOptions?.template || "page";

  // Handle index route specifically
  const normalizedRouteName =
    routeName === "index" || !routeName ? "index" : routeName;

  return `/og/${normalizedRouteName}-${template}-1200x630.png`;
}

/**
 * Helper function to get the default SEO content for a route
 * This can be used for consistent defaults across the app
 */
export function getDefaultSEOForRoute(routeName: string): Partial<SEOOptions> {
  const defaults: Record<string, Partial<SEOOptions>> = {
    index: {
      title: "RollerCoaster.dev",
      description:
        "Building flexible tools with Open Badges, designed by and for the neurodivergent community to navigate goals and showcase progress.",
      og: { template: "default" },
    },
    about: {
      title: "About Us",
      description:
        "Building tools by and for neurodivergent minds that understand your journey.",
      og: { template: "page" },
    },
    "how-it-works": {
      title: "How It Works",
      description:
        "Flexible progress tracking with Open Badges - your journey, your pace.",
      og: { template: "feature" },
    },
    roadmap: {
      title: "Roadmap",
      description:
        "Our vision for neurodivergent-centered tools and what's next for 2025.",
      og: { template: "page" },
    },
  };

  return (
    defaults[routeName] || {
      title: formatRouteTitle(routeName),
      description:
        "Tools for neurodivergent minds - flexible progress tracking with Open Badges.",
      og: { template: "page" },
    }
  );
}

/**
 * Helper to format route names into readable titles
 */
function formatRouteTitle(routeName: string): string {
  return routeName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
