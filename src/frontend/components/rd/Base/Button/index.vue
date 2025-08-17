<script setup lang="ts">
import { computed } from "vue";
import { Button as UIButton } from "@/frontend/components/ui/button";

export type ButtonProps = {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "link"
    | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  icon?: "arrow-right" | "arrow-down" | "none";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: "primary",
  size: "default",
  icon: "none",
  disabled: false,
  type: "button",
});

// Map our simplified variants to shadcn variants
const buttonVariant = computed(() => {
  switch (props.variant) {
    case "primary":
      return "default";
    default:
      return props.variant;
  }
});

const emit = defineEmits(["click"]);

const handleClick = (event: MouseEvent) => {
  emit("click", event);
};
</script>

<template>
  <UIButton
    :variant="buttonVariant"
    :size="size"
    :disabled="disabled"
    :type="type"
    class="inline-flex items-center gap-2"
    @click="handleClick"
  >
    <slot></slot>
    <span v-if="icon !== 'none'" class="text-lg">
      {{ icon === "arrow-right" ? "→" : "↓" }}
    </span>
  </UIButton>
</template>
