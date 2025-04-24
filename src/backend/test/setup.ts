// Ensure essential environment variables are set *before* any application code is imported
console.log("Setting up Hono test environment: Initializing env vars");

// Check/set JWT Secret
if (!process.env.RD_JWT_SECRET) {
  console.warn(
    "WARNING: RD_JWT_SECRET environment variable is not set. Setting a default for testing.",
  );
  // Use a longer, more secure-looking default secret for testing
  process.env.RD_JWT_SECRET =
    "default_test_secret_32_chars_long_for_hs256_!@#$%^&*";
} else {
  console.log("RD_JWT_SECRET environment variable is set");
}

// Check/set GitHub OAuth credentials
if (!process.env.RD_GITHUB_CLIENT_ID) {
  console.warn(
    "WARNING: RD_GITHUB_CLIENT_ID environment variable is not set. Setting a default for testing.",
  );
  process.env.RD_GITHUB_CLIENT_ID = "test-client-id";
}
if (!process.env.RD_GITHUB_CLIENT_SECRET) {
  console.warn(
    "WARNING: RD_GITHUB_CLIENT_SECRET environment variable is not set. Setting a default for testing.",
  );
  process.env.RD_GITHUB_CLIENT_SECRET = "test-client-secret";
}

// Import vitest for mocking
import { vi } from "vitest";
import { createApp } from "../index";
import { TestHttpClient } from "./httpClient";

// Mock the database module
vi.mock("../db/index", () => {
  return {
    db: {
      query: vi.fn(),
      select: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      execute: vi.fn().mockResolvedValue([]),
    },
    migrationDb: {
      query: vi.fn(),
    },
  };
});

// Mock the static service module
vi.mock("../services/static", () => {
  return {
    staticFilesMiddleware: vi.fn().mockImplementation((_c, next) => next()),
  };
});

// Mock Bun-specific modules
vi.mock("hono/bun", () => {
  return {
    serveStatic: vi.fn().mockImplementation(() => {
      return vi.fn().mockImplementation((_c, next) => next());
    }),
  };
});

/**
 * Setup function for Hono tests
 * Creates a test app and client for testing
 */
export const setupHonoTest = () => {
  console.log("Setting up Hono test environment");

  const app = createApp();
  const client = new TestHttpClient(app);
  console.log("Hono test environment setup complete");

  return { app, client };
};

/**
 * Helper function to create a test JWT token for testing protected routes
 */
export const createTestToken = async () => {
  console.log("Creating test JWT token");
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
    console.error("Error generating test token:", error);
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
