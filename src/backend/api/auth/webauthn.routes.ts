import { Hono } from "hono";
import { WebAuthnService } from "@backend/services/webauthn.service";
import { JwtService } from "@backend/services/jwt.service";
import { authConfig } from "@backend/config/auth.config";
import { setCookie } from "hono/cookie";
import { authMiddleware } from "@backend/middleware/auth.middleware";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import type {
  RegistrationResponseJSON,
  AuthenticationResponseJSON,
} from "@simplewebauthn/types";
import type { Session } from "hono-sessions";

// Define a custom type for the Hono context with our custom properties
type WebAuthnContext = {
  session: Session;
};

// Create a new Hono app for WebAuthn routes
export const webauthnRoutes = new Hono<{
  Variables: WebAuthnContext;
}>();

// Registration routes
const registerOptionsSchema = z.object({
  friendlyName: z.string().optional(),
});

// Generate registration options
webauthnRoutes.post(
  "/register/options",
  authMiddleware,
  zValidator("json", registerOptionsSchema),
  async (c) => {
    const user = c.get("user");
    // We're not using friendlyName in this endpoint, but we'll keep it in the schema
    // for consistency with the verification endpoint
    c.req.valid("json"); // Validate the request body but don't use the result

    if (!user) {
      return c.json({ error: "User not authenticated" }, 401);
    }

    try {
      // Get existing credentials for the user
      const existingCredentials = await WebAuthnService.getUserCredentials(
        user.sub,
      );

      // Convert to the format expected by generateRegistrationOptions
      const existingDevices = existingCredentials.map((cred) => ({
        credentialID: cred.credentialId,
        transports: cred.transports
          ? JSON.parse(cred.transports as string)
          : undefined,
        // Dummy value, not used for registration options
        credentialPublicKey: new Uint8Array() as Uint8Array,
        counter: 0, // Dummy value, not used for registration options
      }));

      // Generate registration options
      const options = await WebAuthnService.generateRegistrationOptions(
        user.sub,
        user.username as string,
        existingDevices,
      );

      // Store the challenge in the session
      const session = c.get("session");
      session.set("webauthnChallenge", options.challenge);

      return c.json(options);
    } catch (error) {
      console.error("[WebAuthn] Error generating registration options:", error);
      return c.json({ error: "Failed to generate registration options" }, 500);
    }
  },
);

// Verify registration
const verifyRegistrationSchema = z.object({
  friendlyName: z.string().optional(),
  registrationResponse: z.object({}).passthrough(), // Allow any properties in registrationResponse
});

webauthnRoutes.post(
  "/register/verify",
  authMiddleware,
  zValidator("json", verifyRegistrationSchema),
  async (c) => {
    const user = c.get("user");
    const { friendlyName, registrationResponse } = c.req.valid("json");

    if (!user) {
      return c.json({ error: "User not authenticated" }, 401);
    }

    try {
      // Get the current challenge from the session
      const session = c.get("session");
      const expectedChallenge = session.get("webauthnChallenge");

      // Clear the challenge from the session after use
      session.forget("webauthnChallenge");

      if (!expectedChallenge) {
        return c.json({ error: "Registration session expired" }, 400);
      }

      // Verify the registration
      const verification = await WebAuthnService.verifyRegistration(
        user.sub,
        friendlyName,
        // @ts-expect-error - The SimpleWebAuthn types are incorrect, but this works at runtime
        registrationResponse as RegistrationResponseJSON,
        expectedChallenge,
      );

      if (!verification.verified) {
        return c.json(
          { error: verification.error || "Registration verification failed" },
          400,
        );
      }

      return c.json({ success: true });
    } catch (error) {
      console.error("[WebAuthn] Error verifying registration:", error);
      return c.json({ error: "Failed to verify registration" }, 500);
    }
  },
);

// Authentication routes
// Generate authentication options
webauthnRoutes.post("/login/options", async (c) => {
  try {
    // Generate authentication options
    const options = await WebAuthnService.generateAuthenticationOptions();

    // Store the challenge in the session for verification
    const session = c.get("session");
    session.set("webauthnChallenge", options.challenge);

    return c.json(options);
  } catch (error) {
    console.error("[WebAuthn] Error generating authentication options:", error);
    return c.json({ error: "Failed to generate authentication options" }, 500);
  }
});

