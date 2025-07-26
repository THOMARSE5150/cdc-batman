#!/bin/bash

# Deployment Verification Script
echo "🔍 Railway Deployment Verification"
echo "================================="

# Test 1: Static build process
echo "1. Testing static build process..."
rm -rf dist
node static-build.js

if [ $? -eq 0 ]; then
    echo "✅ Static build: PASSED"
else
    echo "❌ Static build: FAILED"
    exit 1
fi

# Test 2: Check required files
echo "2. Checking required files..."
files_to_check=(
    "dist/public/index.html"
    "dist/public/images/header_logo.png"
    "dist/public/favicon.ico"
    "dist/public/robots.txt"
    "dist/public/sitemap.xml"
)

for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file: EXISTS"
    else
        echo "❌ $file: MISSING"
        exit 1
    fi
done

# Test 3: Server startup test
echo "3. Testing server startup..."
timeout 5 node server.js > /tmp/server_test.log 2>&1 &
SERVER_PID=$!
sleep 2

if ps -p $SERVER_PID > /dev/null; then
    echo "✅ Server startup: PASSED"
    kill $SERVER_PID 2>/dev/null
else
    echo "❌ Server startup: FAILED"
    echo "Server logs:"
    cat /tmp/server_test.log
    exit 1
fi

# Test 4: Check build file sizes
echo "4. Checking build file sizes..."
index_size=$(stat -c%s "dist/public/index.html")
logo_size=$(stat -c%s "dist/public/images/header_logo.png")

if [ $index_size -gt 1000 ]; then
    echo "✅ index.html size: ${index_size} bytes (good)"
else
    echo "❌ index.html size: ${index_size} bytes (too small)"
    exit 1
fi

if [ $logo_size -gt 10000 ]; then
    echo "✅ header_logo.png size: ${logo_size} bytes (good)"
else
    echo "❌ header_logo.png size: ${logo_size} bytes (too small)"
    exit 1
fi

echo ""
echo "🎉 All verification tests PASSED!"
echo "✅ Railway deployment should work correctly"
echo ""
echo "📋 Deployment Summary:"
echo "  - Static files: $(ls dist/public/ | wc -l) files"
echo "  - Images: $(ls dist/public/images/ | wc -l) images"
echo "  - Total size: $(du -sh dist/public/ | cut -f1)"
echo ""
echo "🚀 Ready for Railway deployment!"