// No imports needed from vitest here
import { createApp } from "../index.hono";
import { TestHttpClient } from "./httpClient.hono";

/**
 * Setup function for Hono tests
 * Creates a test app and client for testing
 */
export const setupHonoTest = () => {
  const app = createApp();
  const client = new TestHttpClient(app);

  return { app, client };
};

/**
 * Helper function to create a test JWT token for testing protected routes
 */
export const createTestToken = async () => {
  // Import the JWT service
  const { JwtService } = await import("@backend/services/jwt.service");

  // Create a test user ID
  const userId = "test-user-id";

  // Create additional claims
  const additionalClaims = {
    username: "testuser",
  };

  // Generate a token with the test user ID and additional claims
  const token = await JwtService.generateToken(userId, additionalClaims);

  console.log("Generated test token:", token);

  return token;
};

/**
 * Helper function to create test headers with authentication
 */
export const createAuthHeaders = async () => {
  const token = await createTestToken();

  return {
    Cookie: `rd_auth_token=${token}`,
  };
};
