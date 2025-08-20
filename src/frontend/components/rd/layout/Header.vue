<script setup lang="ts">
import { Sun, Moon, Paintbrush, Menu, X } from "lucide-vue-next";
import { useTheme } from "@/frontend/composables/useTheme";
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from "vue";
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

// Mobile menu (accessible dialog) state and helpers
const isMenuOpen = ref(false);
const dialogEl = ref<HTMLElement | null>(null);

const getTabbables = (root: HTMLElement | null): HTMLElement[] => {
  if (!root) return [];
  const nodes = Array.from(
    root.querySelectorAll(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ),
  ) as HTMLElement[];
  return nodes.filter(
    (el) =>
      !el.hasAttribute("disabled") &&
      el.tabIndex !== -1 &&
      el.offsetParent !== null,
  );
};

const focusFirst = () => {
  const tabbables = getTabbables(dialogEl.value);
  (tabbables[0] ?? dialogEl.value)?.focus();
};

const openMenu = async () => {
  isMenuOpen.value = true;
  // Prevent background scroll while dialog is open
  document.documentElement.style.overflow = "hidden";
  await nextTick();
  focusFirst();
};

const closeMenu = () => {
  isMenuOpen.value = false;
  // Restore scroll
  document.documentElement.style.overflow = "";
  // restore focus to trigger
  (
    document.getElementById("mobile-menu-trigger") as HTMLElement | null
  )?.focus();
};

const onDialogKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    e.preventDefault();
    closeMenu();
    return;
  }
  if (e.key === "Tab") {
    const tabbables = getTabbables(dialogEl.value);
    if (tabbables.length === 0) {
      e.preventDefault();
      (dialogEl.value as HTMLElement)?.focus();
      return;
    }
    const first = tabbables[0];
    const last = tabbables[tabbables.length - 1];
    const active = document.activeElement as HTMLElement | null;
    if (e.shiftKey) {
      if (!active || active === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (!active || active === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }
};

const onFocusIn = (e: FocusEvent) => {
  if (!isMenuOpen.value) return;
  const target = e.target as HTMLElement | null;
  if (dialogEl.value && target && !dialogEl.value.contains(target)) {
    // keep focus inside dialog
    focusFirst();
  }
};

onMounted(() => {
  document.addEventListener("focusin", onFocusIn);
});

onBeforeUnmount(() => {
  document.removeEventListener("focusin", onFocusIn);
});

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
                class="rounded-full hit-44"
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
                class="rounded-full hit-44"
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

        <!-- Mobile menu (Accessible Dialog) -->
        <div class="md:hidden">
          <UiButtonButton
            id="mobile-menu-trigger"
            variant="ghost"
            size="icon"
            class="hit-44 rounded-full"
            :aria-label="
              isMenuOpen
                ? $t('header.aria.closeMenu')
                : $t('header.aria.openMenu')
            "
            aria-haspopup="dialog"
            :aria-expanded="isMenuOpen ? 'true' : 'false'"
            aria-controls="mobile-menu"
            @click="isMenuOpen ? closeMenu() : openMenu()"
          >
            <Menu class="h-5 w-5" />
            <span class="sr-only">
              {{
                isMenuOpen
                  ? $t("header.aria.closeMenu")
                  : $t("header.aria.openMenu")
              }}
            </span>
          </UiButtonButton>

          <!-- Overlay (teleported to body to avoid header stacking context issues) -->
          <teleport to="body">
            <div
              v-if="isMenuOpen"
              class="fixed inset-0 z-[100] bg-black/50"
              @click.self="closeMenu"
            >
              <!-- Dialog Panel -->
              <div
                id="mobile-menu"
                ref="dialogEl"
                role="dialog"
                aria-modal="true"
                :aria-label="$t('header.aria.primaryNav')"
                class="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-background shadow-lg border-l flex flex-col"
                tabindex="-1"
                @keydown="onDialogKeydown"
              >
                <div class="flex items-center justify-between p-3 border-b">
                  <span class="text-sm font-medium">{{
                    $t("header.brand")
                  }}</span>
                  <UiButtonButton
                    variant="ghost"
                    size="icon"
                    class="hit-44"
                    :aria-label="$t('header.aria.closeMenu')"
                    @click="closeMenu"
                  >
                    <X aria-hidden="true" class="h-5 w-5" />
                  </UiButtonButton>
                </div>

                <nav
                  class="flex-1 overflow-auto p-2"
                  :aria-label="$t('header.aria.primaryNav')"
                >
                  <RouterLink
                    v-for="item in primaryNav"
                    :key="'m-' + item.id"
                    :to="item.to as any"
                    class="block rounded px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    @click="closeMenu"
                  >
                    {{ $t(item.i18nKey) }}
                  </RouterLink>

                  <div class="border-t my-2" />

                  <template v-for="cta in ctas" :key="'m-cta-' + cta.id">
                    <RouterLink
                      v-if="cta.to"
                      :to="cta.to as any"
                      class="block rounded px-3 py-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90 mt-1"
                      @click="closeMenu"
                    >
                      {{ $t(cta.i18nKey) }}
                    </RouterLink>
                    <a
                      v-else-if="cta.href"
                      :href="cta.href"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="block rounded px-3 py-2 text-sm border border-primary text-primary hover:bg-primary/10 mt-1"
                      @click="closeMenu"
                    >
                      {{ $t(cta.i18nKey) }}
                    </a>
                  </template>
                </nav>
              </div>
            </div>
          </teleport>
        </div>
      </div>
    </div>
  </header>
</template>
