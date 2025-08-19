<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useSEO } from "../../composables/useSEO";

const { t } = useI18n();

useSEO({
  title: t("roadmap.title"),
  description: t("roadmap.meta.description"),
  og: {
    template: "page",
  },
});
</script>

<template>
  <RdLayoutBaseLayout
    :title="$t('roadmap.heading')"
    :subtitle="$t('roadmap.subtitle')"
  >
    <!-- Page content goes here -->
    <p class="text-base text-muted-foreground">
      {{ $t("roadmap.comingSoon") }}
    </p>
  </RdLayoutBaseLayout>
</template>
