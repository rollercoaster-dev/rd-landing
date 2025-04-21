// src/frontend/histoire.setup.ts
import { defineSetupVue3 } from "@histoire/plugin-vue";
import "./styles/main.css";

// This setup file is used to configure Histoire

export const setupVue3 = defineSetupVue3(() => {
  // Add global components or plugins here

  // Guard browser-specific code
  if (typeof window !== "undefined") {
    // Add dark mode class to the document when the dark mode is enabled
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.classList.add("dark");
    }

    // Listen for dark mode changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        if (event.matches) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      });

    // Add a class to the body to indicate we're in Histoire
    document.body.classList.add("histoire");
  }
});
