// Design tokens for OG image generation
// Based on src/frontend/styles/main.css custom properties

export const OGDesignTokens = {
  colors: {
    // Base colors (light mode)
    background: "#f2f2f2", // --gray-50 equivalent
    foreground: "#1a1a1a", // --gray-950 equivalent

    // Card/elevated surfaces
    card: "#ffffff",
    cardForeground: "#1a1a1a",

    // Neon interaction colors
    primary: "#d946ef", // --primary (magenta) hsl(315, 85%, 55%)
    primaryForeground: "#ffffff",

    secondary: "#06b6d4", // --secondary/accent (cyan) hsl(190, 90%, 50%)
    secondaryForeground: "#ffffff",

    // Muted colors
    muted: "#e5e7eb", // --gray-200 equivalent
    mutedForeground: "#6b7280", // --gray-500 equivalent

    // Gradients
    primaryGradient: "linear-gradient(45deg, #d946ef, #06b6d4)",
    backgroundGradient: "linear-gradient(135deg, #f2f2f2 0%, #e8e8e8 100%)",
  },

  fonts: {
    // Primary font stack matching our design
    primary:
      '"Atkinson Hyperlegible", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',

    // Font weights
    normal: 400,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  spacing: {
    xs: 16,
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
    xxl: 80,
  },

  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 20,
  },

  dimensions: {
    ogWidth: 1200,
    ogHeight: 630,
  },

  typography: {
    // Large title (hero)
    heroTitle: {
      fontSize: 96,
      fontWeight: 800,
      lineHeight: 1.1,
    },

    // Page title
    pageTitle: {
      fontSize: 84,
      fontWeight: 800,
      lineHeight: 1.1,
    },

    // Subtitle
    subtitle: {
      fontSize: 42,
      fontWeight: 600,
      lineHeight: 1.2,
    },

    // Page subtitle (smaller)
    pageSubtitle: {
      fontSize: 36,
      fontWeight: 600,
      lineHeight: 1.2,
    },

    // Description text
    description: {
      fontSize: 28,
      fontWeight: 400,
      lineHeight: 1.3,
    },

    // Small context text
    context: {
      fontSize: 24,
      fontWeight: 400,
      lineHeight: 1.4,
    },
  },

  // Brand elements
  brand: {
    logoSize: 40,
    accentSize: 60,
  },
};

// Utility functions for consistent styling
export const OGStyleUtils = {
  // Center content
  centerContent: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },

  // Text styles
  textCenter: {
    textAlign: "center" as const,
  },

  textLeft: {
    textAlign: "left" as const,
  },

  // Positioning
  absoluteBottomLeft: (bottom: number, left: number) => ({
    position: "absolute" as const,
    bottom,
    left,
  }),

  absoluteBottomRight: (bottom: number, right: number) => ({
    position: "absolute" as const,
    bottom,
    right,
  }),

  // Brand accent element
  brandAccent: (size: number = OGDesignTokens.brand.accentSize) => ({
    width: size,
    height: size,
    backgroundColor: OGDesignTokens.colors.secondary,
    borderRadius: OGDesignTokens.borderRadius.lg,
  }),
};

// Template-specific configurations
export const TemplateConfigs = {
  default: {
    padding: OGDesignTokens.spacing.xxl,
    contentMaxWidth: 1040, // 1200 - 80*2
    titleMargin: OGDesignTokens.spacing.md,
    subtitleMargin: OGDesignTokens.spacing.sm,
  },

  page: {
    padding: OGDesignTokens.spacing.xxl,
    contentMaxWidth: 1040,
    titleMargin: OGDesignTokens.spacing.sm,
    contextPadding: OGDesignTokens.spacing.xl,
  },

  feature: {
    padding: OGDesignTokens.spacing.xxl,
    contentMaxWidth: 1040,
    highlightPadding: OGDesignTokens.spacing.lg,
    featureMargin: OGDesignTokens.spacing.md,
  },
};
