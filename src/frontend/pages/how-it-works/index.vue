<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useSEO } from "../../composables/useSEO";

const { t } = useI18n();

useSEO({
  title: t("how-it-works.title"),
  description: t("how-it-works.meta.description"),
  og: {
    template: "feature",
  },
});
</script>

<template>
  <RdLayoutBaseLayout
    :title="$t('how-it-works.heading')"
    :subtitle="$t('how-it-works.subtitle')"
  >
    <!-- Page content goes here -->
    <p class="text-base text-muted-foreground">
      {{ $t("how-it-works.comingSoon") }}
    </p>
  </RdLayoutBaseLayout>
</template>
