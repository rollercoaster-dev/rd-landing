import { Hono } from "hono";
import { cors } from "hono/cors";
import { apiRoutes } from "./api/routes";
import { staticFilesMiddleware } from "./services/static";
import { logger } from "./services/logger.service";
import { loggerMiddleware } from "./middleware/logger.middleware";

// Define the factory function
export const createApp = () => {
  // Create the main Hono app
  const app = new Hono();

  // Add custom logger middleware
  app.use("*", loggerMiddleware);

  // Add CORS middleware
  app.use(
    "*",
    cors({
      origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
      ],
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
      allowHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }),
  );

  // Mount API routes
  app.route("/api", apiRoutes);

  // Serve static files
  app.use("*", staticFilesMiddleware);

  // Root endpoint
  app.get("/", (c) =>
    c.json({
      status: "ok",
      message: "Welcome to Rollercoaster.dev Backend!",
    }),
  );

  // Health check endpoint
  app.get("/health", (c) =>
    c.json({
      status: "ok",
      timestamp: new Date().toISOString(),
    }),
  );

  // Error handling
  app.onError((err, c) => {
    logger.error(
      `Error handling request:`,
      err instanceof Error ? err : new Error(String(err)),
    );

    if (err.message === "Unauthorized") {
      return c.json({ message: "Unauthorized" }, 401);
    }

    if (err.message.includes("Not Found")) {
      return c.json({ message: "Not Found" }, 404);
    }

    if (err.message.includes("Validation")) {
      return c.json(
        {
          message: "Validation Error",
          errors: err.message,
        },
        400,
      );
    }

    return c.json({ message: "Internal Server Error" }, 500);
  });

  return app;
};

// Export the type based on the return type of the factory
export type AppType = ReturnType<typeof createApp>;

// Keep the server start logic separate, only run if file is executed directly
if (import.meta.main) {
  const appInstance = createApp();
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  logger.info(`Hono server starting on port ${port}...`);

  Bun.serve({
    port,
    fetch: appInstance.fetch,
  });

  logger.info(`Hono is running at http://localhost:${port}`);
}
