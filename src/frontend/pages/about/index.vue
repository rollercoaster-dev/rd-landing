<template>
  <div class="py-10">
    <header>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold text-gray-900">
          {{ $t("about.heading") }}
        </h1>
        <p class="mt-4 text-lg text-gray-600">
          {{ $t("about.description") }}
        </p>
      </div>
    </header>

    <div class="mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="prose prose-indigo max-w-none">
        <h2 class="text-2xl font-bold text-gray-900 mt-8">
          What are Open Badges?
        </h2>
        <p class="mt-4 text-gray-600">
          Open Badges are digital credentials that represent skills,
          achievements, or certifications. They are portable, verifiable, and
          can be shared across the web.
        </p>

        <h2 class="text-2xl font-bold text-gray-900 mt-8">
          {{ $t("about.techStack.title") }}
        </h2>
        <ul class="mt-4 space-y-2 list-disc pl-5 text-gray-600">
          <li>
            <span class="font-semibold">{{
              $t("about.techStack.frontend")
            }}</span>
            {{ $t("about.techStack.frontendTech") }}
          </li>
          <li>
            <span class="font-semibold">{{
              $t("about.techStack.backend")
            }}</span>
            {{ $t("about.techStack.backendTech") }}
          </li>
          <li>
            <span class="font-semibold">{{
              $t("about.techStack.database")
            }}</span>
            {{ $t("about.techStack.databaseTech") }}
          </li>
          <li>
            <span class="font-semibold">{{
              $t("about.techStack.componentDev")
            }}</span>
            {{ $t("about.techStack.componentDevTech") }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

// Notice we don't need to import useHead anymore - it's auto-imported
const { t } = useI18n();

useHead({
  title: t("about.title"),
  meta: [
    {
      name: "description",
      content: t("about.meta.description"),
    },
  ],
});
</script>

<style scoped>
/* Styles are provided by Tailwind CSS */
</style>
