# Railway Environment Variables Setup

## Required Environment Variables in Railway Dashboard

To complete your Railway deployment, you need to set these environment variables in your Railway project dashboard:

### Go to Railway Dashboard > Your Project > Variables Tab

Add these variables:

1. **NODE_ENV**
   - Value: `production`

2. **RAILWAY_ENVIRONMENT** 
   - Value: `production`

3. **VITE_RAILWAY_PUBLIC_DOMAIN** (Frontend access)
   - Value: Your Railway domain (e.g., `your-app-name.railway.app`)
   - This allows the frontend React app to know its production URL

4. **PORT** 
   - This is automatically set by Railway, don't manually add it

## Optional Variables (if using external services)

If your app uses these services, also add:

- **GOOGLE_CLIENT_ID** - For Google OAuth
- **GOOGLE_CLIENT_SECRET** - For Google OAuth
- **SENDGRID_API_KEY** - For email functionality
- **STRIPE_SECRET_KEY** - For payment processing
- **DATABASE_URL** - If using external database

## After Setting Variables

1. Save the variables in Railway
2. Trigger a new deployment (push code or manually redeploy)
3. Your site should now work properly

## Health Check

Visit: `https://your-railway-app.railway.app/health`

Should return:
```json
{
  "status": "OK",
  "timestamp": "2025-07-19T...",
  "environment": "production",
  "staticFiles": {
    "indexExists": true,
    "assetsExists": true
  },
  "railway": true
}
```