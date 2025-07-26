#!/bin/bash

# Exit on error
set -e

echo "Starting static deployment process..."

# 1. Run the static build script
echo "Building static files..."
./build-static.sh

# 2. Verify the build was successful
if [ ! -d "dist/public" ]; then
  echo "Error: Build directory 'dist/public' not found. Build may have failed."
  exit 1
fi

echo "Build successful! Static files are in dist/public."
echo
echo "To deploy this site:"
echo "1. Visit the Replit Deployment tab"
echo "2. Select 'Static' as the deployment type"
echo "3. Set the deploy directory to 'dist/public'"
echo "4. Click 'Deploy' or 'Deploy Now'"
echo 
echo "After deployment, test your site by visiting these pages:"
echo "- Homepage: https://your-site.replit.app/"
echo "- About page: https://your-site.replit.app/about"
echo "- Services: https://your-site.replit.app/services"
echo "- Contact: https://your-site.replit.app/contact"
echo
echo "This will ensure your routing is working correctly."