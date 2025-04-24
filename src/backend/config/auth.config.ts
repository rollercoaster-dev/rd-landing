// Load environment variables safely
// Check if we're in a test environment
const isTestEnv = process.env.NODE_ENV === "test" || process.env.VITEST;

// Set default values for test environment
if (isTestEnv && !process.env.RD_JWT_SECRET) {
  process.env.RD_JWT_SECRET = "test-jwt-secret-for-testing-only";
  console.log("Using test JWT secret for testing");
}

const JWT_SECRET = process.env.RD_JWT_SECRET;
const RP_NAME = process.env.RD_RP_NAME || "Rollercoaster.dev";
const RP_ID = process.env.RD_RP_ID || "localhost"; // Should match domain in production
const ORIGIN = process.env.RD_ORIGIN || `http://${RP_ID}:5173`; // Frontend origin

if (!JWT_SECRET) {
  console.error("Error: RD_JWT_SECRET environment variable is not set.");
  // Don't exit in test environment
  if (!isTestEnv) {
    process.exit(1);
  }
}

export const authConfig = {
  jwt: {
    secret: JWT_SECRET,
    expiresIn: "7d", // Token expiration time
    cookieName: "rd_auth_token", // Name for the JWT cookie
  },
  cookie: {
    // General default cookie options
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    path: "/",
    sameSite: "lax", // Or 'strict' or 'none' based on requirements
    maxAge: 7 * 24 * 60 * 60, // Cookie max age in seconds (e.g., 7 days for JWT)
  },
  github: {
    // Add GitHub specific config
    stateCookie: {
      name: "github_oauth_state",
      options: {
        // Options specifically for the state cookie
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax", // Changed from "Lax" to "lax"
        maxAge: 10 * 60, // 10 minutes validity for state cookie
      },
    },
  },
  webauthn: {
    rpName: RP_NAME, // Relying Party Name (Your application name)
    rpID: RP_ID, // Relying Party ID (Your domain name)
    origin: ORIGIN, // Expected origin of the frontend requests
  },
  frontendUrl: process.env.RD_FRONTEND_URL || "http://localhost:5173", // Frontend URL for redirects
} as const;
