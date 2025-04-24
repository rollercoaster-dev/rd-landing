import { Hono } from "hono";
import { GitHubAuthService } from "@backend/services/githubAuth.service";
import { authConfig } from "@backend/config/auth.config";
import { setCookie, getCookie } from "hono/cookie";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

// Create a new Hono app for GitHub routes
export const githubRoutes = new Hono();

// Login route
githubRoutes.get("/login", async (c) => {
  const stateCookieName = authConfig.github.stateCookie.name;
  try {
    const { url, state } = await GitHubAuthService.initiateGitHubLogin();

    // Set the state cookie
    setCookie(c, stateCookieName, state, {
      httpOnly: authConfig.github.stateCookie.options.httpOnly,
      secure: authConfig.github.stateCookie.options.secure,
      path: authConfig.github.stateCookie.options.path,
      sameSite: authConfig.github.stateCookie.options.sameSite,
      maxAge: authConfig.github.stateCookie.options.maxAge,
    });

    console.log(`[LOGIN] Set ${stateCookieName} cookie: ${state}`);

    // Redirect to GitHub
    return c.redirect(url.toString());
  } catch (error) {
    console.error("Error during GitHub login initiation:", error);
    return c.json(
      {
        error: "GitHub Login Initiation Failed",
        message: error instanceof Error ? error.message : String(error),
      },
      500,
    );
  }
});

// Callback route with validation
const callbackSchema = z.object({
  code: z.string().optional(),
  state: z.string().optional(),
});

githubRoutes.get(
  "/callback",
  zValidator("query", callbackSchema),
  async (c) => {
    console.log("[CALLBACK] Received request");
    const stateCookieName = authConfig.github.stateCookie.name;
    const jwtCookieName = authConfig.jwt.cookieName;

    // Get query parameters
    const { code, state: receivedState } = c.req.valid("query");

    // Get the stored state from cookie
    const storedState = getCookie(c, stateCookieName);

    console.log(
      `[CALLBACK] Query params: code=${code}, state=${receivedState}`,
    );
    console.log(`[CALLBACK] Cookie state value: ${storedState}`);

    // Validate state and code
    if (
      !code ||
      !receivedState ||
      !storedState ||
      receivedState !== storedState
    ) {
      console.error("[CALLBACK] State or Code validation failed.", {
        code: !!code,
        receivedState: !!receivedState,
        storedState: !!storedState,
        match: receivedState === storedState,
      });
      return c.json({ error: "Invalid state or missing code." }, 400);
    }

    try {
      // Handle the callback
      const { jwt: generatedJwt } =
        await GitHubAuthService.handleGitHubCallback(
          code,
          storedState,
          receivedState,
        );

      // Set the JWT cookie
      setCookie(c, jwtCookieName, generatedJwt, {
        httpOnly: authConfig.cookie.httpOnly,
        secure: authConfig.cookie.secure,
        path: authConfig.cookie.path,
        sameSite: authConfig.cookie.sameSite,
        maxAge: authConfig.cookie.maxAge,
      });

      // Clear the state cookie
      setCookie(c, stateCookieName, "", {
        httpOnly: authConfig.github.stateCookie.options.httpOnly,
        secure: authConfig.github.stateCookie.options.secure,
        path: authConfig.github.stateCookie.options.path,
        sameSite: authConfig.github.stateCookie.options.sameSite,
        maxAge: 0,
      });

      console.log(
        `[CALLBACK] Set ${jwtCookieName} cookie via Hono cookie helper.`,
      );
      console.log(
        `[CALLBACK] Cleared ${stateCookieName} cookie via Hono cookie helper.`,
      );

      // Redirect to frontend
      const redirectUrl = `${authConfig.frontendUrl}/auth/callback`;
      console.log(`[CALLBACK] Redirecting to frontend: ${redirectUrl}`);
      return c.redirect(redirectUrl);
    } catch (error: unknown) {
      console.error("[CALLBACK] Error handling GitHub callback:", error);
      if (
        error instanceof Error &&
        error.message.includes("bad_verification_code")
      ) {
        return c.json({ error: "Invalid or expired authorization code." }, 400);
      }
      return c.json({ error: "Failed to handle GitHub callback." }, 500);
    }
  },
);
