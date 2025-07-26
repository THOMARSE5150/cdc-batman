#!/usr/bin/env node
// Railway build script - ensures correct build process

import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 Building for Railway deployment...');

try {
  // Clean and prepare
  execSync('rm -rf dist/', { stdio: 'inherit' });
  execSync('mkdir -p dist/public', { stdio: 'inherit' });
  
  // Copy static assets
  if (fs.existsSync('public/images')) {
    execSync('cp -r public/images dist/public/', { stdio: 'inherit' });
    console.log('✅ Static assets copied');
  }
  
  // Build React app
  console.log('Building React application...');
  execSync('cd client && vite build --outDir ../dist/public', { stdio: 'inherit' });
  
  // Verify build
  if (fs.existsSync('dist/public/index.html') && fs.existsSync('dist/public/assets')) {
    console.log('✅ Build successful - Railway deployment ready!');
  } else {
    throw new Error('Build verification failed');
  }
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}