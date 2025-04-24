import { Context, MiddlewareHandler } from "hono";
import { JwtService, type AppJwtPayload } from "@backend/services/jwt.service";
import { authConfig } from "@backend/config/auth.config";
import { getCookie } from "hono/cookie";

// Define the variables interface for the context
export interface Variables {
  user: AppJwtPayload;
}

// Define the type for the context with user
export type AuthenticatedContext = Context<{
  Variables: Variables;
}>;

// Create the auth middleware
export const authMiddleware: MiddlewareHandler<{
  Variables: Variables;
}> = async (c, next) => {
  const tokenCookie = getCookie(c, authConfig.jwt.cookieName);

  if (!tokenCookie) {
    console.debug("Auth Middleware: No auth token cookie found.");
    throw new Error("Unauthorized");
  }

  try {
    // Only log that we're verifying a token, not the token itself
    console.debug("Auth Middleware: Verifying token");
    const payload = await JwtService.verifyToken(tokenCookie);

    // Log successful verification without exposing the full payload
    console.debug(`Auth Middleware: Token verified for user: ${payload.sub}`);

    // Set the user in the context
    c.set("user", payload);

    // Continue to the next middleware/handler
    await next();
  } catch (error) {
    // Handle specific errors
    if (error instanceof Error && error.message.includes("expired")) {
      console.info("Auth Middleware: Expired token detected.");
    } else {
      // Log error without including the full error object which might contain sensitive data
      console.warn("Auth Middleware: Invalid token detected.");
    }

    // Set user to null and throw unauthorized error
    throw new Error("Unauthorized");
  }
};
