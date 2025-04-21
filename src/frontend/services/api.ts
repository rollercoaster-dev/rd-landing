/**
 * API service for making requests to the backend
 */

// Base URL for API requests
const API_BASE_URL = "http://localhost:3000/api";

/**
 * Fetch badges from the API
 */
export async function fetchBadges() {
  try {
    const response = await fetch(`${API_BASE_URL}/badges`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching badges:", error);
    throw error;
  }
}

/**
 * Fetch a specific badge by ID
 */
export async function fetchBadgeById(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/badges/${id}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching badge ${id}:`, error);
    throw error;
  }
}
