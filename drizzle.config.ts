import type { Config } from "drizzle-kit";

if (!process.env.RD_DATABASE_URL) {
  throw new Error("RD_DATABASE_URL environment variable is required.");
}

export default {
  schema: "./src/backend/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql", // Specify the SQL dialect
  dbCredentials: {
    url: process.env.RD_DATABASE_URL, // Use 'url' instead of 'connectionString'
  },
  verbose: true,
  strict: true,
} satisfies Config;
