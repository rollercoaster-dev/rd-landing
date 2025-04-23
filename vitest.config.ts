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
    environment: "node", // Use the standard Node.js environment
    globals: true,
    deps: {
      inline: ["@vue"],
    },
  },
});
