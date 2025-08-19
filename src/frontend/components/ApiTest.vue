<template>
  <div class="bg-card shadow overflow-hidden rounded-lg p-6 text-foreground">
    <h2 class="text-xl font-semibold text-foreground mb-4">API Test</h2>
    <button
      :disabled="loading"
      class="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-ring transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
      @click="fetchApiData"
    >
      {{ loading ? "Loading..." : "Test API Connection" }}
    </button>

    <div
      v-if="error"
      class="mt-4 p-3 bg-destructive/10 border border-destructive text-destructive rounded"
    >
      <p>Error: {{ error }}</p>
    </div>

    <div v-if="apiData" class="mt-4">
      <h3 class="text-lg font-medium text-foreground mb-2">API Response:</h3>
      <pre
        class="bg-muted p-3 rounded overflow-x-auto text-sm text-muted-foreground"
      >
        JSON.stringify(apiData, null, 2)
      }}</pre
      >
    </div>
  </div>
</template>

<script setup>
// Notice we don't need to import ref anymore - it's auto-imported
const apiData = ref(null);
const loading = ref(false);
const error = ref("");

const fetchApiData = async () => {
  loading.value = true;
  error.value = "";

  try {
    const response = await fetch("http://localhost:3000/api/test");

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    apiData.value = await response.json();
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Unknown error";
    console.error("Error fetching API data:", err);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Styles are provided by Tailwind CSS */
</style>
