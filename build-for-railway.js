#!/usr/bin/env node

// Railway-optimized build script
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Starting Railway-optimized build...');

try {
  // Clean previous builds
  console.log('🧹 Cleaning previous builds...');
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }
  
  // Run Vite build with timeout and production optimizations
  console.log('📦 Building client application...');
  execSync('NODE_ENV=production vite build --outDir dist/public', {
    stdio: 'inherit',
    timeout: 120000, // 2 minute timeout
    env: {
      ...process.env,
      NODE_ENV: 'production',
      VITE_BUILD_MODE: 'railway'
    }
  });
  
  // Verify build output
  const publicDir = path.join(process.cwd(), 'dist', 'public');
  if (!fs.existsSync(publicDir)) {
    throw new Error('Build failed: dist/public directory not created');
  }
  
  const files = fs.readdirSync(publicDir);
  console.log(`✅ Build successful! Generated ${files.length} files in dist/public/`);
  
  // Copy essential files for Railway
  console.log('📋 Copying Railway configuration...');
  
  // Create a simplified index.html check
  const indexPath = path.join(publicDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    throw new Error('Build failed: index.html not found in dist/public');
  }
  
  console.log('✅ Railway build complete and verified!');
  console.log('🌐 Ready for Railway deployment');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}