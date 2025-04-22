import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { env } from "bun";

// Define the structure of our JWT payload
export interface AppJwtPayload extends JWTPayload {
  sub: string; // User ID
  // Add any other custom claims you need, e.g., roles, permissions
}

/**
 * Service for handling JWT generation and verification using 'jose'.
 */
export class JwtService {
  private static readonly JWT_SECRET_STRING = env.JWT_SECRET;
  private static readonly JWT_EXPIRY_SECONDS = parseInt(
    env.JWT_EXPIRY_SECONDS ?? "3600",
    10,
  ); // Default 1 hour
  private static readonly ALGORITHM = "HS256";

  private static secretKeyPromise: Promise<Uint8Array> | null = null;

  /**
   * Lazily initializes and returns the encoded secret key.
   * Throws an error if JWT_SECRET is not set.
   */
  private static getSecretKey(): Promise<Uint8Array> {
    if (!this.JWT_SECRET_STRING) {
      console.error("FATAL: JWT_SECRET environment variable is not set.");
      throw new Error("JWT secret is not configured.");
    }
    // Cache the promise to avoid re-encoding
    if (!this.secretKeyPromise) {
      this.secretKeyPromise = Promise.resolve(
        new TextEncoder().encode(this.JWT_SECRET_STRING),
      );
    }
    return this.secretKeyPromise;
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
      const secretKey = await this.getSecretKey();
      const issuedAt = Math.floor(Date.now() / 1000);
      const expiresAt = issuedAt + this.JWT_EXPIRY_SECONDS;

      const token = await new SignJWT({ ...additionalClaims })
        .setProtectedHeader({ alg: this.ALGORITHM })
        .setSubject(userId)
        .setIssuedAt(issuedAt)
        // Consider adding issuer (iss) and audience (aud) claims for better security
        // .setIssuer('your_app_identifier')
        // .setAudience('your_app_audience')
        .setExpirationTime(expiresAt)
        .sign(secretKey);

      return token;
    } catch (error) {
      console.error("Failed to generate JWT token:", error);
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
      const secretKey = await this.getSecretKey();
      const { payload } = await jwtVerify(token, secretKey, {
        // Specify required algorithms, issuer, audience etc. for verification if set during generation
        // algorithms: [this.ALGORITHM],
        // issuer: 'your_app_identifier',
        // audience: 'your_app_audience',
      });

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
