import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.API_REAL_URL,
        changeOrigin: true,
        secure: false,
      },
    },
    cors: false,
  },
  preview: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.API_REAL_URL,
        changeOrigin: true,
        secure: false,
      },
    },
    cors: false,
  },

  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
      {
        find: '@shared',
        replacement: fileURLToPath(new URL('./src/shared', import.meta.url)),
      },
      {
        find: '@features',
        replacement: fileURLToPath(new URL('./src/features', import.meta.url)),
      },
    ],
  },
});
