<script setup lang="ts">
export type InvolvementCardProps = {
  title: string;
  description: string;
  features: string[];
  actions: Array<{
    text: string;
    href: string;
    variant?: "default" | "secondary" | "outline";
  }>;
  class?: string;
};

withDefaults(defineProps<InvolvementCardProps>(), {});
</script>

<template>
  <div class="space-y-4" :class="$props.class">
    <h3 class="text-xl font-semibold">{{ title }}</h3>
    <div class="space-y-3">
      <p>{{ description }}</p>
      <RdBaseFeatureList :features="features" />
    </div>
    <div class="flex gap-3 flex-wrap">
      <RdBaseLink
        v-for="(action, index) in actions"
        :key="index"
        :href="action.href"
        variant="button"
        icon="arrow-up-right"
        class="inline-flex"
      >
        {{ action.text }}
      </RdBaseLink>
    </div>
  </div>
</template>
