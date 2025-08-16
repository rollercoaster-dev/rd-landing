<script setup lang="ts">
import { Languages } from "lucide-vue-next";
import { useI18n } from "vue-i18n";
import { ref, onMounted } from "vue";

const { locale } = useI18n();

// Client-side mounting flag
const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
];

const currentLanguage = computed(() => {
  return languages.find((lang) => lang.code === locale.value) || languages[0];
});

const switchLanguage = (langCode: string) => {
  locale.value = langCode;
  // Persist language preference
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("preferred-language", langCode);
  }
};

// Load saved language preference on mount
onMounted(() => {
  if (typeof localStorage !== "undefined") {
    const savedLang = localStorage.getItem("preferred-language");
    if (savedLang && languages.some((lang) => lang.code === savedLang)) {
      locale.value = savedLang;
    }
  }
});
</script>

<template>
  <UiTooltipTooltip
    v-if="isMounted"
    :content="$t('header.language.switchLanguage')"
    side="bottom"
    :delay-duration="200"
  >
    <UiDropdownMenuDropdownMenu>
      <UiDropdownMenuDropdownMenuTrigger as-child>
        <UiButtonButton
          variant="ghost"
          size="icon"
          class="rounded-full"
          :aria-label="$t('header.language.switchLanguage')"
        >
          <Languages class="h-5 w-5" />
        </UiButtonButton>
      </UiDropdownMenuDropdownMenuTrigger>

      <UiDropdownMenuDropdownMenuContent align="end">
        <UiDropdownMenuDropdownMenuItem
          v-for="language in languages"
          :key="language.code"
          @click="switchLanguage(language.code)"
          :class="{ 'bg-accent': language.code === locale }"
        >
          <span class="mr-2">{{ language.flag }}</span>
          {{ language.name }}
        </UiDropdownMenuDropdownMenuItem>
      </UiDropdownMenuDropdownMenuContent>
    </UiDropdownMenuDropdownMenu>
  </UiTooltipTooltip>
</template>
