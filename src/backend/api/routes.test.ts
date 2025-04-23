import { describe, expect, it } from "vitest";
import { setupHonoTest, createAuthHeaders } from "../test/setup";

describe("API Routes - /api", () => {
  const { client } = setupHonoTest();

  describe("GET /test", () => {
    it("should return status ok", async () => {
      const { data, error, status } = await client.get("/api/test");

      expect(error).toBeNull();
      expect(status).toBe(200);
      expect(data).toHaveProperty("status", "ok");
      expect(data).toHaveProperty("message", "API is working properly");
      expect(data).toHaveProperty("timestamp");
    });
  });

  describe("/me (Protected Route)", () => {
    it("should return 401 Unauthorized without a token", async () => {
      const { error, status } = await client.get("/api/me");

      expect(error).not.toBeNull();
      expect(status).toBe(401);
      expect(error?.value).toHaveProperty("message", "Unauthorized");
    });

    it("should return 401 Unauthorized with an invalid token", async () => {
      const { error, status } = await client.get("/api/me", {
        headers: {
          Cookie: "rd_auth_token=this.is.not.a.valid.token",
        },
      });

      expect(error).not.toBeNull();
      expect(status).toBe(401);
      expect(error?.value).toHaveProperty("message", "Unauthorized");
    });

    it("should return user data with a valid token", async () => {
      const headers = await createAuthHeaders();
      const { data, error, status } = await client.get("/api/me", { headers });

      expect(error).toBeNull();
      expect(status).toBe(200);
      expect(data).toHaveProperty("user");
      expect(data.user).toHaveProperty("sub", "test-user-id");
      expect(data.user).toHaveProperty("username", "testuser");
    });
  });

  describe("GET /badges", () => {
    it("should return a list of badges", async () => {
      const { data, error, status } = await client.get("/api/badges");

      expect(error).toBeNull();
      expect(status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0]).toHaveProperty("id");
      expect(data[0]).toHaveProperty("name");
    });
  });

  describe("GET /badges/:id", () => {
    it("should return a badge by id", async () => {
      const { data, error, status } = await client.get("/api/badges/1");

      expect(error).toBeNull();
      expect(status).toBe(200);
      expect(data).toHaveProperty("id", "1");
      expect(data).toHaveProperty("name");
      expect(data).toHaveProperty("description");
    });
  });

  describe("POST /badges", () => {
    it("should create a new badge", async () => {
      const newBadge = {
        name: "Test Badge",
        description: "A test badge",
        image: "https://example.com/badges/test.png",
        criteria: "Complete the test",
        issuer: "Rollercoaster.dev",
        tags: ["test", "badge"],
      };

      const { data, error, status } = await client.post("/api/badges", {
        body: newBadge,
      });

      expect(error).toBeNull();
      expect(status).toBe(201);
      expect(data).toHaveProperty("id");
      expect(data).toHaveProperty("name", newBadge.name);
      expect(data).toHaveProperty("description", newBadge.description);
      expect(data).toHaveProperty("createdAt");
    });

    it("should return 400 for invalid badge data", async () => {
      const invalidBadge = {
        name: "Test Badge",
        // Missing required fields
      };

      const { error, status } = await client.post("/api/badges", {
        body: invalidBadge,
      });

      expect(error).not.toBeNull();
      expect(status).toBe(400);
    });
  });
});
