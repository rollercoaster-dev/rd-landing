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
    return c.json({ message: "Logged out successfully" });
  } else {
    console.log(`[LOGOUT] Cookie ${jwtCookieName} not found.`);
    // It's debatable whether this is an error, client might already be logged out.
    // Return success anyway.
    return c.json({ message: "No active session found or already logged out" });
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
