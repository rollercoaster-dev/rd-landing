import nodemailer from "nodemailer";
import { createId } from "@paralleldrive/cuid2";
import { db } from "@backend/db";
import { verificationTokens } from "@backend/db/schema";
import { eq, and } from "drizzle-orm";
import crypto from "crypto";

// Email configuration
const EMAIL_FROM = process.env.RD_EMAIL_FROM || "noreply@rollercoaster.dev";
const EMAIL_HOST = process.env.RD_EMAIL_HOST || "localhost";
const EMAIL_PORT = parseInt(process.env.RD_EMAIL_PORT || "1025", 10);
const EMAIL_SECURE = process.env.RD_EMAIL_SECURE === "true";
const EMAIL_USER = process.env.RD_EMAIL_USER;
const EMAIL_PASS = process.env.RD_EMAIL_PASS;
const FRONTEND_URL = process.env.RD_FRONTEND_URL || "http://localhost:5173";

// Token expiration time (24 hours by default, longer than typical for accessibility)
const TOKEN_EXPIRY_HOURS = parseInt(
  process.env.RD_TOKEN_EXPIRY_HOURS || "24",
  10,
);

// Create a transporter based on environment
const createTransporter = () => {
  // For development, use a local SMTP server like MailDev
  if (process.env.NODE_ENV === "development") {
    return nodemailer.createTransport({
      host: "localhost",
      port: 1025,
      secure: false,
      ignoreTLS: true,
    });
  }

  // For production, use the configured SMTP server
  return nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_SECURE,
    auth:
      EMAIL_USER && EMAIL_PASS
        ? {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
          }
        : undefined,
  });
};

/**
 * Email service for sending verification emails
 */
export class EmailService {
  /**
   * Generate a verification token for a user
   * @param userId The user ID
   * @param type The token type (e.g., 'email', 'password-reset')
   * @returns The generated token
   */
  static async generateToken(userId: string, type: string) {
    console.log(`[EmailService] Generating ${type} token for user: ${userId}`);

    // Generate a random token
    const tokenValue = crypto.randomBytes(32).toString("hex");

    // Hash the token for storage
    const hashedToken = crypto
      .createHash("sha256")
      .update(tokenValue)
      .digest("hex");

    // Calculate expiration time
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + TOKEN_EXPIRY_HOURS);

    // Delete any existing tokens of the same type for this user
    await db
      .delete(verificationTokens)
      .where(
        and(
          eq(verificationTokens.userId, userId),
          eq(verificationTokens.type, type),
        ),
      );

    // Create a new token
    const token = {
      id: createId(),
      userId,
      token: hashedToken,
      type,
      expiresAt,
    };

    // Store the token in the database
    await db.insert(verificationTokens).values(token);

