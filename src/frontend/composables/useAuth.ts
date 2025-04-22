import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useApi } from "./useApi"; // Assuming useApi composable exists for API calls

// Define the user type based on what the /api/users/me endpoint returns
// and what we store in the JWT payload (excluding sensitive data)
interface User {
  id: string;
  username: string;
  email: string; // Consider if email should be exposed to frontend
  name: string | null;
  avatarUrl: string | null;
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const isLoading = ref<boolean>(true); // Start loading until we check auth status
  const api = useApi();

  const isAuthenticated = computed(() => !!user.value);

  /**
   * Fetches the current user's data from the backend if authenticated.
   * Typically called on application startup.
   */
  async function fetchUser() {
    isLoading.value = true;
    try {
      const fetchedUser = await api.fetchData<User>("/users/me");
      if (fetchedUser) {
        user.value = fetchedUser;
      } else {
        user.value = null; // Explicitly set to null if not authenticated
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      user.value = null; // Ensure user is null on error
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Initiates the GitHub login flow by redirecting the user.
   * The backend handles the actual OAuth process and sets the cookie.
   */
  function loginWithGitHub() {
    // Construct the full backend URL
    const backendUrl = "http://localhost:3000/api/auth/github/login"; // Corrected URL
    // Redirect the user to the backend GitHub login endpoint using assign for clarity
    window.location.assign(backendUrl);
  }

  /**
   * Logs the user out by calling the backend logout endpoint
   * and clearing the local user state.
   */
  async function logout() {
    try {
      await api.fetchData("/auth/logout", { method: "POST" }); // Call backend to clear cookie
      user.value = null; // Clear local user state
      // Optionally redirect to home page or login page
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle logout failure if needed
    }
  }

  // Fetch user on store initialization
  fetchUser();

  return {
    user,
    isLoading,
    isAuthenticated,
    fetchUser,
    loginWithGitHub,
    logout,
  };
});

// Optional: Export a helper function for easier usage outside setup functions
export function useAuth() {
  return useAuthStore();
}
