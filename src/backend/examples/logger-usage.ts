/**
 * This file demonstrates how to use the logger in different parts of the application.
 * It's meant as a reference and is not used in the actual application.
 */

import { logger } from "../services/logger.service";

/**
 * Example of using the logger in a service
 */
export class ExampleService {
  /**
   * Example method that demonstrates different log levels
   */
  static async performOperation(userId: string, data: Record<string, unknown>) {
    // Debug level - for detailed information useful during development
    logger.debug("Starting operation", {
      userId,
      operation: "performOperation",
    });

    try {
      // Info level - for general information about application progress
      logger.info("Processing data for user", {
        userId,
        dataSize: Object.keys(data).length,
      });

      // Simulate a database query
      const startTime = Date.now();
      // ... actual database operation would go here
      const duration = Date.now() - startTime;

      // Log the query using the query logger
      logger.logQuery("SELECT * FROM users WHERE id = $1", [userId], duration);

      // Warn level - for potentially problematic situations that don't prevent the application from working
      if (Object.keys(data).length > 100) {
        logger.warn("Large data payload detected", {
          userId,
          dataSize: Object.keys(data).length,
        });
      }

      return { success: true, result: "Operation completed" };
    } catch (error) {
      // Error level - for errors that prevent a function from working correctly
      logger.error(
        "Error performing operation",
        error instanceof Error ? error : new Error(String(error)),
        { userId },
      );

      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  /**
   * Example of handling a critical error
   */
  static async criticalOperation() {
    try {
      // Simulate a critical operation
      throw new Error("Critical system failure");
    } catch (error) {
      // Fatal level - for errors that could cause the application to crash
      logger.fatal(
        "Critical system failure detected",
        error instanceof Error ? error : new Error(String(error)),
        { component: "ExampleService", operation: "criticalOperation" },
      );

      // In a real application, you might want to notify administrators or take other actions
      return { success: false, error: "A critical error occurred" };
    }
  }
}

/**
 * Example of using the logger in an API handler
 */
export const exampleApiHandler = async (c: {
  get: (key: string) => unknown;
  req: { json: () => Record<string, unknown> };
  json: (data: unknown, status?: number) => unknown;
}) => {
  const requestId = c.get("requestId") || "unknown";
  const user = (c.get("user") as { sub?: string }) || {};
  const userId = user.sub || "anonymous";

  logger.info("Processing API request", {
    requestId,
    userId,
    endpoint: "/api/example",
  });

  try {
    // Process the request
    const result = await ExampleService.performOperation(userId, c.req.json());

    if (!result.success) {
      logger.warn("Operation failed", {
        requestId,
        userId,
        error: result.error,
      });

      return c.json({ error: result.error }, 400);
    }

    logger.info("Request processed successfully", {
      requestId,
      userId,
    });

    return c.json(result);
  } catch (error) {
    logger.error(
      "Error processing API request",
      error instanceof Error ? error : new Error(String(error)),
      { requestId, userId },
    );

    return c.json({ error: "Internal server error" }, 500);
  }
};

/**
 * Example of using the logger in a background task
 */
export const exampleBackgroundTask = async () => {
  const taskId = crypto.randomUUID();

  logger.info("Starting background task", {
    taskId,
    taskType: "example",
  });

  try {
    // Perform the background task
    // ...

    logger.info("Background task completed", {
      taskId,
      duration: "1000ms",
    });
  } catch (error) {
    logger.error(
      "Error in background task",
      error instanceof Error ? error : new Error(String(error)),
      { taskId },
    );
  }
};
