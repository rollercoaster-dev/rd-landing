import { badgesRoutes } from "./badges";
import { authRoutes } from "./auth"; // Import the instance
import userRoutes from "./users/users.routes"; // Import user routes
import {
  authMiddleware,
  type AuthenticatedContext,
} from "@backend/middleware/auth.middleware"; // Import auth middleware and type
import { Elysia } from "elysia";

// Create and export the main API routes instance
export const apiRoutes = new Elysia()
  // Mount badge-related routes (-> /api/badges/*)
  .use(badgesRoutes)
  // Mount authentication routes under '/auth' using group()
  .group("/auth", (app) => app.use(authRoutes))
  // Mount user routes (-> /api/users/*)
  .use(userRoutes)
  // Add a simple root endpoint for the API (-> /api/)
  .get("/", () => ({
    name: "Rollercoaster.dev API",
    version: "0.1.0",
    documentation: "/api/docs", // Assuming docs might be added later
  }))
  // Add a test endpoint for the API (-> /api/test)
  .get("/test", () => ({
    status: "ok",
    message: "API is working properly",
    timestamp: new Date().toISOString(),
  }))
  // Group protected routes under /me and apply auth middleware
  .group("/me", (app) =>
    app
      .use(authMiddleware) // Apply middleware to all routes in this group
      .get(
        "", // Path is relative to the group ('/me')
        ({ user }: AuthenticatedContext) => {
          // user is guaranteed non-null here due to the middleware's beforeHandle
          return { user };
        },
        {
          // Optional: Add response schema if needed
          // response: t.Object({ user: YourUserSchema })
        },
      ),
  );

// Export the type for use in testing or other modules
export type ApiRoutesType = typeof apiRoutes;
