/**
 * Composable for handling build-time date information
 * Provides formatted dates for "Last updated" functionality
 */

/**
 * Get the build date in YYYY-MM-DD format
 * Uses build-time injected date, fallback to current date if not set
 */
export function useBuildDate() {
  // Use build-time injected date, fallback to current date if not set
  const BUILD_DATE_STRING =
    typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_BUILD_DATE
      ? import.meta.env.VITE_BUILD_DATE
      : new Date().toISOString();

  const buildDate = new Date(BUILD_DATE_STRING);

  const getBuildDate = (): string => {
    return buildDate.toISOString().split("T")[0]; // YYYY-MM-DD format
  };

  const getFormattedBuildDate = (locale: string = "en"): string => {
    // Format based on locale
    if (locale === "de") {
      return buildDate.toLocaleDateString("de-DE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    }

    // Default to ISO format for English and other locales
    return getBuildDate();
  };

  return {
    getBuildDate,
    getFormattedBuildDate,
  };
}
