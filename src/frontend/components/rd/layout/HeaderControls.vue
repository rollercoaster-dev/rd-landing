<script setup lang="ts">
import { useTheme } from "@/frontend/composables/useTheme";
import { useI18n } from "vue-i18n";
import { Sun, Moon, Paintbrush } from "lucide-vue-next";

const { mode, intensity, toggleIntensity } = useTheme();
const { t } = useI18n();

const toggleMode = () => {
  mode.value = mode.value === "dark" ? "light" : "dark";
};

// Computed translations for mode toggle
const modeToggleText = computed(() =>
  mode.value === "dark"
    ? t("header.theme.switchToLight")
    : t("header.theme.switchToDark"),
);

const modeTooltip = computed(
  () => `${modeToggleText.value} ${t("header.theme.shortcutMode")}`,
);

// Computed translations for intensity toggle
const intensityToggleText = computed(() =>
  intensity.value === "vibrant"
    ? t("header.theme.switchToCalm")
    : t("header.theme.switchToVibrant"),
);

const intensityTooltip = computed(
  () => `${intensityToggleText.value} ${t("header.theme.shortcutIntensity")}`,
);

const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});
</script>

<template>
  <!-- Language + Theme/Intensity -->
  <UiTooltipTooltipProvider :delay-duration="200">
    <div class="flex items-center" :class="$attrs.class">
      <!-- Language Switcher -->
      <UiLanguageSwitcher />
      <!-- Mode Toggle -->
      <UiTooltipTooltip
        :content="modeTooltip"
        side="bottom"
        :delay-duration="200"
      >
        <UiButtonButton
          variant="ghost"
          size="icon"
          class="rounded-full hit-44"
          :aria-label="modeToggleText"
          @click="toggleMode"
        >
          <Sun v-if="mode === 'dark'" class="h-5 w-5" />
          <Moon v-else class="h-5 w-5" />
          <span class="sr-only">{{ modeToggleText }}</span>
        </UiButtonButton>
      </UiTooltipTooltip>

      <!-- Intensity Toggle -->
      <UiTooltipTooltip
        :content="intensityTooltip"
        side="bottom"
        :delay-duration="200"
      >
        <UiButtonButton
          variant="ghost"
          size="icon"
          class="rounded-full hit-44"
          :aria-label="intensityToggleText"
          @click="toggleIntensity"
        >
          <Paintbrush class="h-5 w-5" />
          <span class="sr-only">{{ intensityToggleText }}</span>
        </UiButtonButton>
      </UiTooltipTooltip>
    </div>
  </UiTooltipTooltipProvider>
</template>
