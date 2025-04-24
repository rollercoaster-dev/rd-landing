import { GitHub } from "arctic";

// Ensure environment variables are set
// Only throw an error in non-test environments
if (!process.env.RD_GITHUB_CLIENT_ID || !process.env.RD_GITHUB_CLIENT_SECRET) {
  // Check if we're in a test environment (Vitest sets this)
  if (process.env.NODE_ENV !== "test" && !process.env.VITEST) {
    throw new Error(
      "Missing GitHub OAuth environment variables (RD_GITHUB_CLIENT_ID, RD_GITHUB_CLIENT_SECRET)",
    );
  } else {
    // In test environment, set default values if not already set
    process.env.RD_GITHUB_CLIENT_ID =
      process.env.RD_GITHUB_CLIENT_ID || "test-client-id";
    process.env.RD_GITHUB_CLIENT_SECRET =
      process.env.RD_GITHUB_CLIENT_SECRET || "test-client-secret";
    console.log("Using test GitHub OAuth credentials");
  }
}

const callbackUrlBase =
  process.env.NODE_ENV === "production"
    ? "https://rollercoaster.dev" // Replace with your actual production domain
    : "http://localhost:3000"; // Development URL

const githubCallbackUrl = `${callbackUrlBase}/api/auth/github/callback`;

// Initialize the Arctic GitHub provider
export const githubAuth = new GitHub(
  process.env.RD_GITHUB_CLIENT_ID,
  process.env.RD_GITHUB_CLIENT_SECRET,
  githubCallbackUrl, // Pass the callback URL string directly
);

// Example of how you might add other providers later
// import { Google } from 'arctic';
// export const googleAuth = new Google(...) ;
