<script setup lang="ts">
export type SectionProps = {
  id?: string;
  spacing?: "sm" | "md" | "lg";
  withSeparator?: boolean;
  separatorBefore?: boolean;
  separatorAfter?: boolean;
  class?: string;
};

withDefaults(defineProps<SectionProps>(), {
  spacing: "lg",
  withSeparator: false,
  separatorBefore: false,
  separatorAfter: false,
});
</script>

<template>
  <div>
    <UiSeparatorSeparator
      v-if="separatorBefore || withSeparator"
      class="my-12"
    />
    <section
      :id="id"
      class="scroll-mt-16"
      :class="[
        {
          'space-y-4': spacing === 'sm',
          'space-y-8': spacing === 'md',
          'space-y-8': spacing === 'lg', // Default
        },
        $props.class,
      ]"
    >
      <slot></slot>
    </section>
    <UiSeparatorSeparator
      v-if="separatorAfter || withSeparator"
      class="my-12"
    />
  </div>
</template>
