import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema"; // Import your schema
import { logger } from "../services/logger.service";

// Check for database URL environment variable
if (!process.env.RD_DATABASE_URL) {
  // Check if we're in a test environment
  if (process.env.NODE_ENV !== "test" && !process.env.VITEST) {
    throw new Error("RD_DATABASE_URL environment variable is not set");
  } else {
    // In test environment, use an in-memory SQLite database URL
    process.env.RD_DATABASE_URL =
      "postgres://postgres:postgres@localhost:5432/test";
    console.log("Using test database URL for testing");
  }
}

// Client for standard query operations (includes schema)
const queryClient = postgres(process.env.RD_DATABASE_URL);

// Custom query logging function
const customLogger = {
  logQuery: (query: string, params: unknown[]) => {
    const startTime = Date.now();
    return {
      queryEnd: (result: unknown) => {
        const duration = Date.now() - startTime;
        logger.logQuery(query, params as unknown[], duration);
        return result;
      },
    };
  },
};

export const db = drizzle(queryClient, { schema, logger: customLogger });

// Client specifically for migrations
export const migrationClient = postgres(process.env.RD_DATABASE_URL, {
  max: 1,
});
// Drizzle instance for migration runner (WITHOUT schema, relying on migrator internals)
export const migrationDb = drizzle(migrationClient, { logger: customLogger }); // Using our custom logger
