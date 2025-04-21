import { defineConfig } from "histoire";
import { HstVue } from "@histoire/plugin-vue";

export default defineConfig({
  plugins: [HstVue()],
  vite: {
    base: "./",
  },
  tree: {
    groups: [
      {
        id: "top",
        title: "",
      },
      {
        id: "components",
        title: "Components",
      },
    ],
  },
});
