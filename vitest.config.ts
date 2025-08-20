import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths"; // Import the plugin

export default defineConfig({
  plugins: [
    vue(),
    tsconfigPaths(), // Add the plugin
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@frontend": resolve(__dirname, "./src/frontend"),
      "@backend": resolve(__dirname, "./src/backend"),
      "@shared": resolve(__dirname, "./src/shared"),
      // Add platform/frontend-style aliases
      "~": resolve(__dirname, "./src/frontend"),
      "~/": resolve(__dirname, "./src/frontend/"),
      "#components": resolve(__dirname, "./src/frontend/components"),
      "#imports": resolve(__dirname, "./src/frontend/composables"),
    },
  },
  test: {
    include: ["src/**/*.test.ts", "src/**/*.spec.ts"],
    // Use different environments for frontend and backend tests
    environmentMatchGlobs: [
      // Use jsdom for frontend tests
      ["**/frontend/**/*.test.ts", "jsdom"],
      // Use node for backend tests
      ["**/backend/**/*.test.ts", "node"],
    ],
    // Exclude Playwright E2E tests; run them via `playwright test`
    exclude: ["tests/e2e/**", "node_modules/**", "dist/**"],
    globals: true,
    setupFiles: ["src/frontend/vitest.setup.ts"],
    deps: {
      optimizer: {
        ssr: {
          include: ["@vue"],
        },
      },
    },
  },
});
