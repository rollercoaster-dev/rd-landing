<script setup lang="ts">
import { Sun, Moon, Paintbrush, LogIn, LogOut } from "lucide-vue-next";
import { useTheme } from "@/frontend/composables/useTheme";
import { useAuth } from "@/frontend/composables/useAuth";
import { ref, onMounted } from "vue";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/frontend/components/ui/button";

// Theme composable
const { mode, intensity, toggleIntensity } = useTheme();

// Auth composable
const auth = useAuth();

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

const navigation: Array<{ name: string; href: string }> = [
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

      <div class="flex items-center space-x-2">
        <!-- Auth Status -->
        <div v-if="auth.isLoading" class="text-sm text-muted-foreground">
          Loading...
        </div>
        <div
          v-else-if="auth.isAuthenticated && auth.user"
          class="flex items-center space-x-2"
        >
          <img
            v-if="auth.user.avatarUrl"
            :src="auth.user.avatarUrl"
            alt="User Avatar"
            class="h-8 w-8 rounded-full border"
          />
          <!-- Add fallback avatar if needed -->
          <UiButtonButton
            variant="ghost"
            size="icon"
            class="rounded-full"
            @click="auth.logout"
          >
            <LogOut class="h-5 w-5" />
            <span class="sr-only">Logout</span>
          </UiButtonButton>
        </div>
        <RouterLink
          v-else
          to="/login"
          :class="cn(buttonVariants({ variant: 'outline', size: 'sm' }))"
        >
          <LogIn class="mr-2 h-4 w-4" />
          Login
        </RouterLink>

        <!-- Mode Toggles -->
        <UiTooltipTooltipProvider :delay-duration="200">
          <div v-if="isMounted" class="flex items-center space-x-1">
            <!-- Mode Toggle -->
            <UiTooltipTooltip content="">
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

            <!-- Intensity Toggle -->
            <UiTooltipTooltip content="">
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
    </div>
  </header>
</template>
