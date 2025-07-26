#!/usr/bin/env node
// CRITICAL: Railway-ready React build script

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🚀 RAILWAY DEPLOYMENT READY SCRIPT');
console.log('=================================\n');

try {
  // 1. Clean and prepare directories
  console.log('1. Preparing build directories...');
  execSync('rm -rf dist/', { stdio: 'inherit' });
  execSync('mkdir -p dist/public', { stdio: 'inherit' });
  console.log('   ✅ Directories prepared\n');

  // 2. Copy static assets first
  console.log('2. Copying static assets...');
  if (fs.existsSync('public/images')) {
    execSync('cp -r public/images dist/public/', { stdio: 'inherit' });
    console.log('   ✅ Images copied to dist/public/images/');
  }

  // 3. Build React application
  console.log('3. Building React application...');
  process.chdir('client');
  
  // Create a minimal vite config that works
  const minimalViteConfig = `
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../dist/public',
    emptyOutDir: false,
    rollupOptions: {
      input: 'index.html'
    }
  }
})`;
  
  fs.writeFileSync('vite.config.minimal.ts', minimalViteConfig);
  
  // Build with minimal config
  execSync('npx vite build --config vite.config.minimal.ts', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
  
  process.chdir('..');
  console.log('   ✅ React build completed\n');

  // 4. Verify build
  console.log('4. Verifying deployment package...');
  const distPath = 'dist/public';
  const indexPath = path.join(distPath, 'index.html');
  const assetsPath = path.join(distPath, 'assets');
  
  if (fs.existsSync(indexPath) && fs.existsSync(assetsPath)) {
    const indexSize = Math.round(fs.statSync(indexPath).size / 1024);
    const assetFiles = fs.readdirSync(assetsPath);
    
    console.log(`   ✅ index.html: ${indexSize}KB`);
    console.log(`   ✅ assets: ${assetFiles.length} files`);
    
    // Check for production build markers
    const indexContent = fs.readFileSync(indexPath, 'utf-8');
    const hasProductionScripts = indexContent.includes('/assets/index-') && !indexContent.includes('/@vite/client');
    
    if (hasProductionScripts) {
      console.log('   ✅ Production build verified\n');
      
      console.log('🎉 RAILWAY DEPLOYMENT PACKAGE READY!');
      console.log('===================================');
      console.log('Build location: dist/public/');
      console.log('Entry point: dist/public/index.html');
      console.log('Server command: NODE_ENV=production tsx server/index.ts');
      console.log('');
      console.log('Railway will:');
      console.log('1. Run this build script');
      console.log('2. Start production server');
      console.log('3. Serve your counselling website correctly');
      console.log('');
      console.log('🚀 Ready to push to GitHub and deploy!');
      
    } else {
      throw new Error('Production build verification failed');
    }
  } else {
    throw new Error('Build files not found');
  }

} catch (error) {
  console.error('\n❌ BUILD FAILED:', error.message);
  process.exit(1);
}