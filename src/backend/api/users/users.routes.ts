import { Elysia } from "elysia";
import type { AuthenticatedContext } from "@backend/middleware/auth.middleware"; // Import the context type with user

/**
 * Routes related to user information.
 */
const userRoutes = new Elysia({ prefix: "/users" })
  /**
   * GET /api/users/me
   * Returns the details of the currently authenticated user based on the JWT.
   * Requires a valid JWT cookie to be present.
   */
  .get("/me", (ctx: AuthenticatedContext) => {
    if (!ctx.user) {
      // If ctx.user is null, the middleware didn't find/validate a token
      ctx.set.status = 401; // Unauthorized
      return { error: "Unauthorized: No valid authentication token found." };
    }

    // If ctx.user exists, return the user payload from the token
    ctx.set.status = 200;
    return { user: ctx.user };
  });

export default userRoutes;
