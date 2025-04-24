// Import only what we need
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import { routes as autoRoutes } from "vue-router/auto-routes";
import { authGuard, guestGuard } from "./guards";

// Process the auto-generated routes to add meta information and guards
const processedRoutes = autoRoutes.map((route) => {
  // Clone the route to avoid modifying the original
  const processedRoute = { ...route };

  // Add meta information and guards based on route path
  if (processedRoute.path.startsWith("/admin")) {
    // Admin routes require authentication
    processedRoute.meta = {
      ...processedRoute.meta,
      requiresAuth: true,
      layout: "admin",
    };

    // Add the auth guard to admin routes
    processedRoute.beforeEnter = (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext,
    ) => {
      // First run the auth guard
      authGuard(to, from, next);
    };
  } else if (processedRoute.path === "/login") {
    // Login route should only be accessible when not authenticated
    processedRoute.meta = {
      ...processedRoute.meta,
      guestOnly: true,
    };

    // Add the guest guard to login route
    processedRoute.beforeEnter = (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext,
    ) => {
      // First run the guest guard
      guestGuard(to, from, next);
    };
  }

  return processedRoute;
});

// Export the processed routes
export const routes = processedRoutes;

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
