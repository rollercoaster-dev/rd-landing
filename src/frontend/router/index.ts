// Simple routing - no authentication needed
import { RouteLocationNormalized } from "vue-router";
import { routes as autoRoutes } from "vue-router/auto-routes";

// Use routes as-is, no processing needed for simple landing page
export const routes = autoRoutes;

// Export the scroll behavior
export const scrollBehavior = (
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
