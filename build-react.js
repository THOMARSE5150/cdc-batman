#!/usr/bin/env node

/**
 * Railway React Build Script
 * Properly builds the React application for production deployment
 */

import { execSync } from 'child_process';
import { existsSync, readdirSync, copyFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Building React application for Railway deployment...');

// Step 1: Clean previous builds
console.log('🧹 Cleaning previous builds...');
execSync('rm -rf dist', { stdio: 'inherit' });
mkdirSync('dist/public', { recursive: true });

// Step 2: Copy images before build
console.log('📸 Copying images to build directory...');
if (existsSync('public/images')) {
  mkdirSync('dist/public/images', { recursive: true });
  const images = readdirSync('public/images');
  images.forEach(image => {
    copyFileSync(
      join('public/images', image),
      join('dist/public/images', image)
    );
  });
  console.log(`✅ Copied ${images.length} images`);
}

// Step 3: Build React application using Vite
console.log('🔨 Building React application with Vite...');
try {
  // Run Vite build using the main configuration from root
  execSync('vite build', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'production'
    }
  });
  console.log('✅ React build completed successfully!');
} catch (error) {
  console.error('❌ Vite build failed:', error.message);
  process.exit(1);
}

// Step 4: Verify build output
console.log('🔍 Verifying build output...');
if (!existsSync('dist/public/index.html')) {
  console.error('❌ Build verification failed: index.html not found');
  process.exit(1);
}

const files = readdirSync('dist/public');
console.log(`✅ Build verification passed - ${files.length} files created`);
console.log('Files:', files.slice(0, 10).join(', ') + (files.length > 10 ? '...' : ''));

console.log('🎉 React application build completed successfully for Railway!');