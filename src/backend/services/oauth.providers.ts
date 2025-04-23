import { GitHub } from "arctic";

// Ensure environment variables are set
if (!process.env.RD_GITHUB_CLIENT_ID || !process.env.RD_GITHUB_CLIENT_SECRET) {
  throw new Error(
    "Missing GitHub OAuth environment variables (RD_GITHUB_CLIENT_ID, RD_GITHUB_CLIENT_SECRET)",
  );
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
