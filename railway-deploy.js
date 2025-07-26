#!/usr/bin/env node

/**
 * RAILWAY DEPLOYMENT SCRIPT
 * Super-fast deployment specifically for Railway
 */

import { execSync } from 'child_process';

console.log('🚀 RAILWAY DEPLOYMENT STARTING...');

try {
  // Use the ultra-fast build we just created
  console.log('⚡ Running ultra-fast build for Railway...');
  execSync('node quick-deploy.js', { stdio: 'inherit' });
  
  console.log('✅ RAILWAY DEPLOYMENT READY!');
  console.log('📋 Next steps:');
  console.log('   1. Push to GitHub/Git repository');
  console.log('   2. Connect Railway to your repository');
  console.log('   3. Railway will auto-deploy using the dist/public folder');
  console.log('   4. Your site will be live in under 60 seconds total!');
  
} catch (error) {
  console.error('❌ Railway deployment failed:', error.message);
  process.exit(1);
}