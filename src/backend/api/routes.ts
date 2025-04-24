import { Hono } from "hono";
import { authRoutes } from "./auth";
// Remove unused badge routes import
import { userRoutes } from "./users/users.routes";

// Create a new Hono app for API routes
export const apiRoutes = new Hono();

// Mount auth routes
apiRoutes.route("/auth", authRoutes);

// Mount badge routes - Apply middleware before the route group
// apiRoutes.use("/badges/*", authMiddleware); // Protect all /badges/* routes
// Remove mounting of badge routes

// Mount user routes
apiRoutes.route("/users", userRoutes);

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
