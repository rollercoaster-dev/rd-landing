<template>
  <div class="home">
    <h1>Welcome to Rollercoaster.dev</h1>
    <p>An Open Badges platform built with Vue 3, TypeScript, and Bun.</p>
    <HelloWorld greeting="Hello from Rollercoaster.dev!" />

    <!-- API Test Component -->
    <ApiTest />

    <div class="features">
      <div class="feature">
        <h2>Vue 3 + TypeScript</h2>
        <p>Enjoy the latest Vue features with full TypeScript support.</p>
      </div>
      <div class="feature">
        <h2>SSR & SSG</h2>
        <p>Server-side rendering and static site generation for optimal performance.</p>
      </div>
      <div class="feature">
        <h2>Bun + Elysia</h2>
        <p>Fast, type-safe backend powered by Bun and Elysia.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import HelloWorld from '../components/HelloWorld.vue'
import ApiTest from '../components/ApiTest.vue'

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
.home {
  padding: 20px;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}

.features {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 40px;
}

.feature {
  flex: 1;
  min-width: 250px;
  max-width: 350px;
  margin: 20px;
  padding: 20px;
  border-radius: 8px;
  background-color: #f5f5f5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.feature h2 {
  color: #42b983;
  margin-bottom: 10px;
}
</style>
