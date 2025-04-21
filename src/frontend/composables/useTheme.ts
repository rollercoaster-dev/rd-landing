// src/frontend/composables/useTheme.ts
import { useStorage, useColorMode } from "@vueuse/core";
import { watchEffect, type Ref } from "vue";

export type ThemeMode = "light" | "dark";
export type ThemeIntensity = "vibrant" | "calm";

export function useTheme() {
  // Use Nuxt/VueUse's color mode management for light/dark
  // It handles the '.dark' class on <html> automatically
  const mode = useColorMode({
    selector: "html",
    attribute: "class",
    modes: {
      // Custom names for modes (optional, defaults to 'light' and 'dark')
    },
  }) as Ref<ThemeMode>; // Cast needed as useColorMode returns string | 'auto'

  // Manage intensity separately using localStorage
  const intensity = useStorage<ThemeIntensity>("theme-intensity", "vibrant"); // Default to vibrant

  // Function to toggle intensity
  const toggleIntensity = () => {
    intensity.value = intensity.value === "vibrant" ? "calm" : "vibrant";
  };

  // Function to set intensity directly
  const setIntensity = (newIntensity: ThemeIntensity) => {
    intensity.value = newIntensity;
  };

  // Apply the data-intensity attribute based on the intensity state
  watchEffect(() => {
    // Ensure this runs only client-side
    if (typeof document !== "undefined") {
      const htmlElement = document.documentElement;
      if (intensity.value === "calm") {
        htmlElement.setAttribute("data-intensity", "calm");
      } else {
        // Remove the attribute if intensity is vibrant (or any other default)
        htmlElement.removeAttribute("data-intensity");
      }
    }
  });

  // Expose mode, intensity, and control functions
  return {
    mode, // 'light' | 'dark' (from useColorMode)
    intensity, // 'vibrant' | 'calm' (ref)
    toggleIntensity,
    setIntensity,
    // You can also directly use mode.value = 'light' or mode.value = 'dark'
  };
}
