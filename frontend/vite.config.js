import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: ['seomasterr.com']
  },
  optimizeDeps: {
    include: ['@mui/material', '@mui/icons-material'],
  },
})
