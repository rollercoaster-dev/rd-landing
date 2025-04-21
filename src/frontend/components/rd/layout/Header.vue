<script setup lang="ts">
import { Sun, Moon, Paintbrush } from "lucide-vue-next";
import { useTheme } from "@/frontend/composables/useTheme";
import { ref, onMounted } from "vue";

const { mode, intensity, toggleIntensity } = useTheme();

// Toggle mode function (replaces toggleDarkMode)
const toggleMode = () => {
  mode.value = mode.value === "dark" ? "light" : "dark";
};

// Client-side mounting flag
const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;

  const handleKeydown = (e: KeyboardEvent) => {
    // Check if Cmd/Ctrl is pressed
    if (e.metaKey || e.ctrlKey) {
      switch (e.key.toLowerCase()) {
        case "d": // Toggle Dark/Light Mode
          e.preventDefault();
          toggleMode();
          break;
        case "i": // Toggle Intensity (Vibrant/Calm)
          e.preventDefault();
          toggleIntensity();
          break;
      }
    }
  };

  window.addEventListener("keydown", handleKeydown);
  onUnmounted(() => window.removeEventListener("keydown", handleKeydown));
});

const navigation = [
  { name: "", href: "" },
  // { name: 'Home', href: '/' },
  // { name: 'About', href: '/about' },
  // { name: 'Blog', href: '/blog' },
  // { name: 'Contact', href: '/contact' }
];
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <div class="container flex h-16 items-center">
      <!-- Logo -->
      <RouterLink to="/" class="mr-8">
        <h1 class="text-2xl font-bold">
          <RdHeadlineGradient>rollercoaster.dev</RdHeadlineGradient>
        </h1>
      </RouterLink>

      <!-- Navigation -->
      <nav class="flex items-center space-x-6 text-sm font-medium flex-1">
        <RouterLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          class="transition-colors hover:text-primary"
        >
          {{ item.name }}
        </RouterLink>
      </nav>

      <!-- Mode Toggles -->

      <UiTooltipTooltipProvider :delay-duration="200">
        <div v-if="isMounted" class="flex items-center space-x-1">
          <UiTooltipTooltip>
            <UiTooltipTooltipTrigger as-child>
              <UiButtonButton
                variant="ghost"
                size="icon"
                class="rounded-full"
                @click="toggleMode"
              >
                <Sun v-if="mode === 'dark'" class="h-5 w-5" />
                <Moon v-else class="h-5 w-5" />
                <span class="sr-only">
                  {{
                    mode === "dark"
                      ? "Switch to light mode"
                      : "Switch to dark mode"
                  }}
                </span>
              </UiButtonButton>
            </UiTooltipTooltipTrigger>
            <UiTooltipTooltipContent side="bottom">
              <p>
                {{
                  mode === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }}
                <br />
                <span class="text-xs text-muted-foreground"
                  >Shortcut: Cmd + D</span
                >
              </p>
            </UiTooltipTooltipContent>
          </UiTooltipTooltip>

          <UiTooltipTooltip>
            <UiTooltipTooltipTrigger as-child>
              <UiButtonButton
                variant="ghost"
                size="icon"
                class="rounded-full"
                @click="toggleIntensity"
              >
                <Paintbrush class="h-5 w-5" />
                <span class="sr-only">
                  {{
                    intensity === "vibrant"
                      ? "Switch to calm intensity"
                      : "Switch to vibrant intensity"
                  }}
                </span>
              </UiButtonButton>
            </UiTooltipTooltipTrigger>
            <UiTooltipTooltipContent side="bottom">
              <p>
                {{
                  intensity === "vibrant"
                    ? "Switch to calm intensity"
                    : "Switch to vibrant intensity"
                }}
                <br />
                <span class="text-xs text-muted-foreground"
                  >Shortcut: Cmd + I</span
                >
              </p>
            </UiTooltipTooltipContent>
          </UiTooltipTooltip>
        </div>
      </UiTooltipTooltipProvider>
    </div>
  </header>
</template>
