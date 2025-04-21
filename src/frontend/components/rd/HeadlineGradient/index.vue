<script setup lang="ts">
// No props needed anymore, content comes via slot
</script>

<template>
  <span
    class="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
  >
    <slot />
    <!-- Render content passed inside the component -->
  </span>
</template>

<style scoped>
/* Add specific styles if needed */
</style>
