import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Ultra-minimal build configuration - prioritizes speed over everything
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    minify: false, // Skip minification for speed
    sourcemap: false,
    reportCompressedSize: false,
    target: "esnext",
    rollupOptions: {
      output: {
        // Minimal chunking for faster builds
        manualChunks: {
          vendor: ['react', 'react-dom'],
          app: ['wouter']
        },
        chunkFileNames: '[name].js',
        entryFileNames: 'main.js',
        assetFileNames: '[name].[ext]'
      }
    },
    chunkSizeWarningLimit: 10000, // Suppress warnings
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'wouter'],
    force: true
  }
});