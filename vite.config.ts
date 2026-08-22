import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Client build (dist/). The SSR bundle for the prerender pass is built via
// CLI: vite build --ssr src/entry-server.tsx --outDir dist-ssr (see build script).
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})