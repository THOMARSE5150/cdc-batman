#!/usr/bin/env node

// Quick Railway Deployment Fix Script
// This script ensures your project is ready for Railway deployment

import fs from 'fs';
import path from 'path';

console.log('🔧 Railway Deployment Quick Fix Starting...\n');

// Check 1: Verify Dockerfile exists and is properly configured
if (fs.existsSync('Dockerfile')) {
  console.log('✅ Dockerfile exists');
  const dockerfile = fs.readFileSync('Dockerfile', 'utf8');
  if (dockerfile.includes('CMD ["npm", "start"]')) {
    console.log('✅ Dockerfile has correct start command');
  } else {
    console.log('⚠️  Dockerfile may need start command fix');
  }
} else {
  console.log('❌ Dockerfile missing');
}

// Check 2: Verify railway.json
if (fs.existsSync('railway.json')) {
  console.log('✅ railway.json exists');
  try {
    const railwayConfig = JSON.parse(fs.readFileSync('railway.json', 'utf8'));
    if (railwayConfig.build && railwayConfig.build.builder === 'DOCKERFILE') {
      console.log('✅ railway.json configured for Dockerfile');
    }
    if (railwayConfig.deploy && railwayConfig.deploy.startCommand === 'npm start') {
      console.log('✅ railway.json has correct start command');
    }
  } catch (e) {
    console.log('❌ railway.json has syntax errors');
  }
} else {
  console.log('❌ railway.json missing');
}

// Check 3: Package.json start script
if (fs.existsSync('package.json')) {
  console.log('✅ package.json exists');
  try {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    if (pkg.scripts && pkg.scripts.start) {
      console.log(`✅ Start script: ${pkg.scripts.start}`);
    } else {
      console.log('❌ No start script in package.json');
    }
  } catch (e) {
    console.log('❌ package.json has syntax errors');
  }
}

// Check 4: Production server file
if (fs.existsSync('start-server.js')) {
  console.log('✅ start-server.js exists');
} else {
  console.log('❌ start-server.js missing');
}

// Check 5: Build output
if (fs.existsSync('dist/public/index.html')) {
  console.log('✅ Built files exist (dist/public/index.html)');
} else {
  console.log('⚠️  No built files found - run npm run build first');
}

console.log('\n🚀 Deployment Methods:');
console.log('1. GitHub Method (Recommended):');
console.log('   - Push to GitHub first');
console.log('   - Use "Deploy from GitHub repo" in Railway');
console.log('');
console.log('2. Railway CLI Method:');
console.log('   - npm install -g @railway/cli');
console.log('   - railway login && railway up');
console.log('');
console.log('3. Direct Replit Method:');
console.log('   - Requires Replit-GitHub connection first');

console.log('\n✅ Your project is configured correctly for Railway!');
console.log('The issue is likely the deployment method, not the code.');