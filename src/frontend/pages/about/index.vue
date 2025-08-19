<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useSEO } from "../../composables/useSEO";

const { t } = useI18n();

useSEO({
  title: t("about.title"),
  description: t("about.meta.description"),
  og: {
    template: "page",
  },
});
</script>

<template>
  <RdLayoutBaseLayout
    :title="$t('about.heading')"
    :subtitle="$t('about.description')"
  >
    <div class="space-y-8">
      <section class="space-y-3">
        <h2 class="text-2xl font-bold text-foreground">
          What are Open Badges?
        </h2>
        <p class="text-base text-muted-foreground">
          Open Badges are digital credentials that represent skills,
          achievements, or certifications. They are portable, verifiable, and
          can be shared across the web.
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-2xl font-bold text-foreground">
          {{ $t("about.techStack.title") }}
        </h2>
        <ul class="mt-2 space-y-2 list-disc pl-5 text-muted-foreground">
          <li>
            <span class="font-semibold text-foreground">{{
              $t("about.techStack.frontend")
            }}</span>
            {{ $t("about.techStack.frontendTech") }}
          </li>
          <li>
            <span class="font-semibold text-foreground">{{
              $t("about.techStack.backend")
            }}</span>
            {{ $t("about.techStack.backendTech") }}
          </li>
          <li>
            <span class="font-semibold text-foreground">{{
              $t("about.techStack.database")
            }}</span>
            {{ $t("about.techStack.databaseTech") }}
          </li>
          <li>
            <span class="font-semibold text-foreground">{{
              $t("about.techStack.componentDev")
            }}</span>
            {{ $t("about.techStack.componentDevTech") }}
          </li>
        </ul>
      </section>
    </div>
  </RdLayoutBaseLayout>
</template>
