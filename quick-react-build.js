#!/usr/bin/env node

/**
 * Quick React Build - Fixes icons and builds with minimal processing
 */

import { execSync } from 'child_process';
import { existsSync, readdirSync, writeFileSync } from 'fs';
import { join } from 'path';

console.log('🚀 Quick React build with icon fixes...');

// Step 1: Check if icon fixes are already applied
const headerFile = 'client/src/components/layout/Header.tsx';
if (existsSync(headerFile)) {
  const content = readFileSync(headerFile, 'utf-8');
  if (content.includes('from "lucide-react"')) {
    console.log('❌ Lucide imports still present - running icon fix first...');
    execSync('node fix-icons-and-build.js', { stdio: 'inherit' });
  } else {
    console.log('✅ Icon fixes already applied, proceeding with build...');
    
    // Run build directly
    try {
      execSync('npm run build', { 
        stdio: 'inherit',
        env: { ...process.env, NODE_ENV: 'production' }
      });
      console.log('✅ React build completed!');
    } catch (error) {
      console.error('❌ Build failed:', error.message);
      process.exit(1);
    }
  }
}

// Verify the result
if (existsSync('dist/public')) {
  const files = readdirSync('dist/public');
  console.log(`🎉 Build successful: ${files.length} files created`);
  console.log('🚀 Your ACTUAL React application is ready for Railway!');
} else {
  console.error('❌ Build failed - no output');
  process.exit(1);
}