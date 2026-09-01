import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import { BASE_PATH } from './base-path.ts'

export default defineConfig({
  base: `${BASE_PATH}/`,
  build: {
    // 輸出目錄刻意對應 BASE_PATH：Cloudflare 的資產伺服器以 dist 為根，
    // 磁碟結構與網址路徑一致時資產就能直接命中，不必每個請求都叫起 Worker 改寫路徑
    outDir: `dist${BASE_PATH}`,
    emptyOutDir: true,
  },
  plugins: [vue(), tailwindcss(), vueDevTools()],
})
