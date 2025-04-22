import { Elysia } from "elysia";

// Import route modules
import { badgesRoutes } from "./badges";
import authRoutes from "./auth"; // Corrected: Use default import
import userRoutes from "./users/users.routes"; // Import user routes

// Create and export the API routes
export const apiRoutes = new Elysia()
  // Mount badge-related routes
  .use(badgesRoutes)
  // Mount auth-related routes under '/auth' prefix
  .group("/auth", (app) => app.use(authRoutes))
  // Mount user routes
  .use(userRoutes)
  // Add a simple root endpoint
  .get("/", () => ({
    name: "Rollercoaster.dev API",
    version: "0.1.0",
    documentation: "/api/docs",
  }))
  // Add a test endpoint
  .get("/test", () => ({
    status: "ok",
    message: "API is working properly",
    timestamp: new Date().toISOString(),
  }));
