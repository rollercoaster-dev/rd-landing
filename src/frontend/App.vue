<template>
  <div class="app">
    <header>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <p>&copy; {{ new Date().getFullYear() }} Rollercoaster.dev</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  title: 'Rollercoaster.dev',
  meta: [
    {
      name: 'description',
      content: 'Rollercoaster.dev - Open Badges Platform',
    },
  ],
})
</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 10px;
}

nav a.router-link-exact-active {
  color: #42b983;
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

footer {
  margin-top: 40px;
  padding: 20px;
  font-size: 0.8em;
  color: #666;
}
</style>
