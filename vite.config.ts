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

