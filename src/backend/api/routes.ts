import { Hono } from "hono";
import { githubRoutes } from "./github/github.routes";

// Create a new Hono app for API routes
export const apiRoutes = new Hono();

// Mount github routes
apiRoutes.route("/github", githubRoutes);

// Root API endpoint
apiRoutes.get("/", (c) =>
  c.json({
    name: "Rollercoaster.dev API",
    version: "0.1.0",
    documentation: "/api/docs",
  }),
);

// Test endpoint
apiRoutes.get("/test", (c) =>
  c.json({
    status: "ok",
    message: "API is working properly",
    timestamp: new Date().toISOString(),
  }),
);

// Export the type
export type ApiRoutesType = typeof apiRoutes;
