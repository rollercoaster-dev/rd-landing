// Simple routing - no authentication needed
import type {
  RouteRecordRaw,
  RouterScrollBehavior,
  RouteLocationNormalized,
} from "vue-router";
import { routes as autoRoutes } from "vue-router/auto-routes";

// Use routes as RouteRecordRaw[], preserving compatibility with auto-routes
export const routes: RouteRecordRaw[] =
  autoRoutes as unknown as RouteRecordRaw[];

// Export the scroll behavior with proper typing
export const scrollBehavior: RouterScrollBehavior = (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  savedPosition,
) => {
  // Scroll to top on navigation
  if (savedPosition) {
    return savedPosition;
  } else {
    return { top: 0 };
  }
};
