import { defineConfig } from "histoire";
import { HstVue } from "@histoire/plugin-vue";
import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [HstVue()],
  vite: {
    base: "./",
    // Add optimizeDeps to exclude problematic packages
    optimizeDeps: {
      exclude: ["vscode-oniguruma", "vscode-textmate"],
    },
    // Make sure Tailwind CSS is properly processed
    css: {
      postcss: {
        plugins: [tailwind, autoprefixer],
      },
    },
  },
  tree: {
    groups: [
      {
        id: "top",
        title: "",
      },
      {
        id: "ui",
        title: "UI Components",
      },
      {
        id: "rd",
        title: "Rollercoaster.dev Components",
      },
      {
        id: "layout",
        title: "Layout Components",
      },
    ],
  },
  // Support for Tailwind dark mode - now using separate files
  setupFile: {
    browser: "./src/frontend/histoire.setup.ts",
    server: "./src/frontend/histoire.setup.server.ts",
  },
  outDir: "./histoire-dist",
  // Look for stories in the components directory
  storyMatch: ["**/*.story.vue"],
  // Theme configuration
  theme: {
    title: "Rollercoaster.dev UI",
    logo: {
      square: "./public/favicon.svg",
      light: "./public/favicon.svg",
      dark: "./public/favicon.svg",
    },
    colors: {
      primary: {
        50: "#f9f5ff",
        100: "#f0e6ff",
        200: "#e2cfff",
        300: "#c9a7ff",
        400: "#ac73ff",
        500: "#9240ff",
        600: "#8122ff",
        700: "#6e18dd",
        800: "#5c16b4",
        900: "#4c1591",
      },
    },
  },
});
