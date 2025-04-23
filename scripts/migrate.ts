import { migrate } from "drizzle-orm/postgres-js/migrator";
// Import the dedicated migration DB instance and the raw client for closing
import { migrationDb, migrationClient } from "../src/backend/db";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

async function runMigrations() {
  console.log("🔌 Connecting to database for migration...");
  try {
    // Perform the migration using the shared migrationDb instance
    console.log("⏳ Running migrations...");
    await migrate(migrationDb, { migrationsFolder: "./drizzle/migrations" });
    console.log("✅ Migrations applied successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  } finally {
    // Ensure the raw migration client connection is closed
    console.log("🚪 Closing migration connection...");
    await migrationClient.end();
    console.log("👋 Migration process finished.");
  }
}

runMigrations();
