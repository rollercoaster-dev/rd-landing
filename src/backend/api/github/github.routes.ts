import { Hono } from "hono";
import { GitHubProjectsService } from "../../services/github-projects.service";

const githubRoutes = new Hono();

// Initialize GitHub service
const githubService = new GitHubProjectsService();

/**
 * GET /api/github/status-cards
 * Returns formatted status card data for the landing page
 */
githubRoutes.get("/status-cards", async (c) => {
  try {
    const statusCards = await githubService.getStatusCardData();

    return c.json(statusCards, 200);
  } catch (error) {
    console.error("Error fetching GitHub status cards:", error);

    return c.json(
      {
        error: "Failed to fetch project status",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      500,
    );
  }
});

export { githubRoutes };
