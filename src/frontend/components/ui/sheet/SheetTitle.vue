<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { DialogTitle, type DialogTitleProps } from "reka-ui";

interface Props extends DialogTitleProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
  <DialogTitle
    :as="props.as"
    :as-child="props.asChild"
    :class="
      cn('text-lg font-semibold leading-none tracking-tight', props.class)
    "
  >
    <slot />
  </DialogTitle>
</template>
