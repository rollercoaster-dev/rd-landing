<script setup lang="ts">
import { Sun, Moon, Paintbrush, Menu } from "lucide-vue-next";
import { useTheme } from "@/frontend/composables/useTheme";
import { ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, RouterLink } from "vue-router";
import { navConfig } from "@/frontend/config/navigation";

useI18n();
const route = useRoute();

// Theme composable
const { mode, intensity, toggleIntensity } = useTheme();

const toggleMode = () => {
  mode.value = mode.value === "dark" ? "light" : "dark";
};

const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});

const primaryNav = computed(() => navConfig.primary);
const ctas = computed(() => navConfig.ctas);

type RouteTo = { name?: string; path?: string };
const isActive = (to?: RouteTo) => {
  if (!to) return false;
  if (to.name) return route.name === to.name;
  if (to.path) return route.path === to.path;
  return false;
};
</script>

<template>
  <header
    role="banner"
    class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <RdLayoutSkipLink />
    <div class="container flex h-16 items-center gap-3">
      <!-- Logo -->
      <RouterLink to="/" class="mr-2 md:mr-6" aria-label="Home">
        <h1 class="text-xl md:text-2xl font-bold">
          <RdHeadlineGradient>{{ $t("header.brand") }}</RdHeadlineGradient>
        </h1>
      </RouterLink>

      <!-- Desktop Navigation -->
      <nav
        aria-label="Main navigation"
        class="hidden md:flex items-center gap-6 text-sm font-medium flex-1 min-w-0"
      >
        <RouterLink
          v-for="item in primaryNav"
          :key="item.id"
          :to="item.to as any"
          class="transition-colors hover:text-primary whitespace-nowrap"
          :aria-current="isActive(item.to) ? 'page' : undefined"
        >
          {{ $t(item.i18nKey) }}
        </RouterLink>
      </nav>

      <!-- Right utilities and CTAs -->
      <div class="flex items-center gap-1">
        <!-- CTAs (smaller on desktop) -->
        <div class="hidden md:flex items-center gap-1">
          <template v-for="cta in ctas" :key="cta.id">
            <RouterLink
              v-if="cta.to"
              :to="cta.to as any"
              class="inline-flex items-center px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-sm"
              :aria-label="
                cta.ariaLabelKey ? $t(cta.ariaLabelKey) : $t(cta.i18nKey)
              "
            >
              {{ $t(cta.i18nKey) }}
            </RouterLink>
            <a
              v-else-if="cta.href"
              :href="cta.href"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-3 py-1.5 rounded-md border border-primary text-primary hover:bg-primary/10 text-sm"
              :aria-label="
                cta.ariaLabelKey ? $t(cta.ariaLabelKey) : $t(cta.i18nKey)
              "
            >
              {{ $t(cta.i18nKey) }}
            </a>
          </template>
        </div>

        <!-- Language + Theme/Intensity -->
        <UiTooltipTooltipProvider :delay-duration="200">
          <div v-if="isMounted" class="flex items-center">
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
                :aria-label="
                  mode === 'dark'
                    ? $t('header.theme.switchToLight')
                    : $t('header.theme.switchToDark')
                "
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
                :aria-label="
                  intensity === 'vibrant'
                    ? $t('header.theme.switchToCalm')
                    : $t('header.theme.switchToVibrant')
                "
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

        <!-- Mobile menu (Dropdown) -->
        <div class="md:hidden">
          <UiDropdownMenuDropdownMenu>
            <UiDropdownMenuDropdownMenuTrigger as-child>
              <UiButtonButton
                variant="ghost"
                size="icon"
                :aria-label="$t('header.aria.openMenu')"
              >
                <Menu class="h-5 w-5" />
              </UiButtonButton>
            </UiDropdownMenuDropdownMenuTrigger>
            <UiDropdownMenuDropdownMenuContent align="end">
              <div class="px-1 py-1">
                <RouterLink
                  v-for="item in primaryNav"
                  :key="'m-' + item.id"
                  :to="item.to as any"
                  class="block rounded px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                >
                  {{ $t(item.i18nKey) }}
                </RouterLink>
              </div>
              <div class="border-t my-1" />
              <div class="px-1 py-1">
                <template v-for="cta in ctas" :key="'m-cta-' + cta.id">
                  <RouterLink
                    v-if="cta.to"
                    :to="cta.to as any"
                    class="block rounded px-2 py-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {{ $t(cta.i18nKey) }}
                  </RouterLink>
                  <a
                    v-else-if="cta.href"
                    :href="cta.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="block rounded px-2 py-2 text-sm border border-primary text-primary hover:bg-primary/10"
                  >
                    {{ $t(cta.i18nKey) }}
                  </a>
                </template>
              </div>
            </UiDropdownMenuDropdownMenuContent>
          </UiDropdownMenuDropdownMenu>
        </div>
      </div>
    </div>
  </header>
</template>
