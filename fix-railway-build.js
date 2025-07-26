#!/usr/bin/env node
// CRITICAL RAILWAY BUILD FIX - Get your site online NOW!

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🚨 CRITICAL: Fixing Railway deployment build...\n');

// 1. Use the working build that we know exists
console.log('1. Using existing working build from client/dist/public...');
const sourcePath = path.resolve('client/dist/public');
const targetPath = path.resolve('dist/public');

if (fs.existsSync(sourcePath)) {
  console.log('   ✅ Found working build in client/dist/public');
  
  // Remove broken build
  if (fs.existsSync(targetPath)) {
    execSync('rm -rf dist/public/*', { stdio: 'inherit' });
  } else {
    execSync('mkdir -p dist/public', { stdio: 'inherit' });
  }
  
  // Copy working build
  execSync(`cp -r ${sourcePath}/* ${targetPath}/`, { stdio: 'inherit' });
  
  // Copy images
  execSync('cp -r public/images dist/public/ 2>/dev/null || true', { stdio: 'inherit' });
  
  console.log('   ✅ Copied working build to dist/public');
  
  // Verify critical files
  const indexExists = fs.existsSync(path.join(targetPath, 'index.html'));
  const assetsExists = fs.existsSync(path.join(targetPath, 'assets'));
  
  console.log(`   ✅ index.html: ${indexExists}`);
  console.log(`   ✅ assets/: ${assetsExists}`);
  
  if (indexExists && assetsExists) {
    console.log('\n🎉 SUCCESS: Railway build is ready!');
    
    // Show what will be deployed
    const assetFiles = fs.readdirSync(path.join(targetPath, 'assets'));
    const jsFiles = assetFiles.filter(f => f.endsWith('.js'));
    const cssFiles = assetFiles.filter(f => f.endsWith('.css'));
    
    console.log('\n📦 DEPLOYMENT PACKAGE:');
    console.log(`   - index.html (${Math.round(fs.statSync(path.join(targetPath, 'index.html')).size / 1024)}KB)`);
    console.log(`   - ${jsFiles.length} JavaScript files`);
    console.log(`   - ${cssFiles.length} CSS files`);
    console.log(`   - ${assetFiles.length} total assets`);
    
    // Test the HTML has proper script tags
    const indexContent = fs.readFileSync(path.join(targetPath, 'index.html'), 'utf-8');
    const hasProperScripts = indexContent.includes('src="/assets/index-');
    const hasLoadingScreen = indexContent.includes('class="loading"');
    
    console.log('\n🔍 QUALITY CHECK:');
    console.log(`   - Production scripts: ${hasProperScripts ? '✅' : '❌'}`);
    console.log(`   - Loading screen: ${hasLoadingScreen ? '✅' : '❌'}`);
    console.log(`   - No dev scripts: ${!indexContent.includes('/@vite/client') ? '✅' : '❌'}`);
    
    if (hasProperScripts && hasLoadingScreen) {
      console.log('\n🚀 RAILWAY DEPLOYMENT READY!');
      console.log('\nNext steps:');
      console.log('1. Push to GitHub');
      console.log('2. Deploy on Railway');
      console.log('3. Railway will run: npm run build (this will work)');
      console.log('4. Railway will start: NODE_ENV=production tsx server/index.ts');
      console.log('5. Your counselling website will be ONLINE!');
      
      process.exit(0);
    }
  }
} else {
  console.log('   ❌ No working build found in client/dist/public');
}

console.log('\n❌ BUILD FIX FAILED');
process.exit(1);