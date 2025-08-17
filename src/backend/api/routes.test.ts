import { describe, expect, it } from "vitest";
import { setupHonoTest } from "../test/setup";

describe("API Routes - /api", () => {
  const { client } = setupHonoTest();

  describe("GET /github/status-cards", () => {
    it("should handle GitHub API endpoint", async () => {
      const { data, error, status } = await client.get(
        "/api/github/status-cards",
      );

      // The endpoint should respond (may fail due to rate limits or auth in tests)
      expect(status).toBeGreaterThanOrEqual(200);

      // If successful, should have the expected structure
      if (status === 200 && !error) {
        expect(data).toHaveProperty("coreEngine");
        expect(data).toHaveProperty("userInterface");
        expect(data).toHaveProperty("communityFeatures");
      } else {
        // If failed, should return an error response
        expect(status).toBe(500);
        expect(error?.value).toHaveProperty("error");
      }
    });
  });

  // Removed Badge tests
  // describe("GET /badges", () => {
  //   it("should return a list of badges", async () => {
  //     const { data, error, status } = await client.get("/api/badges");
  //
  //     expect(error).toBeNull();
  //     expect(status).toBe(200);
  //     expect(Array.isArray(data)).toBe(true);
  //     expect(data.length).toBeGreaterThan(0);
  //     expect(data[0]).toHaveProperty("id");
  //     expect(data[0]).toHaveProperty("name");
  //   });
  // });
  //
  // describe("GET /badges/:id", () => {
  //   it("should return a badge by id", async () => {
  //     const { data, error, status } = await client.get("/api/badges/1");
  //
  //     expect(error).toBeNull();
  //     expect(status).toBe(200);
  //     expect(data).toHaveProperty("id", "1");
  //     expect(data).toHaveProperty("name");
  //     expect(data).toHaveProperty("description");
  //   });
  // });
  //
  // describe("POST /badges", () => {
  //   it("should create a new badge", async () => {
  //     const newBadge = {
  //       name: "Test Badge",
  //       description: "A test badge",
  //       image: "https://example.com/badges/test.png",
  //       criteria: "Complete the test",
  //       issuer: "Rollercoaster.dev",
  //       tags: ["test", "badge"],
  //     };
  //
  //     const { data, error, status } = await client.post("/api/badges", {
  //       body: newBadge,
  //     });
  //
  //     expect(error).toBeNull();
  //     expect(status).toBe(201);
  //     expect(data).toHaveProperty("id");
  //     expect(data).toHaveProperty("name", newBadge.name);
  //     expect(data).toHaveProperty("description", newBadge.description);
  //     expect(data).toHaveProperty("createdAt");
  //   });
  //
  //   it("should return 400 for invalid badge data", async () => {
  //     const invalidBadge = {
  //       name: "Test Badge",
  //       // Missing required fields
  //     };
  //
  //     const { error, status } = await client.post("/api/badges", {
  //       body: invalidBadge,
  //     });
  //
  //     expect(error).not.toBeNull();
  //     expect(status).toBe(400);
  //   });
  // });
});
