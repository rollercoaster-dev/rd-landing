import { githubAuth } from "@backend/services/oauth.providers";
import { db } from "@backend/db";
import { users } from "@backend/db/schema";
import { JwtService } from "@backend/services/jwt.service";
import {
  AuthService,
  type OAuthUserProfile,
} from "@backend/services/auth.service";

// Define the type for a user selected from the DB
type UserSelect = typeof users.$inferSelect;

// Manually define expected attributes from GitHub user object
interface GitHubUserAttributes {
  id: number | string;
  login: string;
  email?: string | null;
  name?: string | null;
  avatar_url?: string | null;
}

// Define the structure for primary email response
interface GitHubEmail {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: "public" | "private" | null;
}

// Define required GitHub scopes
const GITHUB_SCOPES = ["read:user", "user:email"];

export class GitHubAuthService {
  /**
   * Generates state and the GitHub authorization URL.
   */
  static async initiateGitHubLogin(): Promise<{ state: string; url: URL }> {
    const state = crypto.randomUUID().substring(0, 15);
    console.log(`[GitHubAuthService] Generated state: ${state}`);
    const url: URL = await githubAuth.createAuthorizationURL(
      state,
      GITHUB_SCOPES,
    );
    return { state, url };
  }

  /**
   * Handles the GitHub OAuth callback.
   *
   * @param code The authorization code from GitHub.
   * @param storedState The state stored in the user's cookie.
   * @param receivedState The state received from GitHub query parameters.
   * @returns The authenticated user and a JWT.
   * @throws Error if state validation fails or API calls fail.
   */
  static async handleGitHubCallback(
    code: string,
    storedState: string | undefined,
    receivedState: string | undefined,
  ): Promise<{ user: UserSelect; jwt: string }> {
    // 1. Validate state
    console.log("[GitHubAuthService] Validating state:", {
      storedState,
      receivedState,
    });
    if (!receivedState || !storedState || storedState !== receivedState) {
      console.error("[GitHubAuthService] State validation failed.", {
        storedState,
        receivedState,
      });
      throw new Error("Invalid OAuth state.");
    }
    if (!code) {
      throw new Error("Authorization code missing.");
    }

    console.log("[GitHubAuthService] State validation successful.");

    // 2. Validate the authorization code and get tokens
    const tokens = await githubAuth.validateAuthorizationCode(code);
    const githubAccessToken = tokens.accessToken();

    // 3. Fetch user information from GitHub API
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${githubAccessToken}`,
        "User-Agent": "rollercoaster.dev",
      },
    });

    if (!githubUserResponse.ok) {
      const errorText = await githubUserResponse.text();
      console.error(
        "[GitHubAuthService] Failed to fetch GitHub user:",
        githubUserResponse.status,
        errorText,
      );
      throw new Error("Failed to fetch user information from GitHub");
    }

    const githubUser: GitHubUserAttributes = await githubUserResponse.json();

    // 4. Optionally fetch primary email if not included
    let primaryEmail = githubUser.email;
    if (!primaryEmail) {
      try {
        const emailsResponse = await fetch(
          "https://api.github.com/user/emails",
          {
            headers: {
              Authorization: `Bearer ${githubAccessToken}`,
              "User-Agent": "rollercoaster.dev",
            },
          },
        );
        if (emailsResponse.ok) {
          const emails: GitHubEmail[] = await emailsResponse.json();
          const primary = emails.find(
            (email) => email.primary && email.verified,
          );
          if (primary) {
            primaryEmail = primary.email;
            githubUser.email = primaryEmail; // Update the user object
            console.log(
              `[GitHubAuthService] Found primary email: ${primaryEmail}`,
            );
          }
        } else {
          console.warn(
            "[GitHubAuthService] Failed to fetch emails:",
            emailsResponse.status,
          );
        }
      } catch (emailError) {
        console.error("[GitHubAuthService] Error fetching emails:", emailError);
      }
    }

    // 5. Get or Create User in DB using the new AuthService
    const userProfile: OAuthUserProfile = {
      provider: "github",
      providerUserId: String(githubUser.id),
      email: primaryEmail || null, // Use the primaryEmail string directly
      username: githubUser.login, // Use GitHub login as username suggestion
      name: githubUser.name || githubUser.login, // Use name, fallback to login
      avatarUrl: githubUser.avatar_url || null,
    };

    const user = await AuthService.findOrCreateUserByOAuthProfile(
      userProfile,
      db,
    );
    console.log(`[GitHubAuthService] User ${user.id} found/created.`);

    // 6. Generate JWT
    const jwtPayload = {
      // sub: user.id, // generateToken likely sets 'sub' internally
      username: user.username,
      email: user.email, // Add necessary claims
      name: user.name,
      avatarUrl: user.avatarUrl,
      // Add other claims as needed from authConfig or user object
    };
    // Use expiry from authConfig - NOTE: generateToken in JwtService seems to use env var directly.
    // We pass additional claims here. The service should handle 'sub' and expiry.
    const jwt = await JwtService.generateToken(user.id, jwtPayload);
    console.log(`[GitHubAuthService] JWT generated for user ${user.id}.`);

    // Clear the state cookie value (actual cookie removal happens in route handler)
    // This step is conceptual; actual cookie handling is in the route.

    return { user, jwt };
  }
}
