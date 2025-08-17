// Simple routing - no authentication needed
import { RouteLocationNormalized, RouterScrollBehavior } from "vue-router";
import { routes as autoRoutes } from "vue-router/auto-routes";

// Use routes as-is, no processing needed for simple landing page
// Type cast to resolve compatibility issues with different vue-router versions
export const routes = autoRoutes as never[];

// Export the scroll behavior with proper typing
export const scrollBehavior: RouterScrollBehavior = (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  savedPosition: unknown,
) => {
  // Scroll to top on navigation
  if (savedPosition) {
    return savedPosition;
  } else {
    return { top: 0 };
  }
};
