// Simple routing - no authentication needed
import type { RouterScrollBehavior } from "vue-router";
import { routes as autoRoutes } from "vue-router/auto-routes";

// Use routes as-is, no processing needed for simple landing page
export const routes = autoRoutes;

// Export the scroll behavior
export const scrollBehavior: RouterScrollBehavior = (
  to,
  _from,
  savedPosition,
) => {
  if (savedPosition) return savedPosition;
  if (to.hash) return { el: to.hash, behavior: "smooth" };
  return { top: 0 };
};
