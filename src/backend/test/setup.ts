// No imports needed from vitest here
import { createApp } from "../index";
import { TestHttpClient } from "./httpClient";

/**
 * Setup function for Hono tests
 * Creates a test app and client for testing
 */
export const setupHonoTest = () => {
  console.log('Setting up Hono test environment');

  // Check for JWT_SECRET environment variable
  if (!process.env.JWT_SECRET) {
    console.warn('WARNING: JWT_SECRET environment variable is not set. Setting a default for testing.');
    process.env.JWT_SECRET = 'Im-a-little-teapot_short_and_stout';
  } else {
    console.log('JWT_SECRET environment variable is set');
  }

  const app = createApp();
  const client = new TestHttpClient(app);
  console.log('Hono test environment setup complete');

  return { app, client };
};

/**
 * Helper function to create a test JWT token for testing protected routes
 */
export const createTestToken = async () => {
  console.log('Creating test JWT token');
  // Import the JWT service
  const { JwtService } = await import("@backend/services/jwt.service");

  // Create a test user ID
  const userId = "test-user-id";

  // Create additional claims
  const additionalClaims = {
    username: "testuser",
  };

  try {
    // Generate a token with the test user ID and additional claims
    const token = await JwtService.generateToken(userId, additionalClaims);
    console.log("Generated test token:", token);
    return token;
  } catch (error) {
    console.error('Error generating test token:', error);
    throw error;
  }
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
