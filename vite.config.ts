import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@frontend': resolve(__dirname, './src/frontend'),
      '@backend': resolve(__dirname, './src/backend'),
      '@shared': resolve(__dirname, './src/shared')
    }
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    beastiesOptions: {
      preload: 'media',
      pruneSource: true
    }
  }
})
