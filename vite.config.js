import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base satırını sildik! 
  // Bunu package.json script'i ile yöneteceğiz.
  build: {
    sourcemap: true,
  }
})