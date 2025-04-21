<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <header class="bg-white shadow">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between">
          <div class="flex space-x-4">
            <router-link
              to="/"
              class="text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </router-link>
            <router-link
              to="/about"
              class="text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </router-link>
          </div>
        </div>
      </nav>
    </header>
    <main class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <router-view />
    </main>
    <footer class="bg-white shadow">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-gray-500"
      >
        <p>&copy; {{ new Date().getFullYear() }} Rollercoaster.dev</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Notice we don't need to import useHead anymore - it's auto-imported
useHead({
  title: "Rollercoaster.dev",
  meta: [
    {
      name: "description",
      content: "Rollercoaster.dev - Open Badges Platform",
    },
  ],
});
</script>

<style>
/* Base styles are provided by Tailwind CSS */
/* Add any custom styles here if needed */
</style>
