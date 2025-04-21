import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

import VueRouter from "unplugin-vue-router/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // Vue Router needs to be installed before Vue
    VueRouter({
      routesFolder: "src/frontend/pages",
      dts: "./typed-router.d.ts",
    }),
    vue(),
    AutoImport({
      imports: [
        "vue",
        "@vueuse/core",
        VueRouterAutoImports,
        {
          // add any other imports you're using
          "@unhead/vue": ["useHead"],
        },
      ],
      dts: "./auto-imports.d.ts",
      dirs: ["src/frontend/composables", "src/frontend/stores"],
      vueTemplate: true,
    }),
    Components({
      dirs: ["src/frontend/components"],
      dts: "./components.d.ts",
      extensions: ["vue"],
      // Use directory structure as namespace
      directoryAsNamespace: true,
      // Don't collapse same prefixes to avoid duplication
      collapseSamePrefixes: false,
      // Deep search in subdirectories
      deep: true,
    }),
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
  /*
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    beastiesOptions: {
      preload: 'media',
      pruneSource: true
    }
  }
  */
});
