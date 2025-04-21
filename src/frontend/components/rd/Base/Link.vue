<script setup lang="ts">
import { computed } from "vue";

export type LinkProps = {
  href: string;
  internal?: boolean;
  variant?: "primary" | "secondary" | "text";
  icon?: "arrow-right" | "arrow-down" | "none";
};

const props = withDefaults(defineProps<LinkProps>(), {
  internal: false,
  variant: "primary",
  icon: "arrow-right",
});

// Determine if the link is internal based on the href or internal prop
const isInternalLink = computed(() => {
  if (props.internal) return true;
  return props.href.startsWith("/") || props.href.startsWith("#");
});

// Set appropriate attributes for external links
const target = computed(() => (isInternalLink.value ? undefined : "_blank"));
const rel = computed(() =>
  isInternalLink.value ? undefined : "noopener noreferrer",
);
</script>

<template>
  <a
    :href="href"
    :target="target"
    :rel="rel"
    class="inline-flex items-center gap-2 px-6 py-2 rounded-md transition-colors"
    :class="{
      'bg-primary text-primary-foreground hover:bg-primary/90':
        variant === 'primary',
      'border border-primary text-primary hover:bg-primary/10':
        variant === 'secondary',
      'text-primary hover:underline': variant === 'text',
    }"
  >
    <slot></slot>
    <span v-if="icon !== 'none'" class="text-lg">
      {{ icon === "arrow-right" ? "→" : "↓" }}
    </span>
  </a>
</template>

<style scoped></style>
