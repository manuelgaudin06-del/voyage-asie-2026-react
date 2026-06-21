import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Sous-dossier GitHub Pages : https://<user>.github.io/voyage-asie-2026-react/
  base: '/voyage-asie-2026-react/',
  plugins: [react()],
})