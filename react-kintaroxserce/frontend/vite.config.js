import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/download': 'http://localhost:5000',
      '/downloads': 'http://localhost:5000'
    }
  }
})