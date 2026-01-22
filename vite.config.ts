import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  base: './', // 这一行绝对不能少！
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }
});
