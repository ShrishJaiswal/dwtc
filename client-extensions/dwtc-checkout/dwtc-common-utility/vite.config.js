import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/o/dwtc-common-utility',
  build: {
    outDir: './vite-build',
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        /^(?!@clayui\/css)@clayui.*$/,
      ],
    },
  },
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
  ],
})
