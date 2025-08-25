<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useSEO } from "../../composables/useSEO";
import { useBuildDate } from "../../composables/useBuildDate";

const { t, locale } = useI18n();
const { getFormattedBuildDate } = useBuildDate();

useSEO({
  title: t("roadmap.title"),
  description: t("roadmap.meta.description"),
  og: {
    template: "page",
  },
});

const buildDate = computed(() => getFormattedBuildDate(locale.value));
</script>

<template>
  <RdLayoutBaseLayout :title="$t('roadmap.heading')">
    <div class="space-y-8">
      <!-- Last Updated -->
      <section class="text-sm text-muted-foreground">
        {{ $t("roadmap.lastUpdated") }} {{ buildDate }}
      </section>

      <!-- Roadmap Table -->
      <section class="space-y-4">
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="border-b border-border">
                <th class="text-left py-3 px-4 font-semibold text-foreground">
                  {{ $t("roadmap.tableHeaders.timeframe") }}
                </th>
                <th class="text-left py-3 px-4 font-semibold text-foreground">
                  {{ $t("roadmap.tableHeaders.description") }}
                </th>
                <th class="text-left py-3 px-4 font-semibold text-foreground">
                  {{ $t("roadmap.tableHeaders.status") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-border/50">
                <td class="py-3 px-4 font-medium text-foreground">
                  {{ $t("roadmap.timeline.item1.timeframe") }}
                </td>
                <td class="py-3 px-4 text-muted-foreground">
                  {{ $t("roadmap.timeline.item1.description") }}
                </td>
                <td class="py-3 px-4">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {{ $t("roadmap.timeline.item1.status") }}
                  </span>
                </td>
              </tr>
              <tr class="border-b border-border/50">
                <td class="py-3 px-4 font-medium text-foreground">
                  {{ $t("roadmap.timeline.item2.timeframe") }}
                </td>
                <td class="py-3 px-4 text-muted-foreground">
                  {{ $t("roadmap.timeline.item2.description") }}
                </td>
                <td class="py-3 px-4">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                  >
                    {{ $t("roadmap.timeline.item2.status") }}
                  </span>
                </td>
              </tr>
              <tr class="border-b border-border/50">
                <td class="py-3 px-4 font-medium text-foreground">
                  {{ $t("roadmap.timeline.item3.timeframe") }}
                </td>
                <td class="py-3 px-4 text-muted-foreground">
                  {{ $t("roadmap.timeline.item3.description") }}
                </td>
                <td class="py-3 px-4">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                  >
                    {{ $t("roadmap.timeline.item3.status") }}
                  </span>
                </td>
              </tr>
              <tr class="border-b border-border/50">
                <td class="py-3 px-4 font-medium text-foreground">
                  {{ $t("roadmap.timeline.item4.timeframe") }}
                </td>
                <td class="py-3 px-4 text-muted-foreground">
                  {{ $t("roadmap.timeline.item4.description") }}
                </td>
                <td class="py-3 px-4">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  >
                    {{ $t("roadmap.timeline.item4.status") }}
                  </span>
                </td>
              </tr>
              <tr class="border-b border-border/50">
                <td class="py-3 px-4 font-medium text-foreground">
                  {{ $t("roadmap.timeline.item5.timeframe") }}
                </td>
                <td class="py-3 px-4 text-muted-foreground">
                  {{ $t("roadmap.timeline.item5.description") }}
                </td>
                <td class="py-3 px-4">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  >
                    {{ $t("roadmap.timeline.item5.status") }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Transparency Note -->
      <section class="text-sm text-muted-foreground italic">
        {{ $t("roadmap.transparency") }}
      </section>
    </div>
  </RdLayoutBaseLayout>
</template>
