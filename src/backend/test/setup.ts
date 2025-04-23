import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { apiRoutes } from "@backend/api/routes";
import { authConfig } from "@backend/config/auth.config";
import { treaty } from "@elysiajs/eden";

/**
 * Creates a test application instance that mirrors the production setup
 * with the API routes mounted under the /api path.
 */
export const createTestApp = () => {
  return new Elysia()
    .use(
      jwt({
        name: "jwt",
        secret: authConfig.jwt.secret,
        exp: authConfig.jwt.expiresIn,
      }),
    )
    .group("/api", (app) => app.use(apiRoutes));
};

// Create and export a typed Eden client for tests
export const testClient = treaty(createTestApp());

// Export the type of the test client
export type TestClientType = typeof testClient;
