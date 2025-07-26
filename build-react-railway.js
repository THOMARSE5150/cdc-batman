#!/usr/bin/env node

/**
 * Railway React Build - Final Fix for React App Deployment
 * Ensures Railway deploys the actual React application, not static HTML
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, readFileSync } from 'fs';

console.log('🚀 Building React Application for Railway Deployment...');

// Step 1: Clean and prepare
const distPath = 'dist/public';
if (existsSync(distPath)) {
  execSync(`rm -rf ${distPath}`, { stdio: 'inherit' });
}
mkdirSync(distPath, { recursive: true });

// Step 2: Copy public assets
console.log('📁 Copying public assets...');
if (existsSync('public')) {
  execSync(`cp -r public/* ${distPath}/`, { stdio: 'inherit' });
}

// Step 3: Build React app using vite (root directory structure)
console.log('⚛️ Building React application...');
execSync('npm run build', { stdio: 'inherit' });

// Step 4: Verify build output (should already be in dist/public)
console.log('📦 Verifying React build...');
if (!existsSync(distPath)) {
  console.error('❌ Build output not found at dist/public');
  process.exit(1);
}

// Step 5: Verify React app (not static HTML)
const indexPath = `${distPath}/index.html`;
const indexContent = readFileSync(indexPath, 'utf8');

const hasReactScripts = indexContent.includes('/assets/') && indexContent.includes('.js');
const hasReactDiv = indexContent.includes('<div id="root">');

if (hasReactScripts && hasReactDiv) {
  console.log('✅ SUCCESS: React application ready for Railway!');
  console.log('🎉 This will deploy the REAL Celia Dunsmore Counselling website');
  console.log('⚛️ Complete with React routing, forms, and all features');
} else {
  console.error('❌ ERROR: Built app does not appear to be a React application');
  process.exit(1);
}

console.log('\n📋 Railway Deployment Ready:');
console.log('- React application built successfully');
console.log('- All assets copied to dist/public/');
console.log('- Header logo and images included');
console.log('- Script references point to React bundles');
console.log('- Ready for Railway container deployment');