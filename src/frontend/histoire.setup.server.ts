// src/frontend/histoire.setup.server.ts
// This setup file is used only during Node.js story collection.
// It should only contain Node.js compatible code.
import { defineSetupVue3 } from "@histoire/plugin-vue";
import "./styles/main.css";

// This setup file is used to configure Histoire for the server environment
export const setupVue3 = defineSetupVue3(() => {
  // Add global components or plugins here if needed and Node.js compatible
});
