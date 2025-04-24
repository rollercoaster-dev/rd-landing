import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import { useAuthStore } from "@/frontend/composables/useAuth";

/**
 * Authentication guard for protected routes
 * Redirects to login page if user is not authenticated
 */
export async function authGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  // Get the auth store
  const authStore = useAuthStore();

  // If authentication status is still loading, wait for it to complete
  if (authStore.isLoading) {
    try {
      // Wait for authentication check to complete
      await new Promise<void>((resolve) => {
        // Check every 100ms if loading is complete
        const checkLoading = () => {
          if (!authStore.isLoading) {
            resolve();
          } else {
            setTimeout(checkLoading, 100);
          }
        };
        checkLoading();
      });
    } catch (error) {
      console.error("Error waiting for auth loading state:", error);
    }
  }

  // Check if user is authenticated
  if (authStore.isAuthenticated) {
    // User is authenticated, proceed to the route
    next();
  } else {
    // User is not authenticated, redirect to login page
    // Include the original destination as a redirect parameter
    next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  }
}

/**
 * Guard for routes that should only be accessible when NOT authenticated
 * Redirects to home page if user is already authenticated
 */
export function guestGuard(
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const authStore = useAuthStore();

  // If authentication status is still loading, wait for it to complete
  if (authStore.isLoading) {
    try {
      // Wait for authentication check to complete
      const checkLoading = () => {
        if (!authStore.isLoading) {
          // Now check authentication status
          if (authStore.isAuthenticated) {
            // User is authenticated, redirect to home
            next("/");
          } else {
            // User is not authenticated, proceed to the route
            next();
          }
        } else {
          setTimeout(checkLoading, 100);
        }
      };
      checkLoading();
    } catch (error) {
      console.error("Error waiting for auth loading state:", error);
      next();
    }
  } else {
    // Authentication status is already determined
    if (authStore.isAuthenticated) {
      // User is authenticated, redirect to home
      next("/");
    } else {
      // User is not authenticated, proceed to the route
      next();
    }
  }
}
