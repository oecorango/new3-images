import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      shared: path.resolve(__dirname, 'src/shared'),
      core: path.resolve(__dirname, 'src/core'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  base: '/',
});
