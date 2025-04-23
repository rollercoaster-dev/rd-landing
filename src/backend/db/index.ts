import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema"; // Import your schema

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Client for standard query operations (includes schema)
const queryClient = postgres(process.env.DATABASE_URL);
export const db = drizzle(queryClient, { schema, logger: true }); // Added logger for potential insights

// Client specifically for migrations
export const migrationClient = postgres(process.env.DATABASE_URL, {
  max: 1,
});
// Drizzle instance for migration runner (WITHOUT schema, relying on migrator internals)
export const migrationDb = drizzle(migrationClient, { logger: true }); // Reverted: Removed schema
