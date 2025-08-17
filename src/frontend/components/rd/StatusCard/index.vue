<script setup lang="ts">
import { useI18n } from "vue-i18n";

export type StatusFeature = {
  icon: string;
  text: string;
};

export type StatusCardProps = {
  title: string;
  icon: string;
  description: string;
  features: StatusFeature[];
  status: "in-progress" | "planned" | "completed";
  gradientFrom?: "primary" | "accent" | "secondary";
  // Live GitHub data
  repository?: string;
  url?: string;
  progress?: number;
  openIssues?: number;
  totalIssues?: number;
  lastUpdated?: Date;
  showProgress?: boolean;
  showGitHubLink?: boolean;
};

withDefaults(defineProps<StatusCardProps>(), {
  gradientFrom: "primary",
  showProgress: true,
  showGitHubLink: true,
});

const { t, locale } = useI18n();

const statusVariants = {
  "in-progress": {
    textKey: "common.status.inProgress",
    variant: "secondary" as const,
  },
  planned: { textKey: "common.status.planned", variant: "outline" as const },
  completed: {
    textKey: "common.status.completed",
    variant: "default" as const,
  },
};

const formatLastUpdated = (date?: Date) => {
  if (!date) return null;
  return new Intl.RelativeTimeFormat(locale.value, { numeric: "auto" }).format(
    Math.floor((date.getTime() - Date.now()) / (1000 * 60)),
    "minute",
  );
};
</script>

<template>
  <UiCardCard
    class="group overflow-hidden hover:shadow-lg transition-all relative before:absolute before:inset-0 before:-z-10 flex flex-col h-full"
    :class="{
      'before:bg-gradient-to-br before:from-primary/5 before:to-transparent':
        gradientFrom === 'primary',
      'before:bg-gradient-to-br before:from-accent/5 before:to-transparent':
        gradientFrom === 'accent',
      'before:bg-gradient-to-br before:from-secondary/5 before:to-transparent':
        gradientFrom === 'secondary',
    }"
  >
    <UiCardCardHeader>
      <UiCardCardTitle class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-2xl">{{ icon }}</span>
          <span>{{ title }}</span>
        </div>
        <div v-if="showGitHubLink && url" class="text-xs">
          <a
            :href="url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-muted-foreground hover:text-foreground transition-colors"
            :title="`View ${repository} on GitHub`"
          >
            {{ t("common.github") }} →
          </a>
        </div>
      </UiCardCardTitle>
    </UiCardCardHeader>
    <UiCardCardContent class="space-y-3 flex-1">
      <p class="text-sm text-card-foreground/90">
        {{ description }}
      </p>

      <!-- Live progress bar -->
      <div
        v-if="showProgress && typeof progress === 'number'"
        class="space-y-2"
      >
        <div class="flex justify-between text-xs text-muted-foreground">
          <span>{{ t("common.progress") }}</span>
          <span>{{ progress }}%</span>
        </div>
        <div class="w-full bg-secondary rounded-full h-2">
          <div
            class="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
            :style="{ width: `${Math.min(progress, 100)}%` }"
          ></div>
        </div>
      </div>

      <!-- Issue counts -->
      <div
        v-if="typeof openIssues === 'number' && typeof totalIssues === 'number'"
        class="flex justify-between text-xs text-muted-foreground"
      >
        <span
          >{{ totalIssues - openIssues }}/{{ totalIssues }}
          {{ t("common.completed") }}</span
        >
        <span v-if="openIssues > 0"
          >{{ openIssues }} {{ t("common.open") }}</span
        >
      </div>

      <div v-if="features.length > 0" class="space-y-1">
        <RdBaseFeatureItem
          v-for="(feature, index) in features"
          :key="index"
          :icon="feature.icon"
          :text="feature.text"
        />
      </div>
      <slot></slot>
    </UiCardCardContent>
    <UiCardCardFooter class="flex justify-between items-center mt-auto">
      <UiBadgeBadge :variant="statusVariants[status].variant">
        {{ t(statusVariants[status].textKey) }}
      </UiBadgeBadge>
      <div v-if="lastUpdated" class="text-xs text-muted-foreground">
        {{ formatLastUpdated(lastUpdated) }}
      </div>
      <slot name="footer"></slot>
    </UiCardCardFooter>
  </UiCardCard>
</template>
