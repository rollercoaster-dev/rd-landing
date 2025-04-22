import { Elysia, type ErrorHandler } from "elysia";
import { cors } from "@elysiajs/cors";
import { jwt } from "@elysiajs/jwt";
import { db } from "@backend/db"; // Import Drizzle db instance
import { apiRoutes } from "./api/routes"; // Import the instance
import { staticFiles } from "./services/static";
import { authConfig } from "./config/auth.config"; // Import auth config
import { authMiddleware } from "./middleware/auth.middleware"; // Import the auth middleware

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
  .decorate("db", db)
  // Apply the auth middleware
  .use(authMiddleware);

// Create the main Elysia app by adding routes and static files to the base
export const app = baseApp
  // Serve static files from the dist directory (built frontend)
  .use(staticFiles)
  // --- Routes ---
  // Mount all API routes under the '/api' prefix using group()
  .group("/api", (app) => app.use(apiRoutes))
  // --- Root Endpoint ---
  .get("/", () => ({
    status: "ok",
    message: "Welcome to Rollercoaster.dev Backend!",
  }))
  // Add a simple health check endpoint
  .get("/health", () => ({ status: "ok", timestamp: new Date().toISOString() }))
  // Global error handler
  .onError((context: Parameters<ErrorHandler>[0]) => {
    const { code, error, set } = context;

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
if (import.meta.main) {
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
}
