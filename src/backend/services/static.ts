import { MiddlewareHandler } from "hono";
import { resolve } from "path";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import { serveStatic } from "hono/bun";

// Create a middleware to serve static files from the dist directory
export const staticFilesMiddleware: MiddlewareHandler = async (c, next) => {
  // First try to serve using Hono's built-in static file handler
  const staticHandler = serveStatic({ root: "./dist" });

  try {
    // Try to serve the static file
    return await staticHandler(c, next);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    // If the static handler fails, continue with our custom handling
    // Get the path from the request URL
    const url = new URL(c.req.url);
    let path = url.pathname;

    // If the path is the root, serve the index.html
    if (path === "/") {
      path = "/index.html";
    }

    // Resolve the path to the dist directory
    const filePath = resolve("./dist", path.substring(1));

    // Check if the file exists
    if (existsSync(filePath)) {
      try {
        // Read the file
        const content = await readFile(filePath);

        // Set the content type based on the file extension
        const ext = path.split(".").pop()?.toLowerCase();
        let contentType = "text/plain";

        switch (ext) {
          case "html":
            contentType = "text/html";
            break;
          case "css":
            contentType = "text/css";
            break;
          case "js":
            contentType = "application/javascript";
            break;
          case "json":
            contentType = "application/json";
            break;
          case "png":
            contentType = "image/png";
            break;
          case "jpg":
          case "jpeg":
            contentType = "image/jpeg";
            break;
          case "svg":
            contentType = "image/svg+xml";
            break;
          case "webp":
            contentType = "image/webp";
            break;
          // Add more content types as needed
        }

        // Return the file content with the appropriate content type
        return c.body(content, 200, {
          "Content-Type": contentType,
        });
      } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        await next();
      }
    } else {
      // If the file doesn't exist, try to serve index.html for SPA routing
      if (!path.startsWith("/api") && !path.includes(".")) {
        const indexPath = resolve("./dist", "index.html");
        if (existsSync(indexPath)) {
          try {
            const content = await readFile(indexPath);
            return c.html(content.toString());
          } catch (error) {
            console.error(`Error reading index.html:`, error);
          }
        }
      }

      // If we get here, proceed to the next middleware
      await next();
    }
  }
};
