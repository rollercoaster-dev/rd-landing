import { Hono } from "hono";
import { EmailService } from "@backend/services/email.service";
import { db } from "@backend/db";
import { users } from "@backend/db/schema";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { authMiddleware } from "@backend/middleware/auth.middleware";

// Create a new Hono app for email routes
export const emailRoutes = new Hono();

// Send verification email
const sendVerificationEmailSchema = z.object({
  email: z.string().email(),
});

emailRoutes.post(
  "/send-verification",
  authMiddleware,
  zValidator("json", sendVerificationEmailSchema),
  async (c) => {
    const user = c.get("user");
    const { email } = c.req.valid("json");

    if (!user) {
      return c.json({ error: "User not authenticated" }, 401);
    }

    try {
      // Check if the email matches the user's email
      const userResult = await db
        .select()
        .from(users)
        .where(eq(users.id, user.sub))
        .limit(1);

      if (userResult.length === 0) {
        return c.json({ error: "User not found" }, 404);
      }

      const dbUser = userResult[0];

      // If the user's email is already verified, return an error
      if (dbUser.emailVerified) {
        return c.json({ error: "Email already verified" }, 400);
      }

      // If the email doesn't match the user's email, update it
      if (dbUser.email !== email) {
        await db
          .update(users)
          .set({ email })
          .where(eq(users.id, user.sub));
      }

      // Send the verification email
      const result = await EmailService.sendVerificationEmail(email, user.sub);

      if (!result.success) {
        return c.json({ error: result.error }, 500);
      }

      return c.json({ success: true });
    } catch (error) {
      console.error("[Email] Error sending verification email:", error);
      return c.json({ error: "Failed to send verification email" }, 500);
    }
  }
);

// Verify email
const verifyEmailSchema = z.object({
  token: z.string(),
  userId: z.string(),
});

emailRoutes.post(
  "/verify",
  zValidator("json", verifyEmailSchema),
  async (c) => {
    const { token, userId } = c.req.valid("json");

    try {
      // Verify the token
      const verification = await EmailService.verifyToken(
        userId,
        token,
        "email"
      );

      if (!verification.valid) {
        return c.json({ error: verification.error }, 400);
      }

      // Update the user's email verification status
      await db
        .update(users)
        .set({ emailVerified: new Date() })
        .where(eq(users.id, userId));

      return c.json({ success: true });
    } catch (error) {
      console.error("[Email] Error verifying email:", error);
      return c.json({ error: "Failed to verify email" }, 500);
    }
  }
);

// Request password reset
const requestPasswordResetSchema = z.object({
  email: z.string().email(),
});

emailRoutes.post(
  "/request-password-reset",
  zValidator("json", requestPasswordResetSchema),
  async (c) => {
    const { email } = c.req.valid("json");

    try {
      // Find the user by email
      const userResult = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (userResult.length === 0) {
        // For security reasons, don't reveal that the email doesn't exist
        return c.json({ success: true });
      }

      const user = userResult[0];

      // Send the password reset email
      await EmailService.sendPasswordResetEmail(email, user.id);

      return c.json({ success: true });
    } catch (error) {
      console.error("[Email] Error requesting password reset:", error);
      // For security reasons, don't reveal that an error occurred
      return c.json({ success: true });
    }
  }
);

// Reset password
const resetPasswordSchema = z.object({
  token: z.string(),
  userId: z.string(),
  password: z.string().min(8),
});

emailRoutes.post(
  "/reset-password",
  zValidator("json", resetPasswordSchema),
  async (c) => {
    const { token, userId } = c.req.valid("json");
    // Password will be used when we implement password-based authentication

    try {
      // Verify the token
      const verification = await EmailService.verifyToken(
        userId,
        token,
        "password-reset"
      );

      if (!verification.valid) {
        return c.json({ error: verification.error }, 400);
      }

      // TODO: Implement password hashing and updating
      // This will be implemented when we add password-based authentication

      return c.json({ success: true });
    } catch (error) {
      console.error("[Email] Error resetting password:", error);
      return c.json({ error: "Failed to reset password" }, 500);
    }
  }
);
