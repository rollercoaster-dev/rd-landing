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
  const baseUrl = 'http://localhost:3000/api';
  const loading = ref(false);
  const error = ref<string | null>(null);

  /**
   * Generic fetch function with error handling
   */
  async function fetchData<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, options);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return (await response.json()) as T;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error';
      console.error(`Error fetching from ${endpoint}:`, err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Test the API connection
   */
  async function testConnection() {
    return fetchData<{ status: string; message: string; timestamp: string }>('/test');
  }

  /**
   * Get all badges
   */
  async function getBadges() {
    return fetchData<Badge[]>('/badges');
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
