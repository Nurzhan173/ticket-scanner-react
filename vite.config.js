import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ticket-scanner-react/',
  server: {
    host: true,
    port: 5173
  }
})
