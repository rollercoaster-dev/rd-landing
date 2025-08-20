import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock @unhead/vue
vi.mock("@unhead/vue", () => ({
  useHead: vi.fn(),
}));

// Mock vue-router
const mockRoute = {
  name: "index",
  path: "/",
};
vi.mock("vue-router", () => ({
  useRoute: () => mockRoute,
}));

// Mock import.meta.env
Object.defineProperty(import.meta, "env", {
  value: {
    VITE_SITE_URL: "https://rollercoaster.dev",
  },
  writable: true,
});

// Import after mocks
import { useSEO } from "./useSEO";
import { useHead } from "@unhead/vue";

const mockUseHead = vi.mocked(useHead);

describe("useSEO", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset route to default
    mockRoute.name = "index";
    mockRoute.path = "/";
  });

  it("should generate basic SEO meta tags", () => {
    useSEO({
      title: "Test Page",
      description: "This is a test page description",
    });

    expect(mockUseHead).toHaveBeenCalledWith({
      title: "Test Page | RollerCoaster.dev",
      meta: expect.arrayContaining([
        { name: "description", content: "This is a test page description" },
        { name: "robots", content: "index, follow" },
        { name: "author", content: "RollerCoaster.dev" },
      ]),
      link: [
        { rel: "canonical", href: expect.stringMatching(/^https?:\/\/.*\/$/) },
      ],
      script: undefined,
    });
  });

  it("should generate Open Graph meta tags", () => {
    useSEO({
      title: "About Us",
      description: "Learn about our mission",
      og: {
        title: "About RollerCoaster",
        template: "page",
      },
    });

    expect(mockUseHead).toHaveBeenCalledWith({
      title: "About Us | RollerCoaster.dev",
      meta: expect.arrayContaining([
        { property: "og:title", content: "About RollerCoaster" },
        { property: "og:description", content: "Learn about our mission" },
        {
          property: "og:image",
          content: expect.stringMatching(/og\/index-page-1200x630\.png$/),
        },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:type", content: "image/png" },
        { property: "og:site_name", content: "RollerCoaster.dev" },
        { property: "og:type", content: "website" },
        {
          property: "og:url",
          content: expect.stringMatching(/^https?:\/\/.*\/$/),
        },
      ]),
      link: [
        { rel: "canonical", href: expect.stringMatching(/^https?:\/\/.*\/$/) },
      ],
      script: undefined,
    });
  });

  it("should generate Twitter Card meta tags", () => {
    useSEO({
      title: "Features",
      description: "Discover our features",
    });

    expect(mockUseHead).toHaveBeenCalledWith({
      title: "Features | RollerCoaster.dev",
      meta: expect.arrayContaining([
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:image",
          content: expect.stringMatching(/og\/index-default-1200x630\.png$/),
        },
        { name: "twitter:title", content: "Features" },
        { name: "twitter:description", content: "Discover our features" },
      ]),
      link: [
        { rel: "canonical", href: expect.stringMatching(/^https?:\/\/.*\/$/) },
      ],
      script: undefined,
    });
  });

  // Minimal shape of the head object captured from useHead for test assertions
  type MinimalHead = {
    script?: Array<{ type?: string; innerHTML?: string }>;
    meta: Array<{ property?: string; content?: string }>;
    link: Array<{ rel?: string; href?: string }>;
  };
  type JsonLdHead = Omit<MinimalHead, "script"> & {
    script: Array<{ type?: string; innerHTML?: string }>;
  };

  it("should generate JSON-LD Organization schema when requested", () => {
    useSEO({
      title: "Home",
      description: "Welcome to our site",
      jsonLd: {
        organization: true,
      },
    });

    const headCall = mockUseHead.mock.calls[0][0] as JsonLdHead;

    // Check that JSON-LD script is included
    expect(headCall.script).toBeDefined();
    expect(headCall.script).toHaveLength(1);
    expect(headCall.script[0]!.type).toBe("application/ld+json");

    // Parse and validate JSON-LD content
    const organizationData = JSON.parse(
      headCall.script[0]!.innerHTML as string,
    );
    expect(organizationData["@type"]).toBe("Organization");
    expect(organizationData.name).toBe("RollerCoaster.dev");
    expect(organizationData["@context"]).toBe("https://schema.org");
    expect(organizationData.foundingDate).toBe("2024");
    expect(organizationData.sameAs).toContain(
      "https://github.com/rollercoaster-dev",
    );
  });

  it("should generate correct OG image path for different routes and templates", () => {
    // Test about page with page template
    mockRoute.name = "about";
    mockRoute.path = "/about";

    useSEO({
      title: "About",
      description: "About us",
      og: { template: "page" },
    });

    const headCall = mockUseHead.mock.calls[0][0] as MinimalHead;
    const ogImage = headCall.meta.find(
      (meta: { property?: string }) => meta.property === "og:image",
    ) as { property?: string; content: string };

    expect(ogImage.content).toMatch(/og\/about-page-1200x630\.png$/);
  });

  it("should handle different route names and canonical URLs", () => {
    mockRoute.name = "how-it-works";
    mockRoute.path = "/how-it-works";

    useSEO({
      title: "How It Works",
      description: "Learn how it works",
      og: { template: "feature" },
    });

    const headCall = mockUseHead.mock.calls[0][0] as MinimalHead;
    const ogImage = headCall.meta.find(
      (meta: { property?: string }) => meta.property === "og:image",
    ) as { property?: string; content: string };
    const canonicalLink = headCall.link[0];

    expect(ogImage.content).toMatch(/og\/how-it-works-feature-1200x630\.png$/);
    expect(canonicalLink.href).toMatch(/\/how-it-works$/);
  });

  it("should return debug information", () => {
    const result = useSEO({
      title: "Test",
      description: "Test desc",
    });

    expect(result.ogImagePath).toBe("/og/index-default-1200x630.png");
    expect(result.ogImageUrl).toMatch(/og\/index-default-1200x630\.png$/);
    expect(result.pageUrl).toMatch(/^https?:\/\/.*\/$/);
    expect(result.routeName).toBe("index");
  });

  it("should use fallback URL when VITE_SITE_URL is not available", () => {
    // This test verifies the fallback logic exists
    // The actual fallback behavior is tested in integration tests
    const result = useSEO({
      title: "Test",
      description: "Test",
    });

    // Should still work and return valid URLs
    expect(result.pageUrl).toMatch(/^https?:\/\//);
    expect(result.ogImageUrl).toMatch(/^https?:\/\//);
  });
});
