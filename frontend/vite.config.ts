import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
          'motion': ['framer-motion'],
          'zustand': ['zustand'],
          'icons': ['lucide-react'],
        }
      }
    },
    // Enable minification
    minify: 'esbuild',
    // Generate source maps for debugging
    sourcemap: false, // false for production = smaller bundle
    // Chunk size warning at 500KB
    chunkSizeWarningLimit: 500,
  },
  // Enable dependency pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'zustand']
  }
})
