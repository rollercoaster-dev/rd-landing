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

import { ref } from "vue";

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
        // Try to parse error response as JSON for user-friendly messages
        try {
          const errorData = await response.json();
          const userMessage = errorData.message || "Something went wrong";
          const actionMessage = errorData.action || "Please try again";
          const fullMessage = `${userMessage}. ${actionMessage}`;
          console.error(`API error ${response.status}:`, errorData);
          throw new Error(fullMessage);
        } catch {
          // Fallback to generic message if JSON parsing fails
          const errorMessage = `Something went wrong (${response.status}). Please try again.`;
          console.error(`Error fetching from ${endpoint}:`, errorMessage);
          throw new Error(errorMessage);
        }
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
          : "Unable to connect. Please check your internet connection and try again.";
      console.error(
        `Network or parsing error fetching from ${endpoint}:`,
        errorMessage,
      );
      // Re-throw the error with user-friendly message
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  }

  /**
   * Wrapper for DELETE requests
   */
  async function deleteData<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T | null> {
    return fetchData<T>(endpoint, { method: "DELETE", ...options });
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
    deleteData,
  };
}

export type UseApiReturnType = ReturnType<typeof useApi>;
