# Elysia to Hono Migration Implementation Plan

This document provides a detailed implementation plan for migrating from Elysia to Hono.

## 1. Dependencies and Setup

```bash
# Install Hono and related packages
bun add hono
bun add @hono/zod-validator  # For validation (optional)
```

## 2. Core Application Structure

### Main Application (`src/backend/index.ts`)

**Elysia Version (Current):**

```typescript
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { jwt } from "@elysiajs/jwt";
// ...

export const createApp = () => {
  const baseApp = new Elysia()
    .onRequest(({ request }) => {
      console.log(
        `[REQ] Received request: ${request.method} ${new URL(request.url).pathname}`,
      );
    })
    .use(
      cors({
        origin: [authConfig.webauthn.origin, "http://localhost:5173"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
      }),
    )
    .use(
      jwt({
        name: "jwt",
        secret: authConfig.jwt.secret,
        exp: authConfig.jwt.expiresIn,
      }),
    )
    .decorate("db", db);

  const app = baseApp
    .group("/api", (app) => app.use(apiRoutes))
    .use(staticFiles)
    // ...
    .onError(({ code, error, set }) => {
      // Error handling
    });

  return app;
};
```

**Hono Version (Target):**

```typescript
import { Hono } from "hono";
import { cors } from "hono/cors";
import { jwt } from "hono/jwt";
import { logger } from "hono/logger";
// ...

export const createApp = () => {
  // Create the main Hono app
  const app = new Hono();

  // Add logger middleware
  app.use("*", logger());

  // Add CORS middleware
  app.use(
    "*",
    cors({
      origin: [authConfig.webauthn.origin, "http://localhost:5173"],
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
      allowHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }),
  );

  // Add JWT middleware (global setup, will be applied to specific routes)
  const jwtMiddleware = jwt({
    secret: authConfig.jwt.secret,
  });

  // Add database to context
  app.use("*", async (c, next) => {
    c.set("db", db);
    await next();
  });

  // Mount API routes
  app.route("/api", apiRoutes);

  // Serve static files
  app.use("*", staticFiles);

  // Root endpoint
  app.get("/", (c) =>
    c.json({
      status: "ok",
      message: "Welcome to Rollercoaster.dev Backend!",
    }),
  );

  // Health check endpoint
  app.get("/health", (c) =>
    c.json({
      status: "ok",
      timestamp: new Date().toISOString(),
    }),
  );

  // Error handling
  app.onError((err, c) => {
    console.error(`[ERR] Error:`, err);

    if (err.message === "Unauthorized") {
      return c.json({ message: "Unauthorized" }, 401);
    }

    if (err.message.includes("Not Found")) {
      return c.json({ message: "Not Found" }, 404);
    }

    if (err.message.includes("Validation")) {
      return c.json(
        {
          message: "Validation Error",
          errors: err.message,
        },
        400,
      );
    }

    return c.json({ message: "Internal Server Error" }, 500);
  });

  return app;
};
```

## 3. Authentication Middleware

### Auth Middleware (`src/backend/middleware/auth.middleware.ts`)

**Elysia Version (Current):**

```typescript
import { Elysia, type Context } from "elysia";
import { JwtService, type AppJwtPayload } from "@backend/services/jwt.service";
import { authConfig } from "@backend/config/auth.config";

export const authMiddleware = new Elysia({ name: "auth-middleware" })
  .derive(async (ctx: Context): Promise<{ user: AppJwtPayload | null }> => {
    const tokenCookie = ctx.cookie[authConfig.jwt.cookieName];

    if (!tokenCookie?.value) {
      return { user: null };
    }

    try {
      const payload = await JwtService.verifyToken(tokenCookie.value);
      return { user: payload };
    } catch (error: unknown) {
      // Error handling
      return { user: null };
    }
  })
  .onBeforeHandle((ctx) => {
    if (!ctx.user) {
      throw new Error("Unauthorized");
    }
  });

export type AuthenticatedContext = Context & {
  user: AppJwtPayload | null;
};
```

**Hono Version (Target):**

```typescript
import { Context, MiddlewareHandler } from "hono";
import { JwtService, type AppJwtPayload } from "@backend/services/jwt.service";
import { authConfig } from "@backend/config/auth.config";
import { getCookie } from "hono/cookie";

// Define the type for the context with user
export type AuthenticatedContext = Context & {
  Variables: {
    user: AppJwtPayload | null;
  };
};

// Create the auth middleware
export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const tokenCookie = getCookie(c, authConfig.jwt.cookieName);

  if (!tokenCookie) {
    c.set("user", null);
    throw new Error("Unauthorized");
  }

  try {
    const payload = await JwtService.verifyToken(tokenCookie);
    c.set("user", payload);
    await next();
  } catch (error) {
    console.warn("Auth Middleware: Invalid token detected.", error);
    c.set("user", null);
    throw new Error("Unauthorized");
  }
};
```

