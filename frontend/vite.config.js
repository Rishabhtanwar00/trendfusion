import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{port:5173},
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.js", // Setup file for global test configurations
  },
})
