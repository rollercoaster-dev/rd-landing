<script setup lang="ts">
import { DropdownMenuTrigger, type DropdownMenuTriggerProps } from "reka-ui";
import { computed } from "vue";

const props = defineProps<DropdownMenuTriggerProps>();

const delegatedProps = computed(() => {
  return { ...props };
});
</script>

<template>
  <DropdownMenuTrigger v-bind="delegatedProps">
    <slot />
  </DropdownMenuTrigger>
</template>
