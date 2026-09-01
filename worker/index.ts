import { BASE_PATH } from '../base-path'

interface Env {
  ASSETS: Fetcher
}

/**
 * dist 的目錄結構已對應網址路徑，靜態資產命中時由資產伺服器直接回應，不會進到這裡。
 * 只有查無資產時才會叫起這支 Worker，交回 SPA 入口讓前端決定畫面。
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    // route 結尾的萬用字元會多吃到同前綴的其他路徑，那些不屬於本站
    if (url.pathname !== BASE_PATH && !url.pathname.startsWith(`${BASE_PATH}/`)) {
      return new Response('Not Found', { status: 404 })
    }

    url.pathname = `${BASE_PATH}/index.html`
    return env.ASSETS.fetch(url)
  },
} satisfies ExportedHandler<Env>
