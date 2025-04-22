<script setup lang="ts">
defineProps<{ title: string; description?: string; class?: string }>();
</script>

<template>
  <section
    class="space-y-4"
    :class="{
      'text-left': align === 'left',
      'text-center': align === 'center',
      'text-right': align === 'right',
    }"
  >
    <h2
      class="text-3xl font-semibold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
    >
      {{ title }}
    </h2>
    <p
      v-if="description"
      class="text-xl text-card-foreground/90 max-w-3xl mx-auto"
    >
      <slot name="description">{{ description }}</slot>
    </p>
    <slot></slot>
  </section>
</template>
