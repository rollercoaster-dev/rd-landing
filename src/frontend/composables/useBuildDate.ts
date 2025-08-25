/**
 * Composable for handling build-time date information
 * Provides formatted dates for "Last updated" functionality
 */

/**
 * Get the current date in YYYY-MM-DD format
 * This will be the build date when the site is generated
 */
export function useBuildDate() {
  const getBuildDate = (): string => {
    const now = new Date();
    return now.toISOString().split("T")[0]; // YYYY-MM-DD format
  };

  const getFormattedBuildDate = (locale: string = "en"): string => {
    const now = new Date();

    // Format based on locale
    if (locale === "de") {
      return now.toLocaleDateString("de-DE", {
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
