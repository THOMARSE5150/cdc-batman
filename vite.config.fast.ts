import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Ultra-fast build configuration for deployment
export default defineConfig({
  plugins: [
    react({
      // Simplified React configuration for speed
      fastRefresh: false, // Disable in production
      jsxImportSource: 'react'
    })
  ],
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
    minify: "esbuild", // Fastest minifier
    sourcemap: false, // Disable source maps for speed
    target: "esnext", // Modern browsers only for smaller bundle
    reportCompressedSize: false, // Skip compression analysis for speed
    rollupOptions: {
      output: {
        // Aggressive code splitting for faster builds
        manualChunks: {
          // Vendor chunk
          vendor: ['react', 'react-dom'],
          // UI library chunk
          radix: [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast'
          ],
          // Icon chunk
          icons: ['lucide-react', 'react-icons'],
          // Form chunk
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
          // Router chunk
          router: ['wouter'],
          // Animation chunk
          animation: ['framer-motion']
        },
        // Optimize chunk names for faster loading
        chunkFileNames: 'js/[name]-[hash:8].js',
        entryFileNames: 'js/[name]-[hash:8].js',
        assetFileNames: 'assets/[name]-[hash:8].[ext]'
      },
      // Optimize external dependencies
      external: (id) => {
        // Don't bundle node modules that are too large
        return false;
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Use faster build tools
    cssMinify: "esbuild"
  },
  // Optimize dev dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'wouter',
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu'
    ],
    // Force bundling for consistency
    force: true
  },
  // Performance optimizations
  esbuild: {
    // Remove debug info for faster builds
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    // Optimize for size and speed
    treeShaking: true,
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true
  }
});