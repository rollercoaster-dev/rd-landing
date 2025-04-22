// No DecoratedAppInstance import needed here
// Import route modules/functions
import { badgesRoutes } from "./badges";
import { authRoutes } from "./auth"; // Import the instance
import userRoutes from "./users/users.routes"; // Import user routes
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
  // Add a simple '/' GET handler
  .get("/", () => ({ message: "API Root - Welcome!" })); // Example root API endpoint