    return tokenValue;
  }

  /**
   * Verify a token
   * @param userId The user ID
   * @param token The token to verify
   * @param type The token type
   * @returns Whether the token is valid
   */
  static async verifyToken(userId: string, token: string, type: string) {
    console.log(`[EmailService] Verifying ${type} token for user: ${userId}`);

    // Hash the token for comparison
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find the token in the database
    const tokenResult = await db
      .select()
      .from(verificationTokens)
      .where(
        and(
          eq(verificationTokens.userId, userId),
          eq(verificationTokens.token, hashedToken),
          eq(verificationTokens.type, type),
        ),
      )
      .limit(1);

    if (tokenResult.length === 0) {
      console.warn(`[EmailService] Token not found for user: ${userId}`);
      return { valid: false, error: "Token not found" };
    }

    const storedToken = tokenResult[0];

    // Check if the token has expired
    if (new Date() > storedToken.expiresAt) {
      console.warn(`[EmailService] Token expired for user: ${userId}`);
      return { valid: false, error: "Token expired" };
    }

    // Delete the token after verification
    await db
      .delete(verificationTokens)
      .where(eq(verificationTokens.id, storedToken.id));

    return { valid: true };
  }

  /**
   * Send an email verification email
   * @param to The recipient email address
   * @param userId The user ID
   * @returns Whether the email was sent successfully
   */
  static async sendVerificationEmail(to: string, userId: string) {
    console.log(`[EmailService] Sending verification email to: ${to}`);

    try {
      // Generate a verification token
      const token = await this.generateToken(userId, "email");

      // Create the verification URL
      const verificationUrl = `${FRONTEND_URL}/verify-email?token=${token}&userId=${userId}`;

      // Create the email content
      const emailContent = {
        from: `"Rollercoaster.dev" <${EMAIL_FROM}>`,
        to,
        subject: "Verify your email address",
        text: `
Hello,

Thank you for registering with Rollercoaster.dev!

Please verify your email address by clicking on the following link:
${verificationUrl}

This link will expire in ${TOKEN_EXPIRY_HOURS} hours.

If you did not register for an account, you can safely ignore this email.

Best regards,
The Rollercoaster.dev Team
        `,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify your email address</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .container {
      background-color: #f9f9f9;
      border-radius: 8px;
      padding: 20px;
      margin-top: 20px;
    }
    .button {
      display: inline-block;
      background-color: #6e18dd;
      color: white;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 4px;
      margin: 20px 0;
      font-weight: bold;
    }
    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Verify your email address</h1>
    <p>Thank you for registering with Rollercoaster.dev!</p>
    <p>Please verify your email address by clicking on the button below:</p>
    <a href="${verificationUrl}" class="button">Verify Email Address</a>
    <p>Or copy and paste this link into your browser:</p>
    <p>${verificationUrl}</p>
    <p>This link will expire in ${TOKEN_EXPIRY_HOURS} hours.</p>
    <p>If you did not register for an account, you can safely ignore this email.</p>
  </div>
  <div class="footer">
    <p>Best regards,<br>The Rollercoaster.dev Team</p>
  </div>
</body>
</html>
        `,
      };

      // Send the email
      const transporter = createTransporter();
      const info = await transporter.sendMail(emailContent);

      console.log(`[EmailService] Email sent: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error(`[EmailService] Error sending verification email:`, error);
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Send a password reset email
   * @param to The recipient email address
   * @param userId The user ID
   * @returns Whether the email was sent successfully
   */
  static async sendPasswordResetEmail(to: string, userId: string) {
    console.log(`[EmailService] Sending password reset email to: ${to}`);

    try {
      // Generate a password reset token
      const token = await this.generateToken(userId, "password-reset");

      // Create the reset URL
      const resetUrl = `${FRONTEND_URL}/reset-password?token=${token}&userId=${userId}`;

      // Create the email content
      const emailContent = {
        from: `"Rollercoaster.dev" <${EMAIL_FROM}>`,
        to,
        subject: "Reset your password",
        text: `
Hello,

We received a request to reset your password for your Rollercoaster.dev account.

Please click on the following link to reset your password:
${resetUrl}

This link will expire in ${TOKEN_EXPIRY_HOURS} hours.

If you did not request a password reset, you can safely ignore this email.

Best regards,
The Rollercoaster.dev Team
        `,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset your password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .container {
      background-color: #f9f9f9;
      border-radius: 8px;
      padding: 20px;
      margin-top: 20px;
    }
    .button {
      display: inline-block;
      background-color: #6e18dd;
      color: white;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 4px;
      margin: 20px 0;
      font-weight: bold;
    }
    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Reset your password</h1>
    <p>We received a request to reset your password for your Rollercoaster.dev account.</p>
    <p>Please click on the button below to reset your password:</p>
    <a href="${resetUrl}" class="button">Reset Password</a>
    <p>Or copy and paste this link into your browser:</p>
    <p>${resetUrl}</p>
    <p>This link will expire in ${TOKEN_EXPIRY_HOURS} hours.</p>
    <p>If you did not request a password reset, you can safely ignore this email.</p>
  </div>
  <div class="footer">
    <p>Best regards,<br>The Rollercoaster.dev Team</p>
  </div>
</body>
</html>
        `,
      };

      // Send the email
      const transporter = createTransporter();
      const info = await transporter.sendMail(emailContent);

      console.log(`[EmailService] Email sent: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error(
        `[EmailService] Error sending password reset email:`,
        error,
      );
      return { success: false, error: (error as Error).message };
    }
  }
}
