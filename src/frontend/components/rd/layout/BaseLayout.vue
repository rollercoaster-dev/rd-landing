<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ title?: string; subtitle?: string }>();

const hasHeader = computed(() => !!props.title || !!props.subtitle);
</script>

<template>
  <div class="min-h-[calc(100vh-4rem)]">
    <section v-if="hasHeader" class="border-b bg-background/50">
      <div class="container mx-auto max-w-4xl px-4 py-10 space-y-2">
        <h1 v-if="title" class="text-4xl font-bold">{{ title }}</h1>
        <p v-if="subtitle" class="text-lg text-muted-foreground">
          {{ subtitle }}
        </p>
      </div>
    </section>

    <section class="container mx-auto max-w-4xl px-4 py-10">
      <slot />
    </section>
  </div>
</template>
