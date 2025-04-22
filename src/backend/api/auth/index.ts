import { Elysia, t } from "elysia";
import { githubRoutes } from "./github.routes";
import { authConfig } from "@backend/config/auth.config";

// Create and export the authRoutes instance
export const authRoutes = new Elysia()
  // Mount GitHub routes under /github prefix using group()
  .group("/github", (app) => app.use(githubRoutes))
  // Add other auth routes like logout directly here
  .post(
    "/logout",
    ({ cookie, set }) => {
      const jwtCookieName = authConfig.jwt.cookieName;
      // Check if the cookie exists before trying to remove it
      if (cookie && cookie[jwtCookieName]) {
        console.log(`[LOGOUT] Clearing cookie: ${jwtCookieName}`);
        cookie[jwtCookieName].remove(); // Use remove() on the cookie object
        set.status = 200;
        return { message: "Logged out successfully" };
      } else {
        console.log(`[LOGOUT] Cookie ${jwtCookieName} not found.`);
        // It's debatable whether this is an error, client might already be logged out.
        // Return success anyway.
        set.status = 200;
        return { message: "No active session found or already logged out" };
      }
    },
    {
      // Define expected cookie structure for validation (optional but good practice)
      cookie: t.Object({
        [authConfig.jwt.cookieName]: t.Optional(t.String()),
      }),
    },
  )
  .get("/status", ({ cookie, set }) => {
    const tokenCookie = cookie[authConfig.jwt.cookieName];
    if (tokenCookie) {
      return { authenticated: true, message: "User is authenticated" };
    } else {
      set.status = 401;
      return {
        authenticated: false,
        message: "No authentication token cookie found",
      };
    }
  });
