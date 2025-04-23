import { Hono } from "hono";
import { authRoutes } from "./auth";
import { badgesRoutes } from "./badges";
import { userRoutes } from "./users/users.routes";
import {
  authMiddleware,
  type Variables as AuthVariables,
} from "@backend/middleware/auth.middleware";

// Create a new Hono app for API routes
export const apiRoutes = new Hono<{
  Variables: AuthVariables;
}>();

// Mount auth routes
apiRoutes.route("/auth", authRoutes);

// Mount badge routes
apiRoutes.route("/badges", badgesRoutes);

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

// Protected routes
apiRoutes.get("/me", authMiddleware, (c) => {
  const user = c.get("user");
  return c.json({ user });
});

// Export the type
export type ApiRoutesType = typeof apiRoutes;
