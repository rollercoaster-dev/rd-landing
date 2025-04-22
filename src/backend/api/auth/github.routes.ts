import { Elysia, t } from "elysia";
import { GitHubAuthService } from "@backend/services/githubAuth.service";
import { authConfig } from "@backend/config/auth.config";
import { parse, serialize, type SerializeOptions } from "cookie";

export const githubRoutes = new Elysia()
  .get("/login", async ({ set }) => {
    const stateCookieName = authConfig.github.stateCookie.name;
    try {
      const { url, state } = await GitHubAuthService.initiateGitHubLogin();

      const stateCookieString = serialize(
        stateCookieName,
        state,
        authConfig.github.stateCookie.options as SerializeOptions,
      );
      set.headers["Set-Cookie"] = stateCookieString;
      console.log(
        `[LOGIN] Set ${stateCookieName} cookie via 'cookie' package: ${stateCookieString}`,
      );

      set.redirect = url.toString();
      set.status = 302;
    } catch (error) {
      console.error("Error during GitHub login initiation:", error);
      set.status = 500;
      return {
        error: "GitHub Login Initiation Failed",
        message: (error as Error).message,
      };
    }
  })
  .get(
    "/callback",
    async ({ query, set, request }) => {
      console.log("[CALLBACK] Received request");
      const stateCookieName = authConfig.github.stateCookie.name;
      const jwtCookieName = authConfig.jwt.cookieName;
      const { code, state: receivedState } = query;
      const rawCookies = request.headers.get("Cookie") || "";
      const cookies = parse(rawCookies);
      const storedState = cookies[stateCookieName];

      console.log(
        `[CALLBACK] Query params: code=${code}, state=${receivedState}`,
      );
      console.log(`[CALLBACK] Cookie state value: ${storedState}`);

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

        const authTokenCookie = serialize(
          jwtCookieName,
          generatedJwt,
          authConfig.cookie as SerializeOptions,
        );
        const clearStateCookie = serialize(stateCookieName, "", {
          ...authConfig.github.stateCookie.options,
          maxAge: 0,
        } as SerializeOptions);

        set.headers["Set-Cookie"] = [authTokenCookie, clearStateCookie];
        console.log(
          `[CALLBACK] Set ${jwtCookieName} cookie via 'cookie' package.`,
        );
        console.log(
          `[CALLBACK] Cleared ${stateCookieName} cookie via 'cookie' package.`,
        );

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
    },
  );
