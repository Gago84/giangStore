// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/giangStore/',  // 👈 đây là tên repo của bạn
  plugins: [react()],
})
