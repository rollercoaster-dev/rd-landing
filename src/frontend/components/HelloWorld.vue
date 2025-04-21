<template>
  <div class="hello-world">
    <h1>{{ greeting }}</h1>
    <button @click="incrementCount">Count: {{ count }}</button>
  </div>
</template>

<script setup>
// Notice we don't need to import ref anymore - it's auto-imported
const props = defineProps({
  greeting: {
    type: String,
    required: true
  }
})

const count = ref(0)

const incrementCount = () => {
  count.value++
}
</script>

<style scoped>
.hello-world {
  padding: 20px;
  border-radius: 8px;
  background-color: #f5f5f5;
  margin: 20px 0;
}

h1 {
  color: #42b983;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

button:hover {
  background-color: #3aa876;
}
</style>
