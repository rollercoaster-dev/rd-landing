// Load environment variables safely
const JWT_SECRET = process.env.JWT_SECRET;
const RP_NAME = process.env.RP_NAME || "Rollercoaster.dev";
const RP_ID = process.env.RP_ID || "localhost"; // Should match domain in production
const ORIGIN = process.env.ORIGIN || `http://${RP_ID}:5173`; // Frontend origin

if (!JWT_SECRET) {
  console.error("Error: JWT_SECRET environment variable is not set.");
  process.exit(1);
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
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173", // Frontend URL for redirects
} as const;
