import { Elysia, InternalServerError, t } from "elysia";
import { githubAuth } from "@backend/services/oauth.providers";
import { db } from "@backend/db";
import { users, keys } from "@backend/db/schema";
import { eq } from "drizzle-orm";
import { JwtService } from "@backend/services/jwt.service";
import { env } from "bun";

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

const githubRoutes = new Elysia({ prefix: "/auth/github" })
  // This route initiates the GitHub OAuth flow
  .get("/login", async ({ set }) => {
    const state = crypto.randomUUID().substring(0, 15);
    const url: URL = await githubAuth.createAuthorizationURL(
      state,
      GITHUB_SCOPES,
    );

    set.cookie = {
      ...set.cookie,
      github_oauth_state: {
        value: state,
        path: "/",
        httpOnly: true,
        maxAge: 60 * 10,
        secure: env.NODE_ENV === "production",
      },
    };

    set.redirect = url.toString();
  })

  // This route handles the callback from GitHub
  .get(
    "/callback",
    async (context) => {
      const { query, cookie, set } = context;

      const storedState = cookie.github_oauth_state?.value;
      const state = query.state;
      const code = query.code;

      // Validate state parameter
      if (!storedState || !state || storedState !== state || !code) {
        set.status = 400;
        return { error: "Invalid OAuth state or code" };
      }

      try {
        // 1. Validate the authorization code and get tokens
        const tokens = await githubAuth.validateAuthorizationCode(code);
        const githubAccessToken = tokens.accessToken;

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

        // Set the auth token as a cookie
        set.cookie = {
          ...set.cookie,
          auth_token: {
            value: authToken,
            path: "/",
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            secure: env.NODE_ENV === "production",
            sameSite: "lax",
          },
          // Clear the state cookie
          github_oauth_state: {
            value: "",
            path: "/",
            maxAge: 0,
          },
        };

        // Redirect to the frontend (e.g., dashboard)
        set.redirect = "/";
        return;
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
  ); // Correctly closed after the schema definition

export default githubRoutes;
