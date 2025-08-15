<script setup lang="ts">
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
};

withDefaults(defineProps<StatusCardProps>(), {
  gradientFrom: "primary",
});

const statusVariants = {
  "in-progress": { text: "In Progress", variant: "secondary" as const },
  planned: { text: "Planned", variant: "outline" as const },
  completed: { text: "Completed", variant: "default" as const },
};
</script>

<template>
  <UiCardCard
    class="group overflow-hidden hover:shadow-lg transition-all relative before:absolute before:inset-0 before:-z-10"
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
      <UiCardCardTitle class="flex items-center gap-2">
        <span class="text-2xl">{{ icon }}</span>
        <span>{{ title }}</span>
      </UiCardCardTitle>
    </UiCardCardHeader>
    <UiCardCardContent class="space-y-2">
      <p class="text-sm text-card-foreground/90">
        {{ description }}
      </p>
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
    <UiCardCardFooter>
      <UiBadgeBadge :variant="statusVariants[status].variant">
        {{ statusVariants[status].text }}
      </UiBadgeBadge>
      <slot name="footer"></slot>
    </UiCardCardFooter>
  </UiCardCard>
</template>
