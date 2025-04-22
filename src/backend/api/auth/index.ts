import { Elysia, type Context } from "elysia";
import type { AppJwtPayload } from "@backend/services/jwt.service";
import githubRoutes from "./github.routes"; // Corrected import name
import { authConfig } from "@backend/config/auth.config";

// Define a type for the context decorated with the user payload
export type AuthenticatedContext = Context & {
  jwtPayload?: AppJwtPayload;
};

const authRoutes = new Elysia({ prefix: "/auth" })
  // Mount GitHub OAuth routes
  .use(githubRoutes)
  // Simple status endpoint for now
  .get("/status", ({ cookie, set }: Context) => {
    // Basic check if a token cookie exists (doesn't validate yet)
    const tokenCookie = cookie[authConfig.jwt.cookieName];
    if (tokenCookie) {
      return {
        authenticated: true,
        message: "Token cookie found (not validated)",
      };
    } else {
      set.status = 401;
      return {
        authenticated: false,
        message: "No authentication token cookie found",
      };
    }
  })
  // Logout route - clears the auth token cookie
  .post("/logout", ({ cookie, set }: Context) => {
    // Clear the auth token cookie using the configured name
    if (cookie[authConfig.jwt.cookieName]) {
      cookie[authConfig.jwt.cookieName].remove();
    } else {
      // Optional: Log if the cookie wasn't found? Usually not an error.
      // console.debug('Logout attempt but no auth cookie found.');
    }
    set.status = 200;
    return { message: "Logged out successfully" };
  });

export default authRoutes;
