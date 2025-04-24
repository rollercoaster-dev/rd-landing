import { SignJWT, jwtVerify, type JWTPayload } from "jose";

// Define the structure of our JWT payload
export interface AppJwtPayload extends JWTPayload {
  sub: string; // User ID
  // Add any other custom claims you need, e.g., roles, permissions
}

/**
 * Service for handling JWT generation and verification using 'jose'.
 */
export class JwtService {
  private static JWT_SECRET: Uint8Array | null = null;

  private static readonly JWT_EXPIRY_SECONDS = parseInt(
    process.env.RD_JWT_EXPIRY_SECONDS ?? "3600",
    10,
  ); // Default 1 hour
  private static readonly ALGORITHM = "HS256";

  /**
   * Initializes the service by encoding the JWT secret.
   * Throws an error if the JWT_SECRET environment variable is not set.
   */
  private static initialize() {
    // Only initialize if needed
    if (this.JWT_SECRET) {
      return;
    }

    // Read the secret directly from process.env *when* initialization is needed
    const secretString = process.env.RD_JWT_SECRET;
    if (!secretString) {
      console.error(
        "[JWT] RD_JWT_SECRET environment variable is not set or is empty during initialization.",
      );
      throw new Error(
        "RD_JWT_SECRET environment variable is not set or is empty.",
      );
    }

    try {
      const encoder = new TextEncoder();
      this.JWT_SECRET = encoder.encode(secretString);
      console.debug(`[JWT] Secret initialized successfully`);
    } catch (error) {
      console.error("[JWT] Error encoding JWT secret string:", error);
      throw new Error("Failed to encode JWT secret");
    }

    // Final check
    if (!this.JWT_SECRET) {
      // This case should be unlikely if encode doesn't throw, but good practice
      console.error("[JWT] Failed to set JWT_SECRET during initialization.");
      throw new Error("JWT Secret could not be processed.");
    }
  }

  /**
   * Generates a JWT token for a given user ID.
   *
   * @param userId The ID of the user to include in the token's 'sub' claim.
   * @param additionalClaims Optional additional claims to include in the payload.
   *        Using 'unknown' for flexibility, consider defining a stricter type if possible.
   * @returns A promise that resolves with the signed JWT string.
   */
  static async generateToken(
    userId: string,
    additionalClaims: Record<string, unknown> = {},
  ): Promise<string> {
    try {
      console.debug(`[JWT] Generating token for user ID: ${userId}`);
      // Don't log the full claims object which may contain sensitive information
      const claimKeys = Object.keys(additionalClaims);
      console.debug(`[JWT] Including claims: ${claimKeys.join(", ")}`);

      this.initialize(); // Ensure secret is read and encoded if needed

      // Explicitly check JWT_SECRET before signing
      const secret = this.JWT_SECRET;
      if (!secret) {
        console.error(
          "[JWT] Cannot sign token: JWT secret is not available after initialization.",
        );
        throw new Error("Token generation failed due to missing secret.");
      }

      const issuedAt = Math.floor(Date.now() / 1000);
      const expiresAt = issuedAt + this.JWT_EXPIRY_SECONDS;

      console.debug(
        `[JWT] Token will expire in ${this.JWT_EXPIRY_SECONDS} seconds (at ${new Date(expiresAt * 1000).toISOString()})`,
      );

      const token = await new SignJWT({ ...additionalClaims, sub: userId })
        .setProtectedHeader({ alg: this.ALGORITHM })
        .setIssuedAt(issuedAt)
        // Consider adding issuer (iss) and audience (aud) claims for better security
        // .setIssuer('your_app_identifier')
        // .setAudience('your_app_audience')
        .setExpirationTime(expiresAt)
        .sign(secret); // Use the validated secret

      console.debug(`[JWT] Token generated successfully`);
      return token;
    } catch (error: unknown) {
      // Catch specific error
      console.error(
        "[JWT] Failed to generate JWT token:",
        error instanceof Error ? error.message : error,
      );
      // Check if it's one of the specific errors we throw
      if (
        error instanceof Error &&
        (error.message.includes("missing secret") ||
          error.message.includes("RD_JWT_SECRET") ||
          error.message.includes("encode JWT secret"))
      ) {
        throw error; // Propagate specific initialization/secret errors
      }
      // Otherwise, assume it's a signing error or other issue from jose
      throw new Error("Token generation failed during signing process");
    }
  }

  /**
   * Verifies a JWT token and returns its payload if valid.
   *
   * @param token The JWT string to verify.
   * @returns A promise that resolves with the validated AppJwtPayload.
   * @throws An error if the token is invalid, expired, or verification fails.
   */
  static async verifyToken(token: string): Promise<AppJwtPayload> {
    try {
      this.initialize(); // Ensure secret is read and encoded if needed

      // Explicitly check JWT_SECRET before verifying
      const secret = this.JWT_SECRET;
      if (!secret) {
        console.error(
          "[JWT] Cannot verify token: JWT secret is not available after initialization.",
        );
        throw new Error("Token verification failed due to missing secret.");
      }

      const { payload } = await jwtVerify(
        token,
        secret, // Use the validated secret
        {
          algorithms: [this.ALGORITHM],
        },
      );

      // Basic check for subject claim (user ID)
      if (!payload.sub) {
        throw new Error("Token payload missing required subject (sub) claim.");
      }

      // Cast to our specific payload type (add more checks if needed)
      return payload as AppJwtPayload;
    } catch (_error) {
      // Propagate specific initialization/secret errors first
      if (
        _error instanceof Error &&
        (_error.message.includes("missing secret") ||
          _error.message.includes("RD_JWT_SECRET") ||
          _error.message.includes("encode JWT secret"))
      ) {
        throw _error;
      }

      // Log specific jose errors differently if needed
      let errorMessage = "Invalid or expired token";
      if (_error instanceof Error) {
        // Check jose error codes if available
        // Safer check for the 'code' property
        const joseErrorCode =
          typeof _error === "object" && _error !== null && "code" in _error
            ? _error.code
            : undefined;
        if (joseErrorCode === "ERR_JWT_EXPIRED") {
          console.info("JWT verification failed: Token expired");
          errorMessage = "Token expired";
        } else if (
          joseErrorCode === "ERR_JWS_INVALID" ||
          joseErrorCode === "ERR_JWS_SIGNATURE_VERIFICATION_FAILED"
        ) {
          console.warn("JWT verification failed: Invalid signature or format");
          errorMessage = "Invalid token signature or format";
        } else {
          console.error("JWT verification failed:", _error.message);
          errorMessage = "Token verification failed";
        }
      } else {
        // Handle non-Error throws if necessary
        console.error("JWT verification failed with non-Error:", _error);
        errorMessage = "An unexpected error occurred during token verification";
      }
      // Re-throw a specific error message
      throw new Error(errorMessage);
    }
  }
}
