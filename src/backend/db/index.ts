import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema"; // Import your schema

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
export const db = drizzle(queryClient, { schema, logger: true }); // Added logger for potential insights

// Client specifically for migrations
export const migrationClient = postgres(process.env.RD_DATABASE_URL, {
  max: 1,
});
// Drizzle instance for migration runner (WITHOUT schema, relying on migrator internals)
export const migrationDb = drizzle(migrationClient, { logger: true }); // Reverted: Removed schema
