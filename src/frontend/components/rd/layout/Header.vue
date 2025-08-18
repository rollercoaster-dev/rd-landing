<script setup lang="ts">
import { Sun, Moon, Paintbrush } from "lucide-vue-next";
import { useTheme } from "@/frontend/composables/useTheme";
import { ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// Theme composable
const { mode, intensity, toggleIntensity } = useTheme();

const toggleMode = () => {
  mode.value = mode.value === "dark" ? "light" : "dark";
};

const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});

const navigation = computed(() => [
  { name: t("header.nav.about"), href: "/about" },
  { name: t("header.nav.howItWorks"), href: "/how-it-works" },
  { name: t("header.nav.roadmap"), href: "/roadmap" },
]);
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <div class="container flex h-16 items-center">
      <!-- Logo -->
      <RouterLink to="/" class="mr-8">
        <h1 class="text-2xl font-bold">
          <RdHeadlineGradient>{{ $t("header.brand") }}</RdHeadlineGradient>
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
        <!-- CTAs -->
        <RouterLink
          :to="{ path: '/', hash: '#waitlist' }"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {{ $t("header.nav.waitlist") }}
        </RouterLink>
        <a
          href="https://github.com/rollercoaster-dev"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-primary text-primary hover:bg-primary/10"
        >
          {{ $t("header.nav.contribute") }}
        </a>

        <!-- Simple landing page - no auth needed -->
        <!-- Mode Toggles -->
        <UiTooltipTooltipProvider :delay-duration="200">
          <div v-if="isMounted" class="flex items-center space-x-1">
            <!-- Language Switcher -->
            <UiLanguageSwitcher />
            <!-- Mode Toggle -->
            <UiTooltipTooltip
              :content="`${mode === 'dark' ? $t('header.theme.switchToLight') : $t('header.theme.switchToDark')} ${$t('header.theme.shortcutMode')}`"
              side="bottom"
              :delay-duration="200"
            >
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
                      ? $t("header.theme.switchToLight")
                      : $t("header.theme.switchToDark")
                  }}
                </span>
              </UiButtonButton>
            </UiTooltipTooltip>

            <!-- Intensity Toggle -->
            <UiTooltipTooltip
              :content="`${intensity === 'vibrant' ? $t('header.theme.switchToCalm') : $t('header.theme.switchToVibrant')} ${$t('header.theme.shortcutIntensity')}`"
              side="bottom"
              :delay-duration="200"
            >
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
                      ? $t("header.theme.switchToCalm")
                      : $t("header.theme.switchToVibrant")
                  }}
                </span>
              </UiButtonButton>
            </UiTooltipTooltip>
          </div>
        </UiTooltipTooltipProvider>
      </div>
    </div>
  </header>
</template>
