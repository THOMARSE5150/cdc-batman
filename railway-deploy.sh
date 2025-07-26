#!/bin/bash

# Railway Deployment Script
# This script ensures proper deployment with all assets

echo "🚀 Railway Deployment Script"
echo "=========================="

# Step 1: Clean build
echo "🧹 Cleaning previous builds..."
rm -rf dist

# Step 2: Build static assets
echo "📦 Building static assets..."
node static-build.js

# Step 3: Verify build
echo "🔍 Verifying build..."
if [ ! -f "dist/public/index.html" ]; then
    echo "❌ Build failed: index.html missing"
    exit 1
fi

if [ ! -f "dist/public/images/header_logo.png" ]; then
    echo "❌ Build failed: header_logo.png missing"
    exit 1
fi

echo "✅ Build verification passed"

# Step 4: List all files for debugging
echo "📁 Build contents:"
ls -la dist/public/
echo "📁 Images:"
ls -la dist/public/images/

# Step 5: Start server
echo "🚀 Starting server..."
exec node server.js