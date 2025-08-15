<script setup lang="ts">
export type Principle = {
  title: string;
  description: string;
};

export type PrincipleGridProps = {
  title?: string;
  principles: Principle[];
  columns?: 1 | 2 | 3 | 4;
};

withDefaults(defineProps<PrincipleGridProps>(), {
  title: "Our Guiding Principles",
  columns: 3,
});
</script>

<template>
  <div class="space-y-6">
    <h3 v-if="title" class="text-2xl font-semibold text-center text-primary/90">
      {{ title }}
    </h3>
    <ul
      class="grid gap-6"
      :class="{
        'grid-cols-1': columns === 1,
        'grid-cols-1 md:grid-cols-2': columns === 2,
        'grid-cols-1 md:grid-cols-3': columns === 3,
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-4': columns === 4,
      }"
    >
      <li
        v-for="(principle, index) in principles"
        :key="index"
        class="bg-card p-6 rounded-lg shadow-sm border border-border/50"
      >
        <h4 class="font-semibold text-lg mb-2">{{ principle.title }}</h4>
        <p class="text-sm text-card-foreground/80">
          {{ principle.description }}
        </p>
      </li>
    </ul>
    <slot></slot>
  </div>
</template>
