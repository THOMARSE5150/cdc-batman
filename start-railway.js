#!/usr/bin/env node

// Railway startup script that ensures build and starts server
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🚀 Railway startup script initiated...');

const rootDir = process.cwd();
const distPublicPath = path.join(rootDir, 'dist', 'public');

console.log('Working directory:', rootDir);
console.log('Checking for static files at:', distPublicPath);

// Comprehensive static file verification and rebuild logic
console.log('📋 Static file verification process:');

// Check multiple possible locations
const checkPaths = [
  distPublicPath,
  path.join(rootDir, 'public'),
  '/app/dist/public'
];

let foundStaticFiles = false;
for (const checkPath of checkPaths) {
  console.log(`Checking path: ${checkPath}`);
  if (fs.existsSync(checkPath) && fs.existsSync(path.join(checkPath, 'index.html'))) {
    console.log(`✅ Static files found at: ${checkPath}`);
    foundStaticFiles = true;
    break;
  }
}

if (!foundStaticFiles) {
  console.log('📦 Static files missing, attempting rebuild...');
  
  // List current directory contents for debugging
  try {
    console.log('Current directory contents:', fs.readdirSync(rootDir));
    if (fs.existsSync(path.join(rootDir, 'dist'))) {
      console.log('dist directory contents:', fs.readdirSync(path.join(rootDir, 'dist')));
    }
  } catch (e) {
    console.log('Error listing directories:', e.message);
  }
  
  try {
    // Check if we have build tools available
    console.log('Checking for package.json...');
    if (fs.existsSync(path.join(rootDir, 'package.json'))) {
      console.log('package.json found, attempting build...');
      execSync('npm run build', { stdio: 'inherit', cwd: rootDir });
      console.log('✅ Frontend build completed');
    } else {
      console.log('❌ No package.json found, cannot rebuild');
    }
  } catch (error) {
    console.error('❌ Frontend build failed:', error.message);
    console.log('ℹ️  Continuing with server startup - static files may be served from alternative location');
  }
}

// Verify static files
if (fs.existsSync(distPublicPath) && fs.existsSync(path.join(distPublicPath, 'index.html'))) {
  const files = fs.readdirSync(distPublicPath);
  console.log(`✅ Static files ready (${files.length} files)`);
} else {
  console.log('⚠️  No static files found - will run in API-only mode');
}

// Start the server
console.log('🚀 Starting production server...');
import('./server.js');