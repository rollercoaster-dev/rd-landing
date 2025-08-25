<script setup lang="ts">
import { DialogOverlay, type DialogOverlayProps, DialogPortal } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<
  DialogOverlayProps & { class?: HTMLAttributes["class"] }
>();
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      v-bind="props"
      :class="
        cn(
          'fixed inset-0 z-40 bg-black/50',
          'animate-in fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
          props.class,
        )
      "
    />
  </DialogPortal>
</template>