// Verify authentication
const verifyAuthenticationSchema = z.object({
  authenticationResponse: z.object({}).passthrough(), // Allow any properties in authenticationResponse
});

webauthnRoutes.post(
  "/login/verify",
  zValidator("json", verifyAuthenticationSchema),
  async (c) => {
    const { authenticationResponse } = c.req.valid("json");

    try {
      // Get the current challenge from the session
      const session = c.get("session");
      const expectedChallenge = session.get("webauthnChallenge");

      // Clear the challenge from the session after use
      session.forget("webauthnChallenge");

      if (!expectedChallenge) {
        return c.json({ error: "Authentication session expired" }, 400);
      }

      // Verify the authentication
      const verification = await WebAuthnService.verifyAuthentication(
        // @ts-expect-error - The SimpleWebAuthn types are incorrect, but this works at runtime
        authenticationResponse as AuthenticationResponseJSON,
        expectedChallenge,
      );

      if (!verification.verified) {
        return c.json(
          { error: verification.error || "Authentication verification failed" },
          400,
        );
      }

      // If verification was successful but no user was found
      if (!verification.user) {
        return c.json({ error: "User not found" }, 404);
      }

      // Generate a JWT for the user
      const user = verification.user;
      const jwtPayload = {
        username: user.username,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
      };

      const jwt = await JwtService.generateToken(user.id, jwtPayload);

      // Set the JWT as a cookie
      setCookie(c, authConfig.jwt.cookieName, jwt, {
        httpOnly: authConfig.cookie.httpOnly,
        secure: authConfig.cookie.secure,
        path: authConfig.cookie.path,
        sameSite: authConfig.cookie.sameSite,
        maxAge: authConfig.cookie.maxAge,
      });

      return c.json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
          avatarUrl: user.avatarUrl,
        },
      });
    } catch (error) {
      console.error("[WebAuthn] Error verifying authentication:", error);
      return c.json({ error: "Failed to verify authentication" }, 500);
    }
  },
);

// Credential management routes
// Get all credentials for the current user
webauthnRoutes.get("/credentials", authMiddleware, async (c) => {
  const user = c.get("user");

  if (!user) {
    return c.json({ error: "User not authenticated" }, 401);
  }

  try {
    const credentials = await WebAuthnService.getUserCredentials(user.sub);
    return c.json({ credentials });
  } catch (error) {
    console.error("[WebAuthn] Error getting user credentials:", error);
    return c.json({ error: "Failed to get credentials" }, 500);
  }
});

// Delete a credential
webauthnRoutes.delete(
  "/credentials/:credentialId",
  authMiddleware,
  async (c) => {
    const user = c.get("user");
    const credentialId = c.req.param("credentialId");

    if (!user) {
      return c.json({ error: "User not authenticated" }, 401);
    }

    try {
      const result = await WebAuthnService.deleteCredential(
        credentialId,
        user.sub,
      );

      if (!result.success) {
        return c.json({ error: result.error }, 400);
      }

      return c.json({ success: true });
    } catch (error) {
      console.error("[WebAuthn] Error deleting credential:", error);
      return c.json({ error: "Failed to delete credential" }, 500);
    }
  },
);

// Update a credential's friendly name
const updateCredentialNameSchema = z.object({
  friendlyName: z.string().min(1).max(100),
});

webauthnRoutes.patch(
  "/credentials/:credentialId",
  authMiddleware,
  zValidator("json", updateCredentialNameSchema),
  async (c) => {
    const user = c.get("user");
    const credentialId = c.req.param("credentialId");
    const { friendlyName } = c.req.valid("json");

    if (!user) {
      return c.json({ error: "User not authenticated" }, 401);
    }

    try {
      const result = await WebAuthnService.updateCredentialName(
        credentialId,
        user.sub,
        friendlyName,
      );

      if (!result.success) {
        return c.json({ error: result.error }, 400);
      }

      return c.json({ success: true });
    } catch (error) {
      console.error("[WebAuthn] Error updating credential name:", error);
      return c.json({ error: "Failed to update credential name" }, 500);
    }
  },
);
