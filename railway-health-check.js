#!/usr/bin/env node

/**
 * Railway Health Check Script
 * Verifies deployment readiness and server health
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🏥 Railway Health Check - Verifying deployment readiness...');

const rootDir = process.cwd();
const distPublicPath = path.join(rootDir, 'dist', 'public');

// Health check function
function healthCheck() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    checks: {
      staticFiles: false,
      indexHtml: false,
      assets: false,
      permissions: false,
      server: false
    },
    details: {}
  };

  // Check 1: Static files directory
  if (fs.existsSync(distPublicPath)) {
    health.checks.staticFiles = true;
    health.details.staticFilesPath = distPublicPath;
  }

  // Check 2: Index.html exists
  const indexPath = path.join(distPublicPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    health.checks.indexHtml = true;
    const stats = fs.statSync(indexPath);
    health.details.indexSize = `${Math.round(stats.size / 1024)}KB`;
  }

  // Check 3: Assets directory
  const assetsPath = path.join(distPublicPath, 'assets');
  if (fs.existsSync(assetsPath)) {
    health.checks.assets = true;
    const assetFiles = fs.readdirSync(assetsPath);
    health.details.assetsCount = assetFiles.length;
  }

  // Check 4: File permissions
  try {
    const testFiles = fs.readdirSync(distPublicPath)
      .filter(file => file.endsWith('.png') || file.endsWith('.jpg'))
      .slice(0, 3);
    
    let permissionIssues = 0;
    testFiles.forEach(file => {
      const filePath = path.join(distPublicPath, file);
      const stats = fs.statSync(filePath);
      // Check if file is readable by others (permission ends with 4 or 6)
      if (!(stats.mode & 0o044)) {
        permissionIssues++;
      }
    });
    
    health.checks.permissions = permissionIssues === 0;
    health.details.permissionIssues = permissionIssues;
  } catch (error) {
    health.details.permissionError = error.message;
  }

  // Check 5: Server files
  const serverFiles = ['server.js', 'start-server.js'];
  let serverFilesFound = 0;
  serverFiles.forEach(file => {
    if (fs.existsSync(path.join(rootDir, file))) {
      serverFilesFound++;
    }
  });
  health.checks.server = serverFilesFound === 2;
  health.details.serverFilesFound = serverFilesFound;

  // Overall health status
  const allChecks = Object.values(health.checks);
  const passedChecks = allChecks.filter(check => check === true).length;
  const totalChecks = allChecks.length;
  
  if (passedChecks === totalChecks) {
    health.status = 'healthy';
    health.confidence = '100%';
  } else if (passedChecks >= totalChecks * 0.8) {
    health.status = 'warning';
    health.confidence = `${Math.round((passedChecks / totalChecks) * 100)}%`;
  } else {
    health.status = 'unhealthy';
    health.confidence = `${Math.round((passedChecks / totalChecks) * 100)}%`;
  }

  return health;
}

// Run health check
const health = healthCheck();

// Display results
console.log('\n🎯 Health Check Results:');
console.log(`Status: ${health.status.toUpperCase()}`);
console.log(`Confidence: ${health.confidence}`);
console.log(`Timestamp: ${health.timestamp}`);

console.log('\n📋 Detailed Checks:');
Object.entries(health.checks).forEach(([check, passed]) => {
  console.log(`  ${passed ? '✅' : '❌'} ${check}`);
});

if (health.details && Object.keys(health.details).length > 0) {
  console.log('\n📊 Details:');
  Object.entries(health.details).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
  });
}

// Exit with appropriate code
if (health.status === 'healthy') {
  console.log('\n🎉 Railway deployment is ready!');
  process.exit(0);
} else {
  console.log('\n⚠️  Railway deployment needs attention');
  process.exit(1);
}