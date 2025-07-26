#!/bin/bash
# Railway Build Script - Ensures successful deployment

set -e

echo "🚀 Building React app for Railway deployment..."

# 1. Clean previous builds
echo "1. Cleaning previous builds..."
rm -rf dist/
mkdir -p dist/public

# 2. Copy static assets first
echo "2. Copying static assets..."
cp -r public/images dist/public/ 2>/dev/null || true

# 3. Use the working build
echo "3. Using working React build..."
if [ -d "client/dist/public" ]; then
    echo "   ✅ Found existing build, copying..."
    cp -r client/dist/public/* dist/public/
else
    echo "   🔄 Building React app..."
    cd client
    npm run build
    cd ..
    cp -r client/dist/public/* dist/public/
fi

# 4. Verify build
echo "4. Verifying build..."
if [ -f "dist/public/index.html" ] && [ -d "dist/public/assets" ]; then
    echo "   ✅ Build successful!"
    echo "   📄 index.html: $(wc -c < dist/public/index.html) bytes"
    echo "   📁 Assets: $(ls dist/public/assets/ | wc -l) files"
    
    # Check for production scripts
    if grep -q 'src="/assets/index-.*\.js"' dist/public/index.html; then
        echo "   ✅ Production scripts detected"
    else
        echo "   ⚠️  Production scripts not found"
    fi
    
    echo ""
    echo "🎉 Railway deployment ready!"
    echo "Server will serve from: dist/public/"
    echo "Entry point: dist/public/index.html"
    
else
    echo "   ❌ Build verification failed"
    exit 1
fi