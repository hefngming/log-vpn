// vite.config.js 或 vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  base: './',  // 重要：Electron 需要相对路径
  build: {
    outDir: 'dist',  // 或你的 dist
    rollupOptions: {
      // 如果 index.html 在根目录，就这样写：
      input: resolve(__dirname, 'index.html'),
      // 如果 index.html 在 src/renderer/ 下（常见结构）：
      // input: resolve(__dirname, 'src/renderer/index.html'),
    }
  }
})
