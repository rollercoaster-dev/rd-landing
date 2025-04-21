<template>
  <div class="bg-white shadow overflow-hidden rounded-lg p-6 text-center">
    <h1 class="text-2xl font-bold text-indigo-600 mb-4">{{ greeting }}</h1>
    <button
      class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
      @click="incrementCount"
    >
      Count: {{ count }}
    </button>
  </div>
</template>

<script setup>
// Notice we don't need to import ref anymore - it's auto-imported
defineProps({
  greeting: {
    type: String,
    required: true,
  },
});

const count = ref(0);

const incrementCount = () => {
  count.value++;
};
</script>

<style scoped>
/* Styles are provided by Tailwind CSS */
</style>
