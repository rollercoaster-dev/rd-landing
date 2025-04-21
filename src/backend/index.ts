import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { apiRoutes } from "./api/routes";
import { staticFiles } from "./services/static";

// Create the main Elysia app
export const app = new Elysia()
  // Add CORS middleware
  .use(
    cors({
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  )
  // Serve static files from the dist directory (built frontend)
  .use(staticFiles)
  // Mount API routes
  .use(apiRoutes)
  // Add a simple health check endpoint
  .get("/health", () => ({ status: "ok", timestamp: new Date().toISOString() }))
  // Global error handler
  .onError(({ code, error, set }) => {
    console.error(`Error [${code}]:`, error);

    if (code === "NOT_FOUND") {
      set.status = 404;
      return {
        error: "Not Found",
        message: "The requested resource was not found",
      };
    }

    set.status = 500;
    return {
      error: "Internal Server Error",
      message: error.message || "An unexpected error occurred",
    };
  });

// Start the server if this file is run directly
// @ts-expect-error - Bun-specific property not recognized by TypeScript
if (import.meta.main) {
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
}

// Export the app for testing and importing in other files
export type App = typeof app;
