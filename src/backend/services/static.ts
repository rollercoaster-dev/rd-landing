import { Elysia } from 'elysia';
import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';

// Create a plugin to serve static files from the dist directory
export const staticFiles = new Elysia().get('*', async ({ request, set }) => {
  // Get the path from the request URL
  const url = new URL(request.url);
  let path = url.pathname;

  // If the path is the root, serve the index.html
  if (path === '/') {
    path = '/index.html';
  }

  // Resolve the path to the dist directory
  const filePath = resolve(process.cwd(), 'dist', path.slice(1));

  // Check if the file exists
  if (!existsSync(filePath)) {
    // If the file doesn't exist, try to serve index.html for SPA routing
    const indexPath = resolve(process.cwd(), 'dist', 'index.html');

    if (existsSync(indexPath)) {
      try {
        const content = await readFile(indexPath);
        set.headers['Content-Type'] = 'text/html';
        return content;
      } catch (error) {
        set.status = 500;
        return `Internal Server Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
      }
    }

    set.status = 404;
    return 'Not Found';
  }

  try {
    // Read the file
    const content = await readFile(filePath);

    // Set the content type based on the file extension
    const ext = filePath.split('.').pop();
    switch (ext) {
      case 'html':
        set.headers['Content-Type'] = 'text/html';
        break;
      case 'css':
        set.headers['Content-Type'] = 'text/css';
        break;
      case 'js':
        set.headers['Content-Type'] = 'application/javascript';
        break;
      case 'json':
        set.headers['Content-Type'] = 'application/json';
        break;
      case 'png':
        set.headers['Content-Type'] = 'image/png';
        break;
      case 'jpg':
      case 'jpeg':
        set.headers['Content-Type'] = 'image/jpeg';
        break;
      case 'svg':
        set.headers['Content-Type'] = 'image/svg+xml';
        break;
      default:
        set.headers['Content-Type'] = 'application/octet-stream';
    }

    return content;
  } catch (error) {
    set.status = 500;
    return `Internal Server Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
});
