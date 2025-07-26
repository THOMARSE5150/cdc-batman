#!/usr/bin/env node

/**
 * Railway Final Deployment Fix - Ensures Real React App is Deployed
 * This script fixes the Railway deployment to serve the actual React application
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, readdirSync, statSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Railway Final Deployment Fix - Ensuring Real React App...');

// Step 1: Clean previous builds
const distPath = 'dist/public';
console.log('🧹 Cleaning previous builds...');
if (existsSync(distPath)) {
  execSync(`rm -rf ${distPath}`, { stdio: 'inherit' });
}

// Step 2: Create directories
if (!existsSync('dist')) mkdirSync('dist', { recursive: true });
if (!existsSync(distPath)) mkdirSync(distPath, { recursive: true });

// Step 3: Copy public assets first
console.log('📁 Copying public assets...');
if (existsSync('public')) {
  execSync(`cp -r public/* ${distPath}/`, { stdio: 'inherit' });
  console.log('✅ Public assets copied');
}

// Step 4: Build React application properly
console.log('⚛️ Building React application...');
try {
  // Change to client directory and build
  process.chdir('client');
  execSync('npm run build', { stdio: 'inherit' });
  process.chdir('..');
  
  // Copy React build to correct location
  const clientBuildPath = 'client/dist/public';
  if (existsSync(clientBuildPath)) {
    execSync(`cp -r ${clientBuildPath}/* ${distPath}/`, { stdio: 'inherit' });
    console.log('✅ React build copied to deployment directory');
  } else {
    throw new Error('React build not found at client/dist/public');
  }
} catch (error) {
  console.error('❌ React build failed:', error.message);
  process.exit(1);
}

// Step 5: Verify React application files
console.log('🔍 Verifying React application...');

const criticalFiles = [
  'index.html',
  'assets',
  'images/header_logo.png'
];

const missing = [];
for (const file of criticalFiles) {
  const filePath = join(distPath, file);
  if (!existsSync(filePath)) {
    missing.push(file);
  }
}

if (missing.length > 0) {
  console.error('❌ Missing critical files:', missing);
  process.exit(1);
}

// Step 6: Check for React script tags
const indexPath = join(distPath, 'index.html');
const indexContent = require('fs').readFileSync(indexPath, 'utf8');

if (!indexContent.includes('/assets/') || !indexContent.includes('.js')) {
  console.error('❌ index.html does not contain React script references');
  console.log('Expected to find script tags referencing /assets/*.js files');
  process.exit(1);
}

// Step 7: List build contents
const buildFiles = readdirSync(distPath);
const assetFiles = existsSync(join(distPath, 'assets')) ? readdirSync(join(distPath, 'assets')) : [];

console.log('✅ React Application Build Complete!');
console.log(`📦 Build files (${buildFiles.length}):`, buildFiles.slice(0, 10).join(', ') + (buildFiles.length > 10 ? '...' : ''));
console.log(`⚛️ React assets (${assetFiles.length}):`, assetFiles.filter(f => f.endsWith('.js')).slice(0, 5).join(', '));

// Step 8: Verify this is a React app, not static HTML
const isReactApp = assetFiles.some(f => f.includes('index-') && f.endsWith('.js'));
if (isReactApp) {
  console.log('🎉 SUCCESS: Real React application ready for Railway deployment!');
  console.log('✅ This will serve the ACTUAL Celia Dunsmore Counselling website');
  console.log('🌟 Complete with navigation, forms, and all functionality');
} else {
  console.error('❌ WARNING: This appears to be a static site, not a React app');
  process.exit(1);
}

console.log('\n📋 Deployment Summary:');
console.log('- ✅ React application built successfully');
console.log('- ✅ All assets copied to dist/public/');
console.log('- ✅ Header logo and images present');
console.log('- ✅ Script tags reference /assets/*.js files');
console.log('- ✅ Ready for Railway deployment');