import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: varchar("id", { length: 255 }).primaryKey(),
  username: varchar("username", { length: 255 }).unique().notNull(),
  email: text("email").unique(), // Allow null emails
  name: text("name"),
  avatarUrl: text("avatar_url"),
  // Removed githubId - Linking happens via 'keys' table now
  emailVerified: timestamp("email_verified", { withTimezone: true }), // Added nullable timestamp
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const sessions = pgTable("session", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const keys = pgTable("key", {
  id: varchar("id", { length: 255 }).primaryKey(), // e.g., 'github:<github_user_id>'
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  hashedPassword: text("hashed_password"), // For password-based login
  // Added fields for OAuth provider linking
  provider: text("provider").notNull(), // e.g., 'github', 'google'
  providerUserId: text("provider_user_id").notNull(), // User's ID from the provider
});
