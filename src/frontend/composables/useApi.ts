/**
 * Composable for API interactions
 */

// Define badge type
interface Badge {
  id: string;
  name: string;
  description: string;
  image: string;
  criteria: string;
  issuer: string;
  tags: string[];
  createdAt: string;
}

export function useApi() {
  const baseUrl = "http://localhost:3000/api";
  const loading = ref(false);
  const error = ref<string | null>(null);

  /**
   * Generic fetch function with error handling
   */
  async function fetchData<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T | null> {
    loading.value = true;
    error.value = null;

    try {
      const fullUrl = `${baseUrl}${endpoint}`;
      console.log(`API Request: ${options?.method || "GET"} ${fullUrl}`);

      const response = await fetch(fullUrl, {
        // Use credentials to include cookies
        credentials: "include",
        ...options,
      });

      console.log(`API Response: ${response.status} ${response.statusText}`);

      // Handle 401 Unauthorized silently before the general !response.ok check
      if (response.status === 401) {
        console.log("API Response: 401 Unauthorized - returning null");
        return null;
      }

      if (!response.ok) {
        // For other errors (e.g., 404, 500), log and throw.
        const errorBody = await response.text();
        const errorMessage = `API error: ${response.status} - ${response.statusText}. Body: ${errorBody}`;
        console.error(`Error fetching from ${endpoint}:`, errorMessage);
        throw new Error(errorMessage);
      }

      // Handle cases where the response might be empty (e.g., 204 No Content)
      if (response.status === 204) {
        return null; // Or return an appropriate value based on context
      }

      // Check if the response content type is JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return (await response.json()) as T;
      } else {
        // Handle non-JSON responses if necessary, e.g., return text
        return (await response.text()) as unknown as T;
      }
    } catch (error: unknown) {
      // Catch network errors or errors from response.json()/text()
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unknown network error occurred";
      console.error(
        `Network or parsing error fetching from ${endpoint}:`,
        errorMessage,
      );
      // Re-throw or handle as needed. If we already threw an error for !response.ok, this might catch that too.
      // Avoid throwing duplicate errors.
      if (!(error instanceof Error && error.message.startsWith("API error:"))) {
        throw new Error(errorMessage);
      }
      // If it was an API error already thrown, return null or let the original throw propagate
      // Depending on desired behavior. Returning null here might mask the original status code.
      // Let's re-throw the original error to preserve status info.
      throw error;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Test the API connection
   */
  async function testConnection() {
    return fetchData<{ status: string; message: string; timestamp: string }>(
      "/test",
    );
  }

  /**
   * Get all badges
   */
  async function getBadges() {
    return fetchData<Badge[]>("/badges");
  }

  /**
   * Get a badge by ID
   */
  async function getBadge(id: string) {
    return fetchData<Badge>(`/badges/${id}`);
  }

  return {
    loading,
    error,
    testConnection,
    getBadges,
    getBadge,
    fetchData,
  };
}

export type UseApiReturnType = ReturnType<typeof useApi>;
