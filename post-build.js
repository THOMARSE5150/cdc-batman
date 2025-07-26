#!/usr/bin/env node

// Post-build script to ensure dist/public exists for Railway
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🔧 Post-build: Ensuring static files are available...');

const rootDir = process.cwd();
const distPublicPath = path.join(rootDir, 'dist', 'public');

console.log('Working directory:', rootDir);
console.log('Expected dist/public path:', distPublicPath);

// Check if dist/public exists
if (!fs.existsSync(distPublicPath)) {
  console.log('❌ dist/public not found, running build...');
  
  try {
    // Run the build process
    execSync('npm run build', { stdio: 'inherit' });
    
    // Verify it was created
    if (fs.existsSync(distPublicPath)) {
      console.log('✅ Build completed successfully');
    } else {
      console.error('❌ Build failed - dist/public still not found');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ dist/public already exists');
}

// Verify index.html exists
const indexPath = path.join(distPublicPath, 'index.html');
if (fs.existsSync(indexPath)) {
  console.log('✅ index.html found');
  
  // List some files for verification
  const files = fs.readdirSync(distPublicPath);
  console.log(`📁 Static files available (${files.length} total):`, files.slice(0, 8));
} else {
  console.error('❌ index.html not found in dist/public');
  process.exit(1);
}

console.log('✅ Post-build verification complete');