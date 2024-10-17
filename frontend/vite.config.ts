import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
});
