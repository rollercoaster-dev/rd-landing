import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { jwt } from "@elysiajs/jwt";
import { db } from "@backend/db"; // Import Drizzle db instance
import { apiRoutes } from "./api/routes"; // Import the instance
import { staticFiles } from "./services/static";
import { authConfig } from "./config/auth.config"; // Import auth config

// Define the factory function
export const createApp = () => {
  // Create a base instance with core plugins and decorators
  const baseApp = new Elysia()
    // Add a simple '.onRequest' middleware at the beginning of the app definition to log the path of every incoming request
    .onRequest(({ request }) => {
      console.log(
        `[REQ] Received request: ${request.method} ${new URL(request.url).pathname}`,
      );
    })
    // Add CORS middleware
    .use(
      cors({
        origin: [authConfig.webauthn.origin, "http://localhost:5173"], // Use origin from config + keep localhost for dev
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true, // Allow cookies to be sent
      }),
    )
    // Add JWT plugin
    .use(
      jwt({
        name: "jwt", // Namespace for JWT functions (e.g., context.jwt.sign)
        secret: authConfig.jwt.secret,
        exp: authConfig.jwt.expiresIn,
      }),
    )
    // Decorate context with Drizzle db instance
    .decorate("db", db);

  // Create the main Elysia app by adding routes and static files to the base
  const app = baseApp
    // --- Routes --- (Register specific API routes FIRST)
    .group("/api", (app) => app.use(apiRoutes))

    // Serve static files from the dist directory (built frontend)
    // Place this AFTER specific API routes to avoid conflicts
    .use(staticFiles)

    // --- Root Endpoint --- (Should come after staticFiles if it serves index.html)
    .get("/", () => ({
      status: "ok",
      message: "Welcome to Rollercoaster.dev Backend!",
    }))
    // Add a simple health check endpoint
    .get("/health", () => ({
      status: "ok",
      timestamp: new Date().toISOString(),
    }))
    // Global error handler
    .onError(({ code, error, set }) => {
      console.error(
        `[ERR] Code: ${code}, Error: ${error instanceof Error ? error.message : JSON.stringify(error)}`,
      );
      if (error instanceof Error) {
        console.error(error.stack); // Log stack trace for debugging
      }

      // Handle specific known error types
      switch (code) {
        case "NOT_FOUND":
          set.status = 404;
          return { message: "Not Found" };
        case "VALIDATION":
          set.status = 400;
          return {
            message: "Validation Error",
            errors:
              error instanceof Error ? error.message : JSON.stringify(error),
          }; // Or format error.errors if available
        case "INTERNAL_SERVER_ERROR":
        default:
          set.status = 500;
          return { message: "Internal Server Error" };
      }
    });

  return app; // Return the configured app instance
};

// Export the type based on the return type of the factory
export type AppType = ReturnType<typeof createApp>;

// Keep the server start logic separate, only run if file is executed directly
if (import.meta.main) {
  const appInstance = createApp();
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  appInstance.listen(port);
  console.log(
    `🦊 Elysia is running at http://${appInstance.server?.hostname}:${appInstance.server?.port}`,
  );
}