## 4. GitHub OAuth Routes

### GitHub Routes (`src/backend/api/auth/github.routes.ts`)

**Elysia Version (Current):**

```typescript
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
      // ...

      set.redirect = url.toString();
      set.status = 302;
    } catch (error) {
      // Error handling
    }
  })
  .get(
    "/callback",
    async ({ query, set, request }) => {
      // Callback handling
    },
    {
      query: t.Object({
        code: t.Optional(t.String()),
        state: t.Optional(t.String()),
      }),
    },
  );
```

**Hono Version (Target):**

```typescript
import { Hono } from "hono";
import { GitHubAuthService } from "@backend/services/githubAuth.service";
import { authConfig } from "@backend/config/auth.config";
import { setCookie, getCookie } from "hono/cookie";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

// Create a new Hono app for GitHub routes
export const githubRoutes = new Hono();

// Login route
githubRoutes.get("/login", async (c) => {
  const stateCookieName = authConfig.github.stateCookie.name;
  try {
    const { url, state } = await GitHubAuthService.initiateGitHubLogin();

    // Set the state cookie
    setCookie(c, stateCookieName, state, authConfig.github.stateCookie.options);
    console.log(`[LOGIN] Set ${stateCookieName} cookie: ${state}`);

    // Redirect to GitHub
    return c.redirect(url.toString(), 302);
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
      setCookie(c, jwtCookieName, generatedJwt, authConfig.cookie);
      console.log(`[CALLBACK] Set ${jwtCookieName} cookie.`);

      // Clear the state cookie
      setCookie(c, stateCookieName, "", {
        ...authConfig.github.stateCookie.options,
        maxAge: 0,
      });
      console.log(`[CALLBACK] Cleared ${stateCookieName} cookie.`);

      // Redirect to frontend
      console.log(
        `[CALLBACK] Redirecting to frontend: ${authConfig.frontendUrl}/auth/callback`,
      );
      return c.redirect(`${authConfig.frontendUrl}/auth/callback`, 302);
    } catch (error) {
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
```

## 5. Auth Routes Index

### Auth Routes (`src/backend/api/auth/index.ts`)

**Elysia Version (Current):**

```typescript
import { Elysia, t } from "elysia";
import { githubRoutes } from "./github.routes";
import { authConfig } from "@backend/config/auth.config";

export const authRoutes = new Elysia()
  .group("/github", (app) => app.use(githubRoutes))
  .post(
    "/logout",
    ({ cookie, set }) => {
      const jwtCookieName = authConfig.jwt.cookieName;
      if (cookie && cookie[jwtCookieName]) {
        console.log(`[LOGOUT] Clearing cookie: ${jwtCookieName}`);
        cookie[jwtCookieName].remove();
        set.status = 200;
        return { message: "Logged out successfully" };
      } else {
        // Handle no cookie case
      }
    },
    {
      cookie: t.Object({
        [authConfig.jwt.cookieName]: t.Optional(t.String()),
      }),
    },
  )
  .get("/status", ({ cookie, set }) => {
    // Status check
  });
```

**Hono Version (Target):**

```typescript
import { Hono } from "hono";
import { githubRoutes } from "./github.routes";
import { authConfig } from "@backend/config/auth.config";
import { getCookie, deleteCookie } from "hono/cookie";

// Create a new Hono app for auth routes
export const authRoutes = new Hono();

// Mount GitHub routes
authRoutes.route("/github", githubRoutes);

// Logout route
authRoutes.post("/logout", async (c) => {
  const jwtCookieName = authConfig.jwt.cookieName;
  const tokenCookie = getCookie(c, jwtCookieName);

  if (tokenCookie) {
    console.log(`[LOGOUT] Clearing cookie: ${jwtCookieName}`);
    deleteCookie(c, jwtCookieName, {
      path: "/",
      secure: authConfig.cookie.secure,
      httpOnly: authConfig.cookie.httpOnly,
    });
    return c.json({ message: "Logged out successfully" }, 200);
  } else {
    console.log(`[LOGOUT] Cookie ${jwtCookieName} not found.`);
    return c.json(
      { message: "No active session found or already logged out" },
      200,
    );
  }
});

// Status route
authRoutes.get("/status", (c) => {
  const tokenCookie = getCookie(c, authConfig.jwt.cookieName);

  if (tokenCookie) {
    return c.json({ authenticated: true, message: "User is authenticated" });
  } else {
    return c.json(
      {
        authenticated: false,
        message: "No authentication token cookie found",
      },
      401,
    );
  }
});
```

## 6. Main API Routes

### API Routes (`src/backend/api/routes.ts`)

**Elysia Version (Current):**

