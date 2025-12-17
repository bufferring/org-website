import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  preview: {
    port: 4173,
    host: true
  },
  server: {
    port: 3000,
    host: true,
    historyApiFallback: true
  }
})