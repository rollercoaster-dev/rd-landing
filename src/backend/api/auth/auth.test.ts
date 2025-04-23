import { describe, expect, it } from "vitest";
import { setupHonoTest } from "../../test/setup";

describe("Authentication API Routes", () => {
  const { client } = setupHonoTest();

  describe("WebAuthn Routes", () => {
    it("should require authentication for protected routes", async () => {
      const { error, status } = await client.post(
        "/api/auth/webauthn/register/options",
      );

      expect(error).not.toBeNull();
      expect(status).toBe(401);
    });
  });

  describe("Email Authentication Routes", () => {
    it("should require authentication for protected routes", async () => {
      const { error, status } = await client.post(
        "/api/auth/email/send-verification",
      );

      expect(error).not.toBeNull();
      expect(status).toBe(401);
    });
  });
});
