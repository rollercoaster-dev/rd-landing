<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref, onMounted, computed } from "vue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/frontend/components/ui/select";
import { Tooltip } from "@/frontend/components/ui/tooltip";
import type { AcceptableValue } from "reka-ui";

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

const switchLanguage = (langCode: AcceptableValue) => {
  // reka-ui Select emits the value directly as AcceptableValue (string in our case)
  if (
    typeof langCode === "string" &&
    languages.some((lang) => lang.code === langCode)
  ) {
    locale.value = langCode;
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("preferred-language", langCode);
    }
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
  <Tooltip
    :content="$t('header.language.switchLanguage')"
    side="bottom"
    :delay-duration="200"
  >
    <Select
      v-if="isMounted"
      :model-value="locale"
      @update:model-value="switchLanguage"
    >
      <SelectTrigger
        class="w-auto h-9 px-3 border-0 bg-transparent hover:bg-accent hover:text-accent-foreground rounded-full focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background focus-enhanced"
        :aria-label="$t('header.language.switchLanguage')"
      >
        <SelectValue>
          <div class="flex items-center gap-2">
            <span>{{ currentLanguage.flag }}</span>
            <span class="text-sm font-medium">{{
              currentLanguage.code.toUpperCase()
            }}</span>
          </div>
        </SelectValue>
      </SelectTrigger>

      <SelectContent align="end">
        <SelectItem
          v-for="language in languages"
          :key="language.code"
          :value="language.code"
        >
          <div class="flex items-center gap-2 ps-5 pe-2">
            <span>{{ language.flag }}</span>
            <span>{{ language.name }}</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>

    <!-- SSR fallback: show current language without interactivity -->
    <div
      v-else
      class="w-auto h-9 px-3 border-0 bg-transparent rounded-full flex items-center gap-2"
      :aria-label="$t('header.language.switchLanguage')"
    >
      <span>{{ currentLanguage.flag }}</span>
      <span class="text-sm font-medium">{{
        currentLanguage.code.toUpperCase()
      }}</span>
    </div>
  </Tooltip>
</template>
