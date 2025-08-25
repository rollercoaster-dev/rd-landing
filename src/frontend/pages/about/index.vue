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
  <RdLayoutBaseLayout :title="$t('about.heading')">
    <div class="space-y-8">
      <!-- Introduction -->
      <section class="space-y-4">
        <p class="text-lg text-foreground font-medium">
          {{ $t("about.intro") }}
        </p>
      </section>

      <!-- Our Mission -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold text-foreground">
          {{ $t("about.mission.title") }}
        </h2>
        <p class="text-base text-muted-foreground">
          {{ $t("about.mission.content") }}
        </p>
      </section>

      <!-- Who We Are -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold text-foreground">
          {{ $t("about.whoWeAre.title") }}
        </h2>
        <p class="text-base text-muted-foreground">
          {{ $t("about.whoWeAre.content") }}
        </p>
      </section>

      <!-- What We Value -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold text-foreground">
          {{ $t("about.values.title") }}
        </h2>
        <ul class="space-y-3">
          <li class="flex flex-col space-y-1">
            <span class="font-semibold text-foreground">
              {{ $t("about.values.flexibility.name") }}:
            </span>
            <span class="text-muted-foreground">
              {{ $t("about.values.flexibility.description") }}
            </span>
          </li>
          <li class="flex flex-col space-y-1">
            <span class="font-semibold text-foreground">
              {{ $t("about.values.clarity.name") }}:
            </span>
            <span class="text-muted-foreground">
              {{ $t("about.values.clarity.description") }}
            </span>
          </li>
          <li class="flex flex-col space-y-1">
            <span class="font-semibold text-foreground">
              {{ $t("about.values.community.name") }}:
            </span>
            <span class="text-muted-foreground">
              {{ $t("about.values.community.description") }}
            </span>
          </li>
        </ul>
      </section>

      <!-- How You Benefit -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold text-foreground">
          {{ $t("about.benefits.title") }}
        </h2>
        <ul class="space-y-2 list-disc pl-5 text-muted-foreground">
          <li>{{ $t("about.benefits.item1") }}</li>
          <li>{{ $t("about.benefits.item2") }}</li>
          <li>{{ $t("about.benefits.item3") }}</li>
          <li>{{ $t("about.benefits.item4") }}</li>
        </ul>
      </section>

      <!-- Call to Action -->
      <section class="space-y-4 pt-4">
        <div class="flex flex-wrap gap-4">
          <UiButtonButton size="lg" class="font-medium">
            {{ $t("about.cta.joinWaitlist") }}
          </UiButtonButton>
          <UiButtonButton variant="outline" size="lg" class="font-medium">
            {{ $t("about.cta.contribute") }}
          </UiButtonButton>
        </div>
      </section>
    </div>
  </RdLayoutBaseLayout>
</template>
