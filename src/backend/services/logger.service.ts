import { Logger, QueryLogger } from "@rollercoaster-dev/rd-logger";

/**
 * Application logger service
 *
 * This service provides a centralized logging mechanism for the application
 * using the @rollercoaster-dev/rd-logger package, which is designed to be
 * neurodivergent-friendly with clear, consistent formatting.
 */
export class LoggerService {
  private static _instance: LoggerService;
  private _logger: Logger;
  private _queryLogger: QueryLogger;

  /**
   * Creates a new LoggerService instance
   *
   * @param options Optional configuration options
   */
  constructor(options?: {
    level?: "debug" | "info" | "warn" | "error" | "fatal";
    slowQueryThreshold?: number;
    logDebugQueries?: boolean;
  }) {
    // Create the main logger
    this._logger = new Logger({
      level:
        options?.level ||
        (process.env.NODE_ENV === "production" ? "info" : "debug"),
    });

    // Create the query logger
    this._queryLogger = new QueryLogger(this._logger, {
      slowQueryThreshold: options?.slowQueryThreshold || 150, // Log queries slower than 150ms as warnings
      logDebugQueries:
        options?.logDebugQueries || process.env.NODE_ENV !== "production", // Log all queries at debug level in non-production
    });
  }

  /**
   * Get the singleton instance of the LoggerService
   */
  public static getInstance(): LoggerService {
    if (!LoggerService._instance) {
      LoggerService._instance = new LoggerService();
    }
    return LoggerService._instance;
  }

  /**
   * Get the logger instance
   */
  public get logger(): Logger {
    return this._logger;
  }

  /**
   * Get the query logger instance
   */
  public get queryLogger(): QueryLogger {
    return this._queryLogger;
  }

  /**
   * Log a debug message
   *
   * @param message The message to log
   * @param context Optional context data
   */
  public debug(message: string, context?: Record<string, unknown>): void {
    this._logger.debug(message, context);
  }

  /**
   * Log an info message
   *
   * @param message The message to log
   * @param context Optional context data
   */
  public info(message: string, context?: Record<string, unknown>): void {
    this._logger.info(message, context);
  }

  /**
   * Log a warning message
   *
   * @param message The message to log
   * @param context Optional context data
   */
  public warn(message: string, context?: Record<string, unknown>): void {
    this._logger.warn(message, context);
  }

  /**
   * Log an error message
   *
   * @param message The message to log
   * @param error Optional error object
   * @param context Optional context data
   */
  public error(
    message: string,
    error?: Error,
    context?: Record<string, unknown>,
  ): void {
    if (error && context) {
      // Combine error and context
      const combinedContext = {
        ...context,
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
      };
      this._logger.error(message, combinedContext);
    } else if (error) {
      this._logger.error(message, error);
    } else if (context) {
      this._logger.error(message, context);
    } else {
      this._logger.error(message);
    }
  }

  /**
   * Log a fatal message
   *
   * @param message The message to log
   * @param error Optional error object
   * @param context Optional context data
   */
  public fatal(
    message: string,
    error?: Error,
    context?: Record<string, unknown>,
  ): void {
    if (error && context) {
      // Combine error and context
      const combinedContext = {
        ...context,
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
      };
      this._logger.fatal(message, combinedContext);
    } else if (error) {
      this._logger.fatal(message, error);
    } else if (context) {
      this._logger.fatal(message, context);
    } else {
      this._logger.fatal(message);
    }
  }

  /**
   * Log a database query
   *
   * @param sql The SQL query
   * @param params The query parameters
   * @param duration The query duration in milliseconds
   * @param dbType The database type (e.g., 'PostgreSQL')
   * @param requestId Optional request ID for tracing
   */
  public logQuery(
    sql: string,
    params: unknown[],
    duration: number,
    dbType: string = "PostgreSQL",
    requestId?: string,
  ): void {
    this._queryLogger.logQuery(sql, params, duration, dbType, requestId);
  }

  /**
   * Get query statistics
   */
  public getQueryStats() {
    return this._queryLogger.getStats();
  }
}

// Export a default instance for easy import
export const logger = LoggerService.getInstance();
