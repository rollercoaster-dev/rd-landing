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
  private static readonly JWT_SECRET_STRING = process.env.RD_JWT_SECRET;
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
    if (!this.JWT_SECRET_STRING) {
      throw new Error(
        "RD_JWT_SECRET environment variable is not set or is empty.",
      );
    }
    if (!this.JWT_SECRET) {
      // Initialize the JWT secret without logging it
      const encoder = new TextEncoder();
      this.JWT_SECRET = encoder.encode(this.JWT_SECRET_STRING);
      console.debug(`[JWT] Secret initialized successfully`);
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

      this.initialize(); // Ensure secret is encoded
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
        .sign(this.JWT_SECRET!); // Use the encoded secret (non-null asserted due to initialize)

      console.debug(`[JWT] Token generated successfully`);
      return token;
    } catch (error) {
      // Log error without potentially sensitive details
      console.error("[JWT] Failed to generate JWT token");
      throw new Error("Token generation failed");
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
      this.initialize(); // Ensure secret is encoded
      const { payload } = await jwtVerify(
        token,
        this.JWT_SECRET!, // Use the encoded secret
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
    } catch (error: unknown) {
      // Log specific jose errors differently if needed
      let errorMessage = "Invalid or expired token";
      if (error instanceof Error) {
        // Check jose error codes if available
        // Safer check for the 'code' property
        const joseErrorCode =
          typeof error === "object" && error !== null && "code" in error
            ? error.code
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
          console.error("JWT verification failed:", error.message);
          errorMessage = "Token verification failed";
        }
      } else {
        // Handle non-Error throws if necessary
        console.error("JWT verification failed with non-Error:", error);
        errorMessage = "An unexpected error occurred during token verification";
      }
      // Re-throw a specific error message
      throw new Error(errorMessage);
    }
  }
}
