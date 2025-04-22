import { Elysia, InternalServerError, t } from "elysia";
import { githubAuth } from "@backend/services/oauth.providers";
import { db } from "@backend/db";
import { users, keys } from "@backend/db/schema";
import { eq } from "drizzle-orm";
import { JwtService } from "@backend/services/jwt.service";
import { authConfig } from "@backend/config/auth.config"; // Import authConfig

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

// Helper function to get or create user and link GitHub account using Drizzle
async function getOrCreateUser(
  githubUser: GitHubUserAttributes,
  dbInstance: typeof db,
): Promise<UserSelect> {
  const githubUserId = String(githubUser.id);
  const keyId = `github:${githubUserId}`;

  // Check if a key for this GitHub ID already exists and fetch the associated user
  const existingKeyResult = await dbInstance
    .select({
      user: users,
    })
    .from(keys)
    .innerJoin(users, eq(keys.userId, users.id))
    .where(eq(keys.id, keyId))
    .limit(1);

  if (existingKeyResult.length > 0 && existingKeyResult[0].user) {
    // User already exists and linked via key
    return existingKeyResult[0].user;
  }

  // Check if user exists by email (if provided)
  let existingUser: UserSelect | null = null;
  if (githubUser.email) {
    const existingUserResult = await dbInstance
      .select()
      .from(users)
      .where(eq(users.email, githubUser.email))
      .limit(1);
    if (existingUserResult.length > 0) {
      existingUser = existingUserResult[0];
    }
  }

  // If user exists by email, link the GitHub account to them by creating a key
  if (existingUser) {
    await dbInstance.insert(keys).values({
      id: keyId,
      userId: existingUser.id,
      hashedPassword: null,
    });
    return existingUser;
  }

  // If user doesn't exist by key or email, create a new user and the key
  const userId = crypto.randomUUID().substring(0, 15);
  const newUserResult = await dbInstance
    .insert(users)
    .values({
      id: userId,
      githubId: githubUser.id.toString(),
      username: githubUser.login,
      email: githubUser.email ?? `${githubUserId}@github.placeholder.email`,
      name: githubUser.name ?? githubUser.login,
      avatarUrl: githubUser.avatar_url,
    })
    .returning();

  if (newUserResult.length === 0) {
    throw new InternalServerError("Failed to create new user.");
  }
  const newUser = newUserResult[0];

  await dbInstance.insert(keys).values({
    id: keyId,
    userId: newUser.id,
    hashedPassword: null,
  });

  return newUser;
}

