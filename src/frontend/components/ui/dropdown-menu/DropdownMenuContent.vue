<script setup lang="ts">
import { cn } from "@/lib/utils";
import {
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuContentProps,
} from "reka-ui";
import { computed, type HTMLAttributes } from "vue";

interface Props extends DropdownMenuContentProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();

const delegatedProps = computed(() => {
  const { class: _c, ...delegated } = props;
  return delegated;
});
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuContent
      v-bind="delegatedProps"
      :class="
        cn(
          'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
          'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          props.class,
        )
      "
    >
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>
