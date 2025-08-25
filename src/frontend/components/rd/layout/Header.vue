<script setup lang="ts">
import { Menu, X } from "lucide-vue-next";
import { ref, onMounted, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, RouterLink } from "vue-router";
import { navConfig } from "@/frontend/config/navigation";

const { t } = useI18n();
const route = useRoute();

const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});

const primaryNav = computed(() => navConfig.primary);
const ctas = computed(() => navConfig.ctas);

// Computed translations for mobile menu
const mobileMenuToggleText = computed(() =>
  mobileOpen.value ? t("header.aria.closeMenu") : t("header.aria.openMenu"),
);

const closeMenuText = computed(() => t("header.aria.closeMenu"));

// For aria-current highlighting
type RouteTo = { name?: string; path?: string };
const isActive = (to?: RouteTo) => {
  if (!to) return false;
  if (to.name) return route.name === to.name;
  if (to.path) return route.path === to.path;
  return false;
};

// Mobile Sheet open state, to allow closing on route change
const mobileOpen = ref(false);
watch(
  () => route.fullPath,
  () => {
    if (mobileOpen.value) mobileOpen.value = false;
  },
);
</script>

<template>
  <header
    role="banner"
    class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <RdLayoutSkipLink />
    <div class="container relative flex h-16 items-center gap-3 pr-14 md:pr-0">
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
      <div class="flex items-center gap-1 ml-auto">
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
        <RdLayoutHeaderControls v-if="isMounted" class="hidden md:flex" />
      </div>
    </div>

    <!-- Mobile menu trigger anchored to the header edge -->
    <div class="absolute right-2 top-1/2 -translate-y-1/2 md:hidden">
      <UiSheetSheet v-model:open="mobileOpen">
        <UiSheetSheetTrigger as-child>
          <UiButtonButton
            id="mobile-menu-trigger"
            variant="ghost"
            size="icon"
            class="rounded-full h-11 w-11"
            :aria-label="mobileMenuToggleText"
            aria-haspopup="dialog"
            :aria-expanded="mobileOpen ? 'true' : 'false'"
            aria-controls="mobile-menu"
          >
            <Menu class="h-5 w-5" aria-hidden="true" />
            <span class="sr-only">{{ mobileMenuToggleText }}</span>
          </UiButtonButton>
        </UiSheetSheetTrigger>

        <UiSheetSheetContent
          id="mobile-menu"
          side="right"
          :aria-labelledby="'mobile-menu-title'"
          class="w-80 max-w-[90vw]"
        >
          <template #overlay>
            <UiSheetSheetOverlay />
          </template>
          <div class="flex items-center justify-between px-3 py-2 border-b">
            <UiSheetSheetTitle id="mobile-menu-title">{{
              $t("header.brand")
            }}</UiSheetSheetTitle>
            <UiSheetSheetClose as-child>
              <UiButtonButton
                variant="ghost"
                size="icon"
                class="rounded-full h-9 w-9 ml-2"
              >
                <X aria-hidden="true" />
                <span class="sr-only">{{ closeMenuText }}</span>
              </UiButtonButton>
            </UiSheetSheetClose>
          </div>
          <UiSheetSheetDescription class="sr-only">{{
            t("header.aria.primaryNav")
          }}</UiSheetSheetDescription>

          <RdLayoutMobileMenuContent
            :items="primaryNav"
            :ctas="ctas"
            labelledby-id="mobile-menu-title"
            @close="mobileOpen = false"
          />
        </UiSheetSheetContent>
      </UiSheetSheet>
    </div>
  </header>
</template>
