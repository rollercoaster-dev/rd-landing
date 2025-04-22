import { Elysia, type Context } from "elysia";
import { JwtService, type AppJwtPayload } from "@backend/services/jwt.service";
import { authConfig } from "@backend/config/auth.config";

/**
 * Elysia middleware to verify JWT token from cookie and derive user information.
 *
 * It checks for the `auth_token` cookie, verifies it using JwtService,
 * and adds the decoded payload to the request context as `ctx.user`.
 * If the token is invalid or missing, `ctx.user` will be null.
 */
export const authMiddleware = new Elysia({ name: "auth-middleware" }).derive(
  async (ctx: Context): Promise<{ user: AppJwtPayload | null }> => {
    const tokenCookie = ctx.cookie[authConfig.jwt.cookieName];

    if (!tokenCookie?.value) {
      // console.debug('Auth Middleware: No auth token cookie found.');
      return { user: null };
    }

    try {
      // console.debug('Auth Middleware: Verifying token:', tokenCookie.value);
      const payload = await JwtService.verifyToken(tokenCookie.value);
      // console.debug('Auth Middleware: Token verified, payload:', payload);
      return { user: payload };
    } catch (error: unknown) {
      // console.debug('Auth Middleware: Token verification failed.', error instanceof Error ? error.message : error);
      // Clear the invalid cookie? Optionally handle specific errors (e.g., expired)
      if (error instanceof Error && error.message.includes("expired")) {
        // Could potentially clear the cookie here if desired
        // ctx.cookie[authConfig.jwt.cookieName].remove();
        console.info("Auth Middleware: Expired token detected.");
      } else {
        console.warn("Auth Middleware: Invalid token detected.");
      }
      return { user: null };
    }
  },
);

// Optional: Define a type for the context after this middleware is applied
export type AuthenticatedContext = Context & {
  user: AppJwtPayload | null;
};
