import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      shared: path.resolve(__dirname, 'src/shared'),
      core: path.resolve(__dirname, 'src/core'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Здесь можно указать глобальные переменные или другие настройки
      },
    },
  },
  base: '/new3-images/',
});
