<script setup lang="ts">
export type GridProps = {
  cols?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  class?: string;
};

withDefaults(defineProps<GridProps>(), {
  cols: 2,
  gap: "md",
});
</script>

<template>
  <div
    class="grid"
    :class="[
      // Column classes
      {
        'grid-cols-1': cols === 1,
        'grid-cols-1 md:grid-cols-2': cols === 2,
        'grid-cols-1 md:grid-cols-3': cols === 3,
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-4': cols === 4,
      },
      // Gap classes
      {
        'gap-4': gap === 'sm',
        'gap-6': gap === 'md',
        'gap-8': gap === 'lg',
      },
      $props.class,
    ]"
  >
    <slot></slot>
  </div>
</template>
