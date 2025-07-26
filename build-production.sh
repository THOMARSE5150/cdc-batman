#!/bin/bash
set -e

echo "🚀 Building Celia Dunsmore Counselling for Railway production..."

# Clean any existing build
rm -rf dist/

# Run the build process
echo "📦 Running React build..."
npm run build

# Copy files to correct location for production server
echo "📁 Copying build files to production location..."
mkdir -p dist/public
cp -r client/dist/public/* dist/public/

# Verify build
echo "🔍 Verifying build..."
if [ -f "dist/public/index.html" ]; then
    echo "✅ index.html found"
else
    echo "❌ index.html missing"
    exit 1
fi

if [ -d "dist/public/assets" ]; then
    echo "✅ assets directory found"
else
    echo "❌ assets directory missing"
    exit 1
fi

echo "✅ Railway production build ready!"
echo "📊 Build summary:"
ls -la dist/public/ | head -8