#!/bin/bash

# Script to properly upload all files to GitHub repository
# This handles the existing README conflict

echo "🚀 Uploading Celia Dunsmore Counselling Website to GitHub"
echo "=============================================="

# Remove existing git setup to start fresh
echo "📁 Cleaning up existing git configuration..."
rm -rf .git

# Initialize fresh git repository
echo "🔧 Initializing new git repository..."
git init

# Add all files (except those in .gitignore)
echo "📋 Adding all project files..."
git add .

# Create initial commit with all your project files
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Complete Celia Dunsmore Counselling Website

- Professional counselling website for Melbourne practice
- Mobile-optimized React frontend with TypeScript
- Express.js backend with health checks
- Railway deployment ready with Dockerfile
- SEO optimizations and performance enhancements
- Contact form with email integration
- Responsive design for all devices"

# Add your GitHub repository as remote (FORCE push to overwrite README)
echo "🔗 Connecting to GitHub repository..."
git remote add origin https://github.com/THOMARSE5150/cdc-replit-jarvis.git

# Force push to main branch (this will overwrite the README-only repo)
echo "🚀 Force pushing all files to GitHub..."
git branch -M main
git push -u origin main --force

echo ""
echo "✅ Upload complete!"
echo ""
echo "🌐 Your repository now contains:"
echo "   - Complete website source code"
echo "   - Railway deployment configuration"
echo "   - Production-ready Dockerfile"
echo "   - All assets and documentation"
echo ""
echo "🚀 Next step: Connect Railway to deploy your website!"