import type {
  RouterScrollBehavior,
  RouteRecordRaw,
  ScrollPosition,
} from "vue-router";
import { routes as autoRoutes } from "vue-router/auto-routes";

// Use routes as RouteRecordRaw[], preserving compatibility with auto-routes
export const routes: RouteRecordRaw[] = autoRoutes as RouteRecordRaw[];

// Export the scroll behavior
export const scrollBehavior: RouterScrollBehavior = (
  to,
  _from,
  savedPosition: ScrollPosition,
) => {
  if (savedPosition) return savedPosition;
  if (to.hash) return { el: to.hash, behavior: "smooth" };
  return { top: 0 };
};
