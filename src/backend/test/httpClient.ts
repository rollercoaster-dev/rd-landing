/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Elysia } from "elysia";

/**
 * A simple HTTP client for testing Elysia applications.
 * This provides a more reliable alternative to using treaty when type issues occur.
 *
 * This test client doesn't require any external dependencies and works directly with
 * Bun's built-in fetch implementation, making it ideal for testing Elysia apps.
 */
export class TestHttpClient {
  // Store the passed app instance
  // Using 'any' for flexibility, as precise Elysia types can be complex.
  private app: Elysia<any>;

  // Accept an Elysia instance in the constructor
  constructor(elysiaApp: Elysia<any>) {
    this.app = elysiaApp;
  }

  /**
   * Make a GET request to the specified path
   */
  async get(
    path: string,
    options: {
      headers?: Record<string, string>;
    } = {},
  ) {
    const request = new Request(`http://localhost${path}`, {
      method: "GET",
      headers: options.headers,
    });

    const response = await this.app.handle(request);
    const status = response.status;

    // Parse response body based on content type
    let data = null;
    let error = null;

    try {
      if (response.headers.get("content-type")?.includes("application/json")) {
        const body = await response.json();

        // For compatibility with treaty client structure
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
      // Just swallow the error and provide a generic message
      console.error(
        "[TestHttpClient] Failed to parse response body:",
        caughtError,
      );
      const newError = { value: { message: "Failed to parse response body" } };
      error = newError;
    }

    return { data, error, status, response };
  }

  /**
   * Make a POST request to the specified path
   */
  async post(
    path: string,
    options: {
      body?: Record<string, unknown>;
      headers?: Record<string, string>;
    } = {},
  ) {
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    const request = new Request(`http://localhost${path}`, {
      method: "POST",
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    const response = await this.app.handle(request);
    const status = response.status;

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
      // Just swallow the error and provide a generic message
      console.error(
        "[TestHttpClient] Failed to parse response body:",
        caughtError,
      );
      const newError = { value: { message: "Failed to parse response body" } };
      error = newError;
    }

    return { data, error, status, response };
  }
}
