import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
// import { resolve } from "path"; // No longer needed
import tsconfigPaths from "vite-tsconfig-paths"; // Import the plugin

export default defineConfig({
  plugins: [
    vue(),
    tsconfigPaths(), // Add the plugin
  ],
  test: {
    // Use different environments for frontend and backend tests
    environmentMatchGlobs: [
      // Use jsdom for frontend tests
      ["**/frontend/**/*.test.ts", "jsdom"],
      // Use node for backend tests
      ["**/backend/**/*.test.ts", "node"],
    ],
    globals: true,
    deps: {
      inline: ["@vue"],
    },
  },
});
