import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useApi } from "./useApi"; // Assuming useApi composable exists for API calls
import type { User } from "@shared/types"; // Import from shared location

export const useAuthStore = defineStore(
  "auth",
  () => {
    const user = ref<User | null>(null);
    const isLoading = ref<boolean>(true); // Start loading until we check auth status
    const api = useApi();
    // Add an error ref for authentication issues
    const authError = ref<string | null>(null);

    const isAuthenticated = computed(() => !!user.value);

    /**
     * Fetches the current user's data from the backend if authenticated.
     * Typically called on application startup.
     */
    async function fetchUser() {
      isLoading.value = true;
      authError.value = null; // Clear previous errors
      try {
        const fetchedUser = await api.fetchData<User>("/users/me");
        if (fetchedUser) {
          user.value = fetchedUser;
        } else {
          // If null is returned (e.g., 401 from useApi or actual null user), clear local state
          user.value = null;
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        user.value = null; // Ensure user is null on error
        // Capture the error message for potential display
        authError.value =
          error instanceof Error ? error.message : "Failed to fetch user data";
      } finally {
        isLoading.value = false;
      }
    }

    /**
     * Initiates the GitHub login flow by redirecting the user.
     * The backend handles the actual OAuth process and sets the cookie.
     */
    function loginWithGitHub() {
      console.log("[DEBUG] loginWithGitHub function called."); // Add log
      // Construct the full backend URL
      const backendUrl = "http://localhost:3000/api/auth/github/login"; // Corrected URL
      // Redirect the user to the backend GitHub login endpoint using assign for clarity
      window.location.assign(backendUrl);
    }

    /**
     * Logs the user out by calling the backend logout endpoint
     * and clearing the local user state.
     * @returns A promise that resolves when logout is complete
     */
    async function logout() {
      authError.value = null; // Clear errors on logout attempt
      isLoading.value = true; // Set loading state

      try {
        // Call backend to clear cookie
        await api.fetchData("/auth/logout", { method: "POST" });

        // Clear local user state
        user.value = null;

        // Clear any persisted state
        localStorage.removeItem("auth");
        sessionStorage.removeItem("auth");

        console.log("User logged out successfully.");
        return true; // Return success status
      } catch (error) {
        console.error("Logout failed:", error);
        // Handle logout failure
        authError.value =
          error instanceof Error ? error.message : "Logout failed";
        throw error; // Re-throw for component handling
      } finally {
        isLoading.value = false; // Reset loading state
      }
    }

    // Fetch user on store initialization (if not persisted)
    // The persisted state plugin will automatically restore 'user' if available
    // FetchUser still runs to validate the session and update data if needed
    if (!user.value) {
      fetchUser();
    }

    return {
      user,
      isLoading,
      isAuthenticated,
      authError, // Expose the error state
      fetchUser,
      loginWithGitHub,
      logout,
    };
  },
  {
    // Enable persistence for this store
    persist: {
      // Target sessionStorage
      storage: sessionStorage,
      // Only persist the 'user' state
      // @ts-expect-error - Type error likely due to tooling/plugin type definition issue.
      // The 'paths' option is valid for pinia-plugin-persistedstate v4.
      paths: ["user"],
    },
  },
);

// Optional: Export a helper function for easier usage outside setup functions
export function useAuth() {
  return useAuthStore();
}
