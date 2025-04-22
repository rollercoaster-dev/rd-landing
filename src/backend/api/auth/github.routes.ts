import { Elysia, t } from "elysia";
import { GitHubAuthService } from "@backend/services/githubAuth.service";
import { authConfig } from "@backend/config/auth.config";

export const githubRoutes = new Elysia()
  .derive(({ cookie: _cookie }) => ({
    stateCookieName: authConfig.github.stateCookie.name,
  }))
  .get("/login", async ({ set, stateCookieName }) => {
    try {
      const { url, state } = await GitHubAuthService.initiateGitHubLogin();

      if (set.cookie) {
        set.cookie[stateCookieName] = {
          ...authConfig.github.stateCookie.options,
          value: state,
        };
      } else {
        console.error("/login route: set.cookie is unexpectedly undefined.");
        set.status = 500;
        return { error: "Internal Server Configuration Error" };
      }

      console.log(`[LOGIN] Set ${stateCookieName} cookie via Elysia API.`);
      set.redirect = url.toString();
      set.status = 302;
    } catch (error) {
      console.error("[LOGIN] Error initiating GitHub login:", error);
      set.status = 500;
      return { error: "Failed to initiate GitHub login." };
    }
  })
  .get(
    "/callback",
    async ({ query, cookie, set, stateCookieName }) => {
      console.log("[CALLBACK] Received request");
      const { code, state: receivedState } = query;
      const storedState = cookie[stateCookieName]?.value;

      console.log(
        `[CALLBACK] Query params: code=${code}, state=${receivedState}`,
      );
      console.log(`[CALLBACK] Cookie state value: ${storedState}`);

      if (cookie[stateCookieName]) {
        cookie[stateCookieName].remove();
        console.log(`[CALLBACK] Removed ${stateCookieName} cookie.`);
      }

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
        set.status = 400;
        return { error: "Invalid state or missing code." };
      }

      try {
        const { jwt: generatedJwt } =
          await GitHubAuthService.handleGitHubCallback(
            code,
            storedState,
            receivedState,
          );

        if (set.cookie) {
          set.cookie[authConfig.jwt.cookieName] = {
            ...authConfig.cookie,
            value: generatedJwt,
          };
          console.log(`[CALLBACK] Set ${authConfig.jwt.cookieName} cookie.`);
        } else {
          console.error(
            "/callback route: set.cookie is unexpectedly undefined.",
          );
          set.status = 500;
          return { error: "Internal Server Configuration Error" };
        }

        set.redirect = `${authConfig.frontendUrl}/auth/callback`;
        console.log(`[CALLBACK] Redirecting to frontend: ${set.redirect}`);
        set.status = 302;
        return;
      } catch (error: unknown) {
        console.error("[CALLBACK] Error handling GitHub callback:", error);
        if (
          error instanceof Error &&
          error.message.includes("bad_verification_code")
        ) {
          set.status = 400;
          return { error: "Invalid or expired authorization code." };
        }
        set.status = 500;
        return { error: "Failed to handle GitHub callback." };
      }
    },
    {
      query: t.Object({
        code: t.Optional(t.String()),
        state: t.Optional(t.String()),
      }),
      cookie: t.Object({
        [authConfig.github.stateCookie.name]: t.Optional(t.String()),
      }),
    },
  );
