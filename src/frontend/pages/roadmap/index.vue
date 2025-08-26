<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useSEO } from "../../composables/useSEO";
import { useBuildDate } from "../../composables/useBuildDate";
import { Badge } from "@/frontend/components/ui/badge";
import type { BadgeVariants } from "@/frontend/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/frontend/components/ui/table";
import { Tooltip, TooltipProvider } from "@/frontend/components/ui/tooltip";
import { Alert, AlertDescription } from "@/frontend/components/ui/alert";

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

// Status to Badge variant mapping using status value
const getStatusVariant = (status: string): BadgeVariants["variant"] => {
  // Map semantic status values to badge variants
  const statusMap: Record<string, BadgeVariants["variant"]> = {
    "In progress": "default",
    Exploration: "secondary",
    "On hold": "outline",
    Backlog: "secondary",
    Ongoing: "default",
    "Working prototypes": "default",
  };
  // Fallback to "secondary" if not found
  return statusMap[status] || "secondary";
};

// Create computed roadmap items array with keys for i18n Ally
const roadmapItems = computed(() => {
  return ["item0", "item1", "item2", "item3", "item4", "item5"].map((key) => ({
    key,
    timeframe: t(`roadmap.timeline.${key}.timeframe`),
    description: t(`roadmap.timeline.${key}.description`),
    status: t(`roadmap.timeline.${key}.status`),
  }));
});

// Helper function for tooltip content
const getStatusTooltip = (itemKey: string): string => {
  const tooltipMap: Record<string, string> = {
    item0: t("roadmap.statusTooltips.inProgressPrototypes"),
    item1: t("roadmap.statusTooltips.inProgress"),
    item2: t("roadmap.statusTooltips.exploration"),
    item3: t("roadmap.statusTooltips.onHold"),
    item4: t("roadmap.statusTooltips.backlog"),
    item5: t("roadmap.statusTooltips.ongoing"),
  };
  return tooltipMap[itemKey] || t("roadmap.statusTooltips.default");
};
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
        <TooltipProvider>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="font-semibold text-foreground">
                  {{ $t("roadmap.tableHeaders.timeframe") }}
                </TableHead>
                <TableHead class="font-semibold text-foreground">
                  {{ $t("roadmap.tableHeaders.description") }}
                </TableHead>
                <TableHead class="font-semibold text-foreground">
                  {{ $t("roadmap.tableHeaders.status") }}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="(item, index) in roadmapItems" :key="index">
                <TableCell class="font-medium text-foreground">
                  {{ item.timeframe }}
                </TableCell>
                <TableCell class="text-muted-foreground">
                  {{ item.description }}
                </TableCell>
                <TableCell>
                  <Tooltip :content="getStatusTooltip(item.key)" side="top">
                    <Badge :variant="getStatusVariant(item.status)">
                      {{ item.status }}
                    </Badge>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TooltipProvider>
      </section>

      <!-- Transparency Note -->
      <Alert>
        <AlertDescription>
          {{ $t("roadmap.transparency") }}
        </AlertDescription>
      </Alert>
    </div>
  </RdLayoutBaseLayout>
</template>
