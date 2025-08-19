<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useSEO } from "../../composables/useSEO";

const { t } = useI18n();

useSEO({
  title: t("impressum.title"),
  description: t("impressum.meta.description"),
  og: {
    template: "page",
  },
});
</script>

<template>
  <RdLayoutBaseLayout
    :title="$t('impressum.heading')"
    :subtitle="$t('impressum.subtitle')"
  >
    <div class="space-y-4 text-muted-foreground">
      <p>{{ $t("impressum.contact") }}</p>
    </div>
  </RdLayoutBaseLayout>
</template>
