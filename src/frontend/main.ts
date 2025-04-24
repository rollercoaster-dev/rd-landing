import { ViteSSG } from "vite-ssg";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"; // Import the plugin
import App from "./App.vue";
// Import our custom router configuration
import { routes, scrollBehavior } from "./router";
// Import Tailwind CSS
import "./styles/main.css";

// `export const createApp` is required instead of the original `createApp(App).mount('#app')`
export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options - using our custom routes with authentication guards
  { routes, scrollBehavior },
  // function to have custom setups
  ({ app, initialState }) => {
    // Create and use Pinia instance
    const pinia = createPinia();
    pinia.use(piniaPluginPersistedstate); // Use the plugin
    app.use(pinia);

    // install plugins etc.
    if (import.meta.env.SSR) {
      // Set initial state during server side
      initialState.data = {
        // Initial data can be set here
      };
    } else {
      // Restore or read the initial state on the client side in the browser
      console.log("Initial state:", initialState.data);
    }
  },
);
