<script setup lang="ts">
// import { TooltipProvider } from '@/components/ui/tooltip';

// console.log('TooltipProvider loaded:', TooltipProvider);
console.log("App.vue is being loaded");
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <RdLayoutHeader />
    <main id="main">
      <RouterView />
    </main>
    <RdLayoutFooter />
  </div>
</template>

<style>
@import "~/styles/main.css";
</style>
