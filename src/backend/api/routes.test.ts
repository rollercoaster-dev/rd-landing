import { describe, it, expect, beforeAll } from "vitest";
import { authConfig } from "@backend/config/auth.config";
import { JwtService } from "@backend/services/jwt.service";
import type { User } from "@shared/types";
import { Elysia } from "elysia";
import { cookie } from "@elysiajs/cookie";
import { jwt } from "@elysiajs/jwt";

describe("API Routes - /api (Isolated Test)", () => {
  // Define the app instance
  let app: ReturnType<typeof createTestApp>;

  // Helper function to create a properly typed test app
  function createTestApp() {
    return new Elysia()
      .use(cookie())
      .use(
        jwt({
          name: "jwt",
          secret: authConfig.jwt.secret,
        }),
      )
      .get("/test", () => ({ status: "ok" }))
      .get("/me", async ({ request, set, jwt }) => {
        // Simplified auth middleware logic for tests
        // Parse cookie manually from the request headers instead of relying on the cookie plugin
        const cookieHeader = request.headers.get("Cookie");
        console.log("[Test] Cookie header:", cookieHeader);

        if (!cookieHeader) {
          set.status = 401;
          return { message: "Unauthorized" };
        }

        // Parse the cookie header to get the token
        const cookies = cookieHeader.split(";").reduce(
          (acc, cookie) => {
            const [name, value] = cookie.trim().split("=");
            acc[name] = value;
            return acc;
          },
          {} as Record<string, string>,
        );

        const tokenValue = cookies[authConfig.jwt.cookieName];
        console.log("[Test] Token found:", !!tokenValue);

        if (!tokenValue) {
          set.status = 401;
          return { message: "Unauthorized" };
        }

        try {
          console.log("[Test] Verifying token...");
          const payload = await jwt.verify(tokenValue);
          console.log("[Test] Token verification result:", payload);

          if (!payload) {
            set.status = 401;
            return { message: "Invalid token" };
          }

          // Return the user data from the JWT payload
          return { user: payload };
        } catch (error) {
          console.error("[Test] Token verification error:", error);
          set.status = 401;
          return { message: "Invalid token" };
        }
      });
  }

  beforeAll(() => {
    // Create a test app using our helper function
    app = createTestApp();
  });

  it("GET /test should return status ok", async () => {
    const response = await app.handle(new Request("http://localhost/test"));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.status).toBe("ok");
  });

  describe("/me (Protected Route)", () => {
    const testUser: Pick<User, "id" | "username" | "avatarUrl"> = {
      id: "test-user-id",
      username: "testuser",
      avatarUrl: "https://example.com/avatar.png",
    };

    let validToken = "";

    beforeAll(async () => {
      try {
        validToken = await JwtService.generateToken(testUser.id, {
          username: testUser.username,
        });
        console.log("Generated test token:", validToken);
      } catch (error) {
        console.error("Error generating token in beforeAll:", error);
        console.error(
          `Check if process.env.JWT_SECRET is set correctly in test env. Expected based on authConfig: ${authConfig.jwt.secret ? "present" : "MISSING"}`,
        );
        throw error;
      }
    });

    it("should return 401 Unauthorized without a token", async () => {
      const response = await app.handle(new Request("http://localhost/me"));
      const error = await response.json();

      expect(response.status).toBe(401);
      expect(error.message).toBe("Unauthorized");
    });

    it("should return 401 Unauthorized with an invalid token", async () => {
      const invalidToken = "this.is.not.a.valid.token";
      const request = new Request("http://localhost/me", {
        headers: {
          Cookie: `${authConfig.jwt.cookieName}=${invalidToken}`,
        },
      });

      const response = await app.handle(request);
      const error = await response.json();

      expect(response.status).toBe(401);
      expect(error.message).toBe("Invalid token");
    });

    it("should return user data with a valid token", async () => {
      const cookieName = authConfig.jwt.cookieName;
      const request = new Request("http://localhost/me", {
        headers: {
          Cookie: `${cookieName}=${validToken}`,
        },
      });

      const response = await app.handle(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toBeDefined();

      expect(data.user).toBeDefined();
      expect(data.user.sub).toBe(testUser.id); // JWT puts the user ID in 'sub' claim
      expect(data.user.username).toBe(testUser.username);
    });
  });
});
