import { ViteSSG } from "vite-ssg";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"; // Import the plugin
import { createI18n } from "vue-i18n";
import App from "./App.vue";
// Import our custom router configuration
import { routes, scrollBehavior } from "./router";
// Import Tailwind CSS
import "./styles/main.css";

// Import locale messages
import enCommon from "./locales/en/common.json";
import enHeader from "./locales/en/header.json";
import enHome from "./locales/en/home.json";
import enAbout from "./locales/en/about.json";
import enAdmin from "./locales/en/admin.json";
import enFooter from "./locales/en/footer.json";
import enPrivacy from "./locales/en/privacy.json";

import deCommon from "./locales/de/common.json";
import deHeader from "./locales/de/header.json";
import deHome from "./locales/de/home.json";
import deAbout from "./locales/de/about.json";
import deAdmin from "./locales/de/admin.json";
import deFooter from "./locales/de/footer.json";
import dePrivacy from "./locales/de/privacy.json";

// Create i18n instance
const messages = {
  en: {
    common: enCommon,
    header: enHeader,
    home: enHome,
    about: enAbout,
    admin: enAdmin,
    footer: enFooter,
    privacy: enPrivacy,
  },
  de: {
    common: deCommon,
    header: deHeader,
    home: deHome,
    about: deAbout,
    admin: deAdmin,
    footer: deFooter,
    privacy: dePrivacy,
  },
};

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages,
  globalInjection: true,
});

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

    // Install i18n
    app.use(i18n);

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
