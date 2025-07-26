#!/bin/bash

# Railway Deployment Commands
echo "🚀 Deploying Celia Dunsmore Counselling to Railway"
echo "================================================="

# Step 1: Initialize Railway project
echo "Step 1: Initializing Railway project..."
railway login --check || {
    echo "Please complete Railway login first:"
    echo "railway login"
    echo "Then run this script again."
    exit 1
}

# Step 2: Create or link project
echo "Step 2: Creating Railway project..."
railway init

# Step 3: Set environment variables
echo "Step 3: Setting environment variables..."
railway variables set NODE_ENV=production
railway variables set RAILWAY_ENVIRONMENT=production

# Step 4: Deploy the application
echo "Step 4: Deploying application..."
railway up

echo "✅ Deployment complete!"
echo "🌐 Your website will be available at the Railway URL provided"
echo "🏥 Health check: https://your-domain.railway.app/health"