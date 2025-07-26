#!/usr/bin/env node
// Test script to verify production mode works correctly

import { spawn } from 'child_process';
import { fetch } from 'undici';

console.log('🧪 Testing Production Mode Configuration...\n');

// Test 1: Start server in production mode
console.log('Test 1: Starting server in production mode...');
const serverProcess = spawn('tsx', ['server/index.ts'], {
  env: {
    ...process.env,
    NODE_ENV: 'production',
    RAILWAY_ENVIRONMENT: 'production',
    PORT: '3005'
  },
  stdio: 'pipe'
});

let serverOutput = '';
serverProcess.stdout.on('data', (data) => {
  serverOutput += data.toString();
});

serverProcess.stderr.on('data', (data) => {
  serverOutput += data.toString();
});

// Wait for server to start
await new Promise(resolve => setTimeout(resolve, 3000));

console.log('Server startup output:');
console.log(serverOutput.split('\n').slice(-15).join('\n'));

// Test 2: Check health endpoint
console.log('\nTest 2: Checking health endpoint...');
try {
  const healthResponse = await fetch('http://localhost:3005/health');
  const healthData = await healthResponse.json();
  console.log('Health check response:', JSON.stringify(healthData, null, 2));
} catch (error) {
  console.log('Health check failed:', error.message);
}

// Test 3: Check if serving production HTML (with bundled assets)
console.log('\nTest 3: Checking if serving production React app...');
try {
  const homeResponse = await fetch('http://localhost:3005/');
  const homeHtml = await homeResponse.text();
  
  // Check for production indicators
  const hasViteClient = homeHtml.includes('/@vite/client');
  const hasBundledAssets = homeHtml.includes('src="/assets/index-');
  const hasLoadingScreen = homeHtml.includes('class="loading"');
  
  console.log('Production indicators:');
  console.log(`- Has Vite dev client: ${hasViteClient} ${hasViteClient ? '❌' : '✅'}`);
  console.log(`- Has bundled assets: ${hasBundledAssets} ${hasBundledAssets ? '✅' : '❌'}`);
  console.log(`- Has loading screen: ${hasLoadingScreen} ${hasLoadingScreen ? '✅' : '❌'}`);
  
  if (hasBundledAssets && !hasViteClient) {
    console.log('\n🎉 SUCCESS: Server is correctly serving production React app!');
  } else {
    console.log('\n❌ ISSUE: Server may still be in development mode');
  }
  
} catch (error) {
  console.log('Home page test failed:', error.message);
}

// Clean up
serverProcess.kill();
console.log('\n🧹 Test completed, server stopped.');