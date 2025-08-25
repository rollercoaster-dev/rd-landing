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
  <RdLayoutBaseLayout :title="$t('how-it-works.heading')">
    <div class="space-y-12">
      <!-- 5-Step Process -->
      <section class="space-y-6">
        <ol class="space-y-6">
          <li class="flex gap-4">
            <div
              class="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm"
            >
              {{ $t("how-it-works.steps.step1.number") }}
            </div>
            <div class="space-y-2">
              <h2 class="text-xl font-bold text-foreground">
                {{ $t("how-it-works.steps.step1.title") }}
              </h2>
              <p class="text-base text-muted-foreground">
                {{ $t("how-it-works.steps.step1.description") }}
              </p>
            </div>
          </li>
          <li class="flex gap-4">
            <div
              class="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm"
            >
              {{ $t("how-it-works.steps.step2.number") }}
            </div>
            <div class="space-y-2">
              <h2 class="text-xl font-bold text-foreground">
                {{ $t("how-it-works.steps.step2.title") }}
              </h2>
              <p class="text-base text-muted-foreground">
                {{ $t("how-it-works.steps.step2.description") }}
              </p>
            </div>
          </li>
          <li class="flex gap-4">
            <div
              class="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm"
            >
              {{ $t("how-it-works.steps.step3.number") }}
            </div>
            <div class="space-y-2">
              <h2 class="text-xl font-bold text-foreground">
                {{ $t("how-it-works.steps.step3.title") }}
              </h2>
              <p class="text-base text-muted-foreground">
                {{ $t("how-it-works.steps.step3.description") }}
              </p>
            </div>
          </li>
          <li class="flex gap-4">
            <div
              class="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm"
            >
              {{ $t("how-it-works.steps.step4.number") }}
            </div>
            <div class="space-y-2">
              <h2 class="text-xl font-bold text-foreground">
                {{ $t("how-it-works.steps.step4.title") }}
              </h2>
              <p class="text-base text-muted-foreground">
                {{ $t("how-it-works.steps.step4.description") }}
              </p>
            </div>
          </li>
          <li class="flex gap-4">
            <div
              class="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm"
            >
              {{ $t("how-it-works.steps.step5.number") }}
            </div>
            <div class="space-y-2">
              <h2 class="text-xl font-bold text-foreground">
                {{ $t("how-it-works.steps.step5.title") }}
              </h2>
              <p class="text-base text-muted-foreground">
                {{ $t("how-it-works.steps.step5.description") }}
              </p>
            </div>
          </li>
        </ol>
      </section>

      <!-- Divider -->
      <hr class="border-border" />

      <!-- Neuro-inclusive by Design -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold text-foreground">
          {{ $t("how-it-works.neuroInclusive.title") }}
        </h2>
        <ul class="space-y-2 list-disc pl-5 text-muted-foreground">
          <li>{{ $t("how-it-works.neuroInclusive.feature1") }}</li>
          <li>{{ $t("how-it-works.neuroInclusive.feature2") }}</li>
          <li>{{ $t("how-it-works.neuroInclusive.feature3") }}</li>
          <li>{{ $t("how-it-works.neuroInclusive.feature4") }}</li>
        </ul>
      </section>
    </div>
  </RdLayoutBaseLayout>
</template>
