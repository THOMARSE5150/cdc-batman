#!/usr/bin/env node

/**
 * Pre-build script to ensure all required images are accessible
 * This runs before the static build to guarantee all assets are available
 */

import { existsSync, readdirSync, copyFileSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

console.log('🔍 Ensuring all required images are accessible...');

const requiredImages = [
  'header_logo.png',
  'footer_logo.png', 
  'logo.png',
  'aboriginal_flag.svg',
  'torres_strait_flag.png'
];

// Check if public/images exists
if (!existsSync('public/images')) {
  console.error('❌ public/images directory not found');
  process.exit(1);
}

// List all available images
const availableImages = readdirSync('public/images');
console.log(`📁 Found ${availableImages.length} images in public/images/`);

// Check each required image
let allFound = true;
requiredImages.forEach(img => {
  if (availableImages.includes(img)) {
    console.log(`✅ ${img} - Found`);
  } else {
    console.log(`❌ ${img} - Missing`);
    allFound = false;
  }
});

if (!allFound) {
  console.error('❌ Some required images are missing');
  process.exit(1);
}

// Ensure temp directory exists for Docker build
mkdirSync('temp-images', { recursive: true });

// Copy all images to temp directory (ensures they're accessible)
availableImages.forEach(img => {
  try {
    copyFileSync(
      join('public/images', img),
      join('temp-images', img)
    );
    console.log(`📋 Staged: ${img}`);
  } catch (error) {
    console.error(`❌ Failed to stage ${img}:`, error.message);
  }
});

// Create a manifest file
const manifest = {
  timestamp: new Date().toISOString(),
  images: availableImages,
  requiredImages: requiredImages,
  allRequiredFound: allFound
};

writeFileSync('temp-images/manifest.json', JSON.stringify(manifest, null, 2));

console.log(`✅ All ${availableImages.length} images staged successfully`);
console.log('🚀 Ready for static build process');