<script setup lang="ts">
export type CallToActionProps = {
  title: string;
  description: string;
  subtitle?: string;
  footerText?: string;
  class?: string;
};

withDefaults(defineProps<CallToActionProps>(), {});
</script>

<template>
  <section class="text-center space-y-8" :class="$props.class">
    <RdBaseSectionHeader :title="title" :description="description" />

    <p v-if="subtitle" class="text-lg max-w-3xl mx-auto text-foreground/90">
      {{ subtitle }}
    </p>

    <slot></slot>

    <p v-if="footerText" class="text-base text-muted-foreground italic">
      {{ footerText }}
    </p>
  </section>
</template>
