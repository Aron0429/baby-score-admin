/*
 * @Description:
 * @Author: HuGang
 * @Date: 2025-11-25 15:51:23
 * @LastEditTime: 2025-11-25 15:55:05
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      // 起个别名，在引用资源时，可以用‘@/资源路径’直接访问
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3002, // 将端口改为 3001
  },
})
