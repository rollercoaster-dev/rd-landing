import { ViteSSG } from "vite-ssg";
import App from "./App.vue";
// Import the routes directly from the generated file
import { routes } from "vue-router/auto-routes";
// Import Tailwind CSS
import "./styles/main.css";

// `export const createApp` is required instead of the original `createApp(App).mount('#app')`
export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options - using the auto-generated routes
  { routes },
  // function to have custom setups
  ({ initialState }) => {
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
