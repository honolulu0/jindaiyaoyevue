import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // 保持原始文件夹结构
          const fileName = assetInfo.name
          // 移除开头的 'src/'（如果存在）
          const normalizedFileName = fileName.replace(/^src\//, '')
          return `assets/${normalizedFileName}`
        }
      }
    }
  },
  server: {
    port: 8080,
    host: '0.0.0.0',
    proxy: {
      '/api': 'http://47.120.12.122:8001/',
      '/park_api': {
        target: 'http://47.120.12.122:8002/',
        secure: false
      },
      '/jindai3admin': {
        target: 'https://jindai3admin.turbo-dev.cn/',
        changeOrigin: true,
        secure: true,
      },
      '/uploads': {
        target: 'https://jindai3admin.turbo-dev.cn/uploads',
        secure: false
      }
    }
  }
})
