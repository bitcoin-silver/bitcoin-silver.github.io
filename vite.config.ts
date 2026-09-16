import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    allowedHosts: [
      'fighters-wants-cheaper-carroll.trycloudflare.com',
      '.trycloudflare.com',
    ],
    proxy: {
      // Die Peers-API erlaubt CORS nur für https://bitcoinsilver.top —
      // localhost steht nicht auf der Allowlist. Ohne diesen Proxy ist die
      // Node-Karte nur in Produktion sichtbar und lokal nicht testbar.
      // Muss vor '/api' stehen: Vite prüft die Einträge der Reihe nach.
      '/peers-api': {
        target: 'https://bitcoinsilver.eu',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/peers-api/, '/api'),
      },
      '/api': {
        target: 'https://explorer.bitcoinsilver.top',
        changeOrigin: true,
        secure: false,
      },
      '/ext': {
        target: 'https://explorer.bitcoinsilver.top',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

