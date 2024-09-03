import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/rest": {
        target: "http://localhost:8080/store",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
