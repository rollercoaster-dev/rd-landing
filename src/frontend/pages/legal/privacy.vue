<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useSEO } from "../../composables/useSEO";

const { t } = useI18n();

useSEO({
  title: t("privacy.title"),
  description: t("privacy.meta.description"),
  og: {
    template: "page",
  },
});
</script>

<template>
  <RdLayoutBaseLayout
    :title="$t('privacy.heading')"
    :subtitle="$t('privacy.subtitle')"
  >
    <div class="prose max-w-none text-muted-foreground">
      <p>
        This page will outline how we collect, use, and store data in compliance
        with applicable regulations.
      </p>
    </div>
  </RdLayoutBaseLayout>
</template>
