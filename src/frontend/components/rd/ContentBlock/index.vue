<script setup lang="ts">
export type ContentBlockProps = {
  title: string;
  content: string;
  variant?: "default" | "accent" | "primary" | "secondary";
  class?: string;
};

withDefaults(defineProps<ContentBlockProps>(), {
  variant: "default",
});
</script>

<template>
  <UiCardCard
    class="overflow-hidden"
    :class="[
      {
        'bg-gradient-to-br from-accent/10 to-transparent': variant === 'accent',
        'bg-gradient-to-br from-primary/10 to-transparent':
          variant === 'primary',
        'bg-gradient-to-br from-secondary/10 to-transparent':
          variant === 'secondary',
      },
      $props.class,
    ]"
  >
    <UiCardCardHeader>
      <UiCardCardTitle class="text-xl font-medium text-primary">
        {{ title }}
      </UiCardCardTitle>
    </UiCardCardHeader>
    <UiCardCardContent class="space-y-4">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="text-card-foreground/90" v-html="content"></div>
      <slot></slot>
    </UiCardCardContent>
    <UiCardCardFooter v-if="$slots.footer">
      <slot name="footer"></slot>
    </UiCardCardFooter>
  </UiCardCard>
</template>
