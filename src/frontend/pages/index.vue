<template>
  <div class="py-10">
    <header>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold text-gray-900 text-center">Welcome to Rollercoaster.dev</h1>
        <p class="mt-4 text-xl text-gray-600 text-center">An Open Badges platform built with Vue 3, TypeScript, and Bun.</p>
      </div>
    </header>

    <!-- Hello World Component -->
    <div class="mt-8 max-w-md mx-auto">
      <HelloWorld greeting="Hello from Rollercoaster.dev!" />
    </div>

    <!-- API Test Component -->
    <div class="mt-10 max-w-lg mx-auto">
      <ApiTest />
    </div>

    <div class="mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h2 class="text-lg font-medium text-gray-900">Vue 3 + TypeScript</h2>
            <p class="mt-2 text-sm text-gray-600">Enjoy the latest Vue features with full TypeScript support.</p>
          </div>
        </div>
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h2 class="text-lg font-medium text-gray-900">SSR & SSG</h2>
            <p class="mt-2 text-sm text-gray-600">Server-side rendering and static site generation for optimal performance.</p>
          </div>
        </div>
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h2 class="text-lg font-medium text-gray-900">Bun + Elysia</h2>
            <p class="mt-2 text-sm text-gray-600">Fast, type-safe backend powered by Bun and Elysia.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Notice we don't need to import components or useHead anymore - they're auto-imported
useHead({
  title: 'Home - Rollercoaster.dev',
  meta: [
    {
      name: 'description',
      content: 'Welcome to Rollercoaster.dev - An Open Badges platform',
    },
  ],
})
</script>

<style scoped>
/* Styles are provided by Tailwind CSS */
</style>
