<template>
  <div class="about">
    <h1>About Rollercoaster.dev</h1>
    <p>
      Rollercoaster.dev is an Open Badges platform that allows organizations to create, issue, and verify digital badges.
    </p>
    <h2>What are Open Badges?</h2>
    <p>
      Open Badges are digital credentials that represent skills, achievements, or certifications.
      They are portable, verifiable, and can be shared across the web.
    </p>
    <h2>Our Technology Stack</h2>
    <ul>
      <li><strong>Frontend:</strong> Vue 3, TypeScript, Vite, vite-ssg</li>
      <li><strong>Backend:</strong> Bun, Elysia</li>
      <li><strong>Database:</strong> PostgreSQL</li>
      <li><strong>Component Development:</strong> Histoire</li>
    </ul>
  </div>
</template>

<script setup>
// Notice we don't need to import useHead anymore - it's auto-imported
useHead({
  title: 'About - Rollercoaster.dev',
  meta: [
    {
      name: 'description',
      content: 'Learn about Rollercoaster.dev - An Open Badges platform',
    },
  ],
})
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}

h2 {
  font-size: 1.8em;
  margin: 30px 0 15px;
  color: #42b983;
}

p {
  line-height: 1.6;
  margin-bottom: 20px;
}

ul {
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 20px;
}

li {
  margin-bottom: 10px;
  line-height: 1.6;
}
</style>
