import { Context, MiddlewareHandler } from "hono";
import { JwtService, type AppJwtPayload } from "../services/jwt.service";
import { authConfig } from "../config/auth.config";
import { getCookie } from "hono/cookie";
import { logger } from "../services/logger.service";

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
    logger.debug("Auth Middleware: No auth token cookie found.");
    throw new Error("Unauthorized");
  }

  try {
    // Only log that we're verifying a token, not the token itself
    logger.debug("Auth Middleware: Verifying token");
    const payload = await JwtService.verifyToken(tokenCookie);

    // Log successful verification without exposing the full payload
    logger.debug(`Auth Middleware: Token verified for user: ${payload.sub}`, {
      userId: payload.sub,
    });

    // Set the user in the context
    c.set("user", payload);

    // Continue to the next middleware/handler
    await next();
  } catch (error) {
    // Handle specific errors
    if (error instanceof Error && error.message.includes("expired")) {
      logger.info("Auth Middleware: Expired token detected.");
    } else {
      // Log error without including the full error object which might contain sensitive data
      logger.warn("Auth Middleware: Invalid token detected.", {
        errorType: error instanceof Error ? error.name : typeof error,
      });
    }

    // Set user to null and throw unauthorized error
    throw new Error("Unauthorized");
  }
};
