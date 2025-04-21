<template>
  <div class="test-component">
    <h2 class="text-lg font-medium">{{ title }}</h2>
    <p class="text-sm text-gray-600">{{ description }}</p>
    <button
      class="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      @click="onClick"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: "Test Component",
  },
  description: {
    type: String,
    default: "This is a test component to verify our setup.",
  },
  buttonText: {
    type: String,
    default: "Click me",
  },
});

const emit = defineEmits(["click"]);

const onClick = () => {
  emit("click");
};
</script>
