import { Hono } from "hono";
import type { StatusCode } from "hono/utils/http-status";
import {
  GitHubAPIError,
  GitHubProjectsService,
} from "../../services/github-projects.service";

const githubRoutes = new Hono();

// Initialize GitHub service
const githubService = new GitHubProjectsService();

/**
 * GET /api/github/status-cards
 * Returns formatted status card data for the landing page
 * Query params:
 *  - force=true|1 to force refresh (ignores TTL)
 *  - allowStale=false|0 to disable stale fallback
 */
githubRoutes.get("/status-cards", async (c) => {
  try {
    const force = /^(1|true)$/i.test(c.req.query("force") || "");
    const allowStaleParam = c.req.query("allowStale");
    const allowStale =
      allowStaleParam == null ? true : !/^(0|false)$/i.test(allowStaleParam);

    const statusCards = await githubService.getStatusCardData({
      force,
      allowStale,
    });

    // mild client-side cache to avoid spam in dev and prod
    c.header("Cache-Control", "public, max-age=60");
    return c.json(statusCards, 200);
  } catch (error) {
    const debug = /^(1|true)$/i.test(c.req.query("debug") || "");

    if (error instanceof GitHubAPIError) {
      const details = {
        status: error.status,
        code: error.code,
        rateLimit: error.rateLimit,
        op: error.op,
        message: error.message,
      };
      console.warn("GitHub status-cards error", details);
      if (debug) {
        c.status((error.status ?? 500) as StatusCode);
        return c.json({ error: "github", details });
      }
    } else {
      console.error("Error fetching GitHub status cards:", error);
    }

    c.status(500);
    return c.json({
      error: "Failed to fetch project status",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * POST /api/github/refresh
 * Manually refresh the cached GitHub status (optionally secured by a token)
 */
githubRoutes.post("/refresh", async (c) => {
  try {
    const requiredToken = process.env.RD_GITHUB_REFRESH_TOKEN;
    if (requiredToken) {
      const provided = c.req.header("x-refresh-token");
      if (!provided || provided !== requiredToken) {
        return c.json({ error: "Unauthorized" }, 401);
      }
    }

    const data = await githubService.refresh();
    return c.json({ ok: true, lastUpdated: data.coreEngine.lastUpdated }, 200);
  } catch (error) {
    console.error("Error refreshing GitHub status:", error);
    return c.json({ error: "Failed to refresh" }, 500);
  }
});

/**
 * POST /api/github/webhook
 * Minimal GitHub webhook endpoint to refresh cache on repo changes.
 * If RD_GITHUB_WEBHOOK_SECRET is set, validates x-hub-signature-256.
 */
githubRoutes.post("/webhook", async (c) => {
  try {
    const secret = process.env.RD_GITHUB_WEBHOOK_SECRET;
    const bodyText = await c.req.text();

    if (secret) {
      const sig = c.req.header("x-hub-signature-256") || "";
      const crypto = await import("node:crypto");
      const hmac = crypto.createHmac("sha256", secret);
      const digest = "sha256=" + hmac.update(bodyText).digest("hex");
      const timingSafeEqual = (a: string, b: string) => {
        const bufA = Buffer.from(a);
        const bufB = Buffer.from(b);
        if (bufA.length !== bufB.length) return false;
        return crypto.timingSafeEqual(bufA, bufB);
      };
      if (!sig || !timingSafeEqual(digest, sig)) {
        return c.json({ error: "Invalid signature" }, 401);
      }
    }

    // Parse event type for logging; refresh regardless
    const event = c.req.header("x-github-event") || "unknown";
    console.log(`GitHub webhook received: ${event}`);

    // Kick a refresh; don't block webhook
    githubService
      .refresh()
      .then(() => console.log("GitHub status cache refreshed"))
      .catch((e) => console.warn("GitHub refresh failed from webhook", e));

    return c.json({ ok: true }, 202);
  } catch (error) {
    console.error("Error handling GitHub webhook:", error);
    return c.json({ error: "Webhook error" }, 500);
  }
});

export { githubRoutes };
