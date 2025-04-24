-- Rename github_id to email_verified and drop unique constraint
ALTER TABLE "user" RENAME COLUMN "github_id" TO "email_verified";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_github_id_unique";--> statement-breakpoint
-- Make email nullable
ALTER TABLE "user" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint

-- Add new key columns as nullable initially
ALTER TABLE "key" ADD COLUMN "provider" text;--> statement-breakpoint
ALTER TABLE "key" ADD COLUMN "provider_user_id" text;--> statement-breakpoint

-- Update existing rows assuming they are GitHub keys
UPDATE "key" SET "provider" = 'github' WHERE "provider" IS NULL;--> statement-breakpoint
UPDATE "key" SET "provider_user_id" = SUBSTRING("id" FROM 8) WHERE "provider" = 'github' AND "provider_user_id" IS NULL AND "id" LIKE 'github:%';--> statement-breakpoint

-- Now apply the NOT NULL constraints
ALTER TABLE "key" ALTER COLUMN "provider" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "key" ALTER COLUMN "provider_user_id" SET NOT NULL;--> statement-breakpoint