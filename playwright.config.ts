import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  reporter: "list",
  use: {
    baseURL: "http://localhost:5173",
    headless: true,
    trace: "on-first-retry",
  },
  webServer: {
    command: "pnpm run dev:frontend",
    url: "http://localhost:5173",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