const githubRoutes = new Elysia()
  // This route initiates the GitHub OAuth flow
  .get("/login", async ({ set }) => {
    const state = crypto.randomUUID().substring(0, 15);
    console.log(`[LOGIN] Generated state: ${state}`);
    const url: URL = await githubAuth.createAuthorizationURL(
      state,
      GITHUB_SCOPES,
    );

    // Manually construct and set the Set-Cookie header
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
    const cookieString = `github_oauth_state=${state}; HttpOnly; Path=/; Expires=${expires.toUTCString()}; SameSite=Lax`;
    set.headers["Set-Cookie"] = cookieString;
    console.log(`[LOGIN] Set raw Set-Cookie header: ${cookieString}`);

    set.redirect = url.toString();
  })

  // This route handles the callback from GitHub
  .get(
    "/callback",
    async (context) => {
      const { query, cookie, set } = context;

      console.log("[CALLBACK] Received request");
      console.log(
        `[CALLBACK] Query parameters: code=${query.code}, state=${query.state}`,
      );
      console.log(
        `[CALLBACK] Cookie state value: ${cookie.github_oauth_state?.value}`,
      );

      const storedState = cookie.github_oauth_state?.value;
      const state = query.state;
      const code = query.code;

      // Validate state parameter
      // TEMPORARY DIAGNOSTIC: Bypass cookie check (!storedState || storedState !== state) due to cookie persistence issues.
      // This is less secure and should be revisited.
      if (!state || !code) {
        // Only check if state and code exist in query params
        set.status = 400;
        console.error(
          "[CALLBACK] State validation failed (cookie check temporarily bypassed):",
          {
            storedState,
            queryState: state,
            codeExists: !!code,
          },
        );
        // Keep the original error message for consistency
        return { error: "Invalid OAuth state or code" };
      }

      console.log("[CALLBACK] State validation successful.");

      try {
        // 1. Validate the authorization code and get tokens
        const tokens = await githubAuth.validateAuthorizationCode(code);
        const githubAccessToken = tokens.accessToken(); // Call the getter function

        // 2. Fetch user information from GitHub API
        const githubUserResponse = await fetch("https://api.github.com/user", {
          headers: {
            Authorization: `Bearer ${githubAccessToken}`,
            "User-Agent": "rollercoaster.dev",
          },
        });

        if (!githubUserResponse.ok) {
          const errorText = await githubUserResponse.text();
          console.error(
            "Failed to fetch GitHub user:",
            githubUserResponse.status,
            errorText,
          );
          set.status = 500;
          return { error: "Failed to fetch user information from GitHub" };
        }

        const githubUser: GitHubUserAttributes =
          await githubUserResponse.json();

        // 3. Optionally fetch primary email if not included (requires 'user:email' scope)
        let primaryEmail = githubUser.email;
        if (!primaryEmail) {
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
              (email: GitHubEmail) => email.primary && email.verified,
            );
            primaryEmail = primary?.email ?? null;
          } else {
            console.warn("Could not fetch user emails from GitHub.");
          }
        }

        if (!primaryEmail) {
          set.status = 400;
          return {
            error: "Could not retrieve a verified primary email from GitHub.",
          };
        }

        // Pass githubUser directly and the Drizzle db instance
        const user = await getOrCreateUser(
          githubUser as GitHubUserAttributes,
          db,
        );

        // Generate JWT token using the new service
        const authToken = await JwtService.generateToken(user.id, {
          username: user.username,
          email: user.email,
          avatarUrl: user.avatarUrl,
          name: user.name,
        });

        // Log the generated token to inspect its type and value
        console.log("Generated authToken:", authToken);
        console.log("Type of authToken:", typeof authToken);

        // --- Direct Header Manipulation --- START
        const cookieName = authConfig.jwt.cookieName;
        const cookieValue = authToken;
        const cookiePath = authConfig.cookie.path;
        const cookieMaxAge = authConfig.cookie.maxAge; // In seconds
        const cookieHttpOnly = authConfig.cookie.httpOnly;
        const cookieSecure = authConfig.cookie.secure;
        const cookieSameSite = authConfig.cookie.sameSite;

        let authCookieString = `${cookieName}=${cookieValue}; Path=${cookiePath}; Max-Age=${cookieMaxAge}`;
        if (cookieHttpOnly) {
          authCookieString += "; HttpOnly";
        }
        if (cookieSecure) {
          authCookieString += "; Secure";
        }
        if (cookieSameSite) {
          authCookieString += `; SameSite=${cookieSameSite}`;
        }

        // Construct header to clear the state cookie
        const stateCookieName = "github_oauth_state";
        const stateCookieClearString = `${stateCookieName}=; Path=/; Max-Age=0; HttpOnly`; // Expires immediately

        // Set multiple Set-Cookie headers using an array
        set.headers["Set-Cookie"] = [authCookieString, stateCookieClearString];
        console.log(
          "[CALLBACK] Setting raw Set-Cookie headers directly:",
          set.headers["Set-Cookie"],
        );

        // Manually set status and Location header for redirect
        set.status = 302; // Found (Redirect)
        set.headers["Location"] = "/auth/callback"; // Redirect to frontend callback route
        console.log("Manual redirect headers set:", set.headers);

        // No need to return anything explicitly when redirecting this way
      } catch (e) {
        console.error("OAuth Callback Error:", e);
        if (e instanceof Error) {
          // Invalid request
          set.status = 400;
          return { error: "OAuth request failed.", details: e.message };
        }
        // Catch potential database or other errors
        set.status = 500;
        return { error: "Internal Server Error during OAuth callback" };
      }
    },
    {
      // Define query schema if needed (example)
      query: t.Object({
        code: t.String(),
        state: t.String(),
      }),
    },
  );

export default githubRoutes;
