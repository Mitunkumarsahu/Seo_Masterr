import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listen on 0.0.0.0
    port: 5173, // Optional, default is 5173
  },
  optimizeDeps: {
    include: ['@mui/material', '@mui/icons-material'],
  },
})
