import { MiddlewareHandler } from "hono";
import { logger } from "../services/logger.service";
import crypto from "crypto";

/**
 * Custom logger middleware for Hono
 *
 * This middleware enhances the built-in Hono logger by using our neurodivergent-friendly
 * logger implementation. It logs request details and response times.
 */
export const loggerMiddleware: MiddlewareHandler = async (c, next) => {
  const requestId = crypto.randomUUID();
  const method = c.req.method;
  const url = new URL(c.req.url);
  const path = url.pathname;
  const query = url.search;

  // Log the request
  logger.info(`Request: ${method} ${path}${query}`, {
    requestId,
    method,
    path,
    query: query || undefined,
    userAgent: c.req.header("user-agent"),
  });

  const startTime = Date.now();

  try {
    // Process the request
    await next();

    // Calculate response time
    const responseTime = Date.now() - startTime;
    const status = c.res.status;

    // Log the response
    if (status >= 400) {
      logger.warn(`Response: ${status} ${method} ${path} - ${responseTime}ms`, {
        requestId,
        status,
        responseTime,
      });
    } else {
      logger.info(`Response: ${status} ${method} ${path} - ${responseTime}ms`, {
        requestId,
        status,
        responseTime,
      });
    }
  } catch (error) {
    // Calculate response time even for errors
    const responseTime = Date.now() - startTime;

    // Log the error
    logger.error(
      `Error processing ${method} ${path} - ${responseTime}ms`,
      error instanceof Error ? error : new Error(String(error)),
      { requestId, responseTime },
    );

    // Re-throw the error to be handled by Hono's error handler
    throw error;
  }
};
