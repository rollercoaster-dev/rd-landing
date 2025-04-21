<template>
  <div class="api-test">
    <h2>API Test</h2>
    <button @click="fetchApiData" :disabled="loading">
      {{ loading ? 'Loading...' : 'Test API Connection' }}
    </button>
    
    <div v-if="error" class="error">
      <p>Error: {{ error }}</p>
    </div>
    
    <div v-if="apiData" class="result">
      <h3>API Response:</h3>
      <pre>{{ JSON.stringify(apiData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const apiData = ref(null)
const loading = ref(false)
const error = ref('')

const fetchApiData = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await fetch('http://localhost:3000/api/test')
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    apiData.value = await response.json()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error'
    console.error('Error fetching API data:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.api-test {
  margin: 20px 0;
  padding: 20px;
  border-radius: 8px;
  background-color: #f5f5f5;
  text-align: left;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
}

button:hover:not(:disabled) {
  background-color: #3aa876;
}

button:disabled {
  background-color: #a0cfbe;
  cursor: not-allowed;
}

.error {
  color: #e74c3c;
  margin: 10px 0;
  padding: 10px;
  background-color: #fadbd8;
  border-radius: 4px;
}

.result {
  margin-top: 20px;
}

pre {
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  border: 1px solid #ddd;
}
</style>
