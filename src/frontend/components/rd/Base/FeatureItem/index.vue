<script setup lang="ts">
export type FeatureItemProps = {
  text: string;
  icon?: string;
  iconColor?: string;
};

withDefaults(defineProps<FeatureItemProps>(), {
  icon: "✓",
  iconColor: "text-accent",
});
</script>

<template>
  <li class="flex items-center gap-2">
    <span :class="iconColor">{{ icon }}</span>
    <span>{{ text }}</span>
    <slot></slot>
  </li>
</template>
