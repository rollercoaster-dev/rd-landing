<script setup lang="ts">
import { cn } from "@/lib/utils";
import { DropdownMenuItem, type DropdownMenuItemProps } from "reka-ui";
import { computed, type HTMLAttributes } from "vue";

interface Props extends DropdownMenuItemProps {
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {});

const delegatedProps = computed(() => {
  const { class: _c, ...delegated } = props;
  return delegated;
});
</script>

<template>
  <DropdownMenuItem
    v-bind="delegatedProps"
    :class="
      cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
        'focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        props.class,
      )
    "
  >
    <slot />
  </DropdownMenuItem>
</template>
