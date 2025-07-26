#!/bin/bash

# Railway Configuration Update Script
# Run this script after deploying to Railway to update all URL references

echo "🚀 Railway Configuration Update Script"
echo "======================================"

# Check if Railway URL is provided
if [ -z "$1" ]; then
    echo "❌ Error: Please provide your Railway URL"
    echo "Usage: ./update-for-railway.sh https://your-app-name.railway.app"
    echo ""
    echo "Example: ./update-for-railway.sh https://celia-counselling.railway.app"
    exit 1
fi

RAILWAY_URL="$1"
RAILWAY_DOMAIN=$(echo $RAILWAY_URL | sed 's|https://||')

echo "📝 Updating configuration for Railway URL: $RAILWAY_URL"
echo ""

# Update config.ts
echo "🔧 Updating client/src/lib/config.ts..."
sed -i "s|https://your-railway-app.railway.app|$RAILWAY_URL|g" client/src/lib/config.ts

# Update index.html structured data
echo "🔧 Updating client/index.html structured data..."
sed -i "s|https://your-railway-app.railway.app|$RAILWAY_URL|g" client/index.html

echo ""
echo "✅ Configuration files updated successfully!"
echo ""
echo "📋 Next steps to complete Railway deployment:"
echo ""
echo "1. 🌐 Set Railway environment variables:"
echo "   - PUBLIC_URL=$RAILWAY_URL"
echo "   - RAILWAY_PUBLIC_DOMAIN=$RAILWAY_DOMAIN"
echo "   - NODE_ENV=production"
echo ""
echo "2. 🔑 Update Google OAuth redirect URI:"
echo "   - Go to https://console.cloud.google.com/"
echo "   - Add redirect URI: $RAILWAY_URL/api/google/oauth/callback"
echo ""
echo "3. 🧪 Test your deployment:"
echo "   - Homepage: $RAILWAY_URL/"
echo "   - Services: $RAILWAY_URL/services"
echo "   - Contact: $RAILWAY_URL/contact"
echo "   - API Health: $RAILWAY_URL/api/health"
echo ""
echo "🎉 Your site will now point to Railway instead of Replit!"