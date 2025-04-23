import { Hono } from "hono";
import {
  authMiddleware,
  type Variables as AuthVariables,
} from "@backend/middleware/auth.middleware";

/**
 * Routes related to user information.
 */
export const userRoutes = new Hono<{
  Variables: AuthVariables;
}>();

/**
 * GET /api/users/me
 * Returns the details of the currently authenticated user based on the JWT.
 * Requires a valid JWT cookie to be present.
 */
userRoutes.get("/me", authMiddleware, (c) => {
  const user = c.get("user");

  // If user exists, return the user payload from the token
  return c.json({ user });
});

export default userRoutes;
