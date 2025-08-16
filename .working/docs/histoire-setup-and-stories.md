# Histoire Setup and Story File Structure

This document outlines the key configuration points for Histoire in this project and the required structure for `.story.vue` files.

## Configuration (`histoire.config.ts`)

- **`setupFile`:** This option is crucial for handling code that runs in different environments (browser vs. Node.js during story collection).
  - We encountered errors like `window.matchMedia is not a function` because browser-specific APIs were being called during the Node.js-based collection process.
  - **Solution:** Use the object syntax for `setupFile` to provide separate entry points:

    ```typescript
    // histoire.config.ts
    import { defineConfig } from "histoire";
    import { HstVue } from "@histoire/plugin-vue";

    export default defineConfig({
      // ... other config
      plugins: [HstVue()],
      setupFile: {
        browser: "./src/frontend/histoire.setup.ts", // Runs in the browser preview
        server: "./src/frontend/histoire.setup.server.ts", // Runs during Node.js collection
      },
      // ... other config
    });
    ```

  - `histoire.setup.ts`: Contains browser-specific logic (like dark mode detection using `window.matchMedia`).
  - `histoire.setup.server.ts`: Contains only Node.js-compatible code (like CSS imports).

- **`storyMatch`:** Defines the pattern Histoire uses to find story files (e.g., `["**/*.story.vue"]`).

## Story File Structure (`*.story.vue`)

- Histoire requires a specific structure within `.story.vue` files to recognize and display stories correctly. Simply using your components in the template is not enough.
- We encountered `No story found for ...` warnings because the required structure was missing.
- **Solution:**
  1.  Wrap the entire story template in a single `<Story>` component. Provide a `title` prop (e.g., `title="UI/Button"`).
  2.  Wrap each distinct example or state you want to showcase within its own `<Variant>` component inside the `<Story>`. Provide a `title` for each variant (e.g., `title="Default Variants"`).

- **Example Template (`MyComponent.story.vue`):**

  ```vue
  <script setup lang="ts">
  import MyComponent from './MyComponent.vue'
  // Optional: Import helpers or define functions needed for variants
  function handleAction() {
    console.log('Action!');
  }
  </script>

  <template>
    <Story title="Category/MyComponent">
      <Variant title="Default State">
        <div class="p-4"> {/* Optional wrapper for spacing/styling */}
          <MyComponent prop1="value1" @action="handleAction" />
        </div>
      </Variant>

      <Variant title="Disabled State">
        <div class="p-4">
          <MyComponent prop1="value2" :disabled="true" />
        </div>
      </Variant>

      {/* Add more <Variant> blocks as needed */}
    </Story>
  </template>
  ```

## Running Histoire

Use the following command from the project root:

```bash
bun run histoire
```

## Lingering Issues (As of 2025-04-21)

- Warnings like `Failed to resolve dependency: vscode-oniguruma` and `vscode-textmate` may appear during startup. These seem related to Vite/Histoire internals and haven't caused functional problems so far. They can likely be ignored unless they start breaking the build or previews.
