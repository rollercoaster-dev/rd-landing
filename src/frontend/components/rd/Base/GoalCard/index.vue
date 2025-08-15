<script setup lang="ts">
export type GoalCardProps = {
  title: string;
  description: string;
  class?: string;
};

withDefaults(defineProps<GoalCardProps>(), {});
</script>

<template>
  <UiCardCard :class="$props.class">
    <UiCardCardHeader>
      <UiCardCardTitle class="text-lg font-medium">
        {{ title }}
      </UiCardCardTitle>
    </UiCardCardHeader>
    <UiCardCardContent>
      <p class="text-card-foreground/90">{{ description }}</p>
    </UiCardCardContent>
  </UiCardCard>
</template>
