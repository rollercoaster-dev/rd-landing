<script setup lang="ts">
export type FeatureListProps = {
  features: string[];
  checkmarkColor?: string;
  class?: string;
};

withDefaults(defineProps<FeatureListProps>(), {
  checkmarkColor: "text-green-500",
});
</script>

<template>
  <ul class="space-y-2" :class="$props.class">
    <li
      v-for="(feature, index) in features"
      :key="index"
      class="flex items-center gap-2"
    >
      <span :class="checkmarkColor">✓</span>
      <span>{{ feature }}</span>
    </li>
  </ul>
</template>