```typescript
import { badgesRoutes } from "./badges";
import { authRoutes } from "./auth";
import userRoutes from "./users/users.routes";
import {
  authMiddleware,
  type AuthenticatedContext,
} from "@backend/middleware/auth.middleware";
import { Elysia } from "elysia";

export const apiRoutes = new Elysia()
  .use(badgesRoutes)
  .group("/auth", (app) => app.use(authRoutes))
  .use(userRoutes)
  .get("/", () => ({
    name: "Rollercoaster.dev API",
    version: "0.1.0",
    documentation: "/api/docs",
  }))
  .get("/test", () => ({
    status: "ok",
    message: "API is working properly",
    timestamp: new Date().toISOString(),
  }))
  .group("/me", (app) =>
    app.use(authMiddleware).get("", ({ user }: AuthenticatedContext) => {
      return { user };
    }),
  );

export type ApiRoutesType = typeof apiRoutes;
```

**Hono Version (Target):**

```typescript
import { Hono } from "hono";
import { badgesRoutes } from "./badges";
import { authRoutes } from "./auth";
import { userRoutes } from "./users/users.routes";
import {
  authMiddleware,
  type AuthenticatedContext,
} from "@backend/middleware/auth.middleware";

// Create a new Hono app for API routes
export const apiRoutes = new Hono();

// Mount badge routes
apiRoutes.route("/badges", badgesRoutes);

// Mount auth routes
apiRoutes.route("/auth", authRoutes);

// Mount user routes
apiRoutes.route("/users", userRoutes);

// Root API endpoint
apiRoutes.get("/", (c) =>
  c.json({
    name: "Rollercoaster.dev API",
    version: "0.1.0",
    documentation: "/api/docs",
  }),
);

// Test endpoint
apiRoutes.get("/test", (c) =>
  c.json({
    status: "ok",
    message: "API is working properly",
    timestamp: new Date().toISOString(),
  }),
);

// Protected routes
apiRoutes.get("/me", authMiddleware, (c) => {
  const user = c.get("user");
  return c.json({ user });
});

// Export the type
export type ApiRoutesType = typeof apiRoutes;
```

## 7. Test HTTP Client

### Test HTTP Client (`src/backend/test/httpClient.ts`)

**Elysia Version (Current):**

```typescript
import type { Elysia } from "elysia";

export class TestHttpClient {
  private app: Elysia<any>;

  constructor(elysiaApp: Elysia<any>) {
    this.app = elysiaApp;
  }

  async get(path: string, options: { headers?: Record<string, string> } = {}) {
    const request = new Request(`http://localhost${path}`, {
      method: "GET",
      headers: options.headers,
    });

    const response = await this.app.handle(request);
    // Process response
    return { data, error, status, response };
  }

  async post(
    path: string,
    options: {
      body?: Record<string, unknown>;
      headers?: Record<string, string>;
    } = {},
  ) {
    // Implementation
  }
}
```

**Hono Version (Target):**

```typescript
import type { Hono } from "hono";

export class TestHttpClient {
  private app: Hono;

  constructor(honoApp: Hono) {
    this.app = honoApp;
  }

  async get(path: string, options: { headers?: Record<string, string> } = {}) {
    const request = new Request(`http://localhost${path}`, {
      method: "GET",
      headers: options.headers,
    });

    const response = await this.app.fetch(request);
    const status = response.status;

    // Process response (similar to current implementation)
    let data = null;
    let error = null;

    try {
      if (response.headers.get("content-type")?.includes("application/json")) {
        const body = await response.json();
        if (status >= 400) {
          error = { value: body };
        } else {
          data = body;
        }
      } else {
        const text = await response.text();
        if (status >= 400) {
          error = { value: { message: text } };
        } else {
          data = text;
        }
      }
    } catch (caughtError) {
      console.error(
        "[TestHttpClient] Failed to parse response body:",
        caughtError,
      );
      const newError = { value: { message: "Failed to parse response body" } };
      error = newError;
    }

    return { data, error, status, response };
  }

  async post(
    path: string,
    options: {
      body?: Record<string, unknown>;
      headers?: Record<string, string>;
    } = {},
  ) {
    // Similar implementation to get() but with POST method
    // ...
  }
}
```

## Progress So Far

1. ✅ Installed Hono and related dependencies
2. ✅ Created the core application structure (`src/backend/index.hono.ts`)
3. ✅ Implemented the auth middleware (`src/backend/middleware/auth.middleware.hono.ts`)
4. ✅ Migrated the GitHub OAuth routes (`src/backend/api/auth/github.routes.hono.ts`)
5. ✅ Updated the main API routes (`src/backend/api/routes.hono.ts`)
6. ✅ Created a test HTTP client for Hono (`src/backend/test/httpClient.hono.ts`)
7. ✅ Added scripts to run the Hono version of the backend

## Next Steps

1. Migrate the user routes to Hono
2. Migrate the badge routes to Hono
3. Update test setup to work with Hono
4. Run tests to ensure all functionality works correctly
5. Update documentation to reflect the migration
6. Consider replacing the Elysia implementation with Hono completely
