import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    deps: {
      inline: ['@vue'],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@frontend': resolve(__dirname, './src/frontend'),
      '@backend': resolve(__dirname, './src/backend'),
      '@shared': resolve(__dirname, './src/shared'),
    },
  },
});
