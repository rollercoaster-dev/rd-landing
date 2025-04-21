<template>
  <div class="py-10">
    <header>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold text-gray-900">
          About Rollercoaster.dev
        </h1>
        <p class="mt-4 text-lg text-gray-600">
          Rollercoaster.dev is an Open Badges platform that allows organizations
          to create, issue, and verify digital badges.
        </p>
      </div>
    </header>

    <div class="mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="prose prose-indigo max-w-none">
        <h2 class="text-2xl font-bold text-gray-900 mt-8">
          What are Open Badges?
        </h2>
        <p class="mt-4 text-gray-600">
          Open Badges are digital credentials that represent skills,
          achievements, or certifications. They are portable, verifiable, and
          can be shared across the web.
        </p>

        <h2 class="text-2xl font-bold text-gray-900 mt-8">
          Our Technology Stack
        </h2>
        <ul class="mt-4 space-y-2 list-disc pl-5 text-gray-600">
          <li>
            <span class="font-semibold">Frontend:</span> Vue 3, TypeScript,
            Vite, vite-ssg
          </li>
          <li><span class="font-semibold">Backend:</span> Bun, Elysia</li>
          <li><span class="font-semibold">Database:</span> PostgreSQL</li>
          <li>
            <span class="font-semibold">Component Development:</span> Histoire
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
// Notice we don't need to import useHead anymore - it's auto-imported
useHead({
  title: "About - Rollercoaster.dev",
  meta: [
    {
      name: "description",
      content: "Learn about Rollercoaster.dev - An Open Badges platform",
    },
  ],
});
</script>

<style scoped>
/* Styles are provided by Tailwind CSS */
</style>
