<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "vue";
import { DialogContent, type DialogContentProps, DialogPortal } from "reka-ui";

defineOptions({ inheritAttrs: false });

interface Props extends DialogContentProps {
  class?: HTMLAttributes["class"];
  side?: "top" | "right" | "bottom" | "left";
}

const props = withDefaults(defineProps<Props>(), {
  side: "right",
});

const sideClasses: Record<Required<Props>["side"], string> = {
  right:
    "right-0 top-0 h-full w-80 max-w-[90vw] border-l data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
  left: "left-0 top-0 h-full w-80 max-w-[90vw] border-r data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left",
  top: "top-0 left-0 w-full max-h-[90vh] border-b data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top",
  bottom:
    "bottom-0 left-0 w-full max-h-[90vh] border-t data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
};
</script>

<template>
  <DialogPortal>
    <slot name="overlay">
      <UiSheetSheetOverlay />
    </slot>
    <DialogContent
      v-bind="{ ...(props as any), ...($attrs as any) }"
      :class="
        cn(
          'fixed z-50 bg-background shadow-lg border flex flex-col',
          'animate-in data-[state=closed]:animate-out',
          sideClasses[props.side!],
          props.class,
        )
      "
    >
      <slot />
    </DialogContent>
  </DialogPortal>
</template>
