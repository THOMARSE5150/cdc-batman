#!/usr/bin/env node

/**
 * Railway Production Build Script
 * Bypasses problematic prebuild and creates optimized production build
 */

import { execSync } from 'child_process';
import { copyFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

console.log('🚀 Starting Railway production build...');

// Step 1: Clean previous builds
console.log('🧹 Cleaning previous builds...');
execSync('rm -rf dist', { stdio: 'inherit' });

// Step 2: Create output directory
console.log('📁 Creating output directory...');
mkdirSync('dist/public', { recursive: true });
mkdirSync('dist/public/images', { recursive: true });

// Step 3: Copy images first
console.log('📸 Copying images...');
if (existsSync('public/images')) {
  const images = readdirSync('public/images');
  images.forEach(image => {
    copyFileSync(
      join('public/images', image),
      join('dist/public/images', image)
    );
  });
  console.log(`✅ Copied ${images.length} images`);
}

// Step 4: Run Vite build with production optimization
console.log('🔨 Running Vite production build...');
try {
  execSync('NODE_ENV=production npx vite build --outDir dist/public --mode production', {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'production'
    }
  });
  
  console.log('✅ Production build completed successfully!');
  
  // Step 5: Verify build output
  console.log('🔍 Verifying build output...');
  const indexExists = existsSync('dist/public/index.html');
  const assetsExists = existsSync('dist/public/assets');
  const imagesExists = existsSync('dist/public/images');
  
  console.log(`Index.html: ${indexExists ? '✅' : '❌'}`);
  console.log(`Assets: ${assetsExists ? '✅' : '❌'}`);
  console.log(`Images: ${imagesExists ? '✅' : '❌'}`);
  
  if (indexExists && assetsExists) {
    console.log('🎉 Railway build ready for deployment!');
    process.exit(0);
  } else {
    console.error('❌ Build verification failed');
    process.exit(1);
  }
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}