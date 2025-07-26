# Railway Environment Variables Setup

Based on Railway's guidance in your screenshot, you need to set up these environment variables in your Railway dashboard:

## Step 1: Set Environment Variables in Railway

Go to your Railway project → Variables tab and add:

### Required Variables:
1. **NODE_ENV**
   - Value: `production`

2. **RAILWAY_ENVIRONMENT** 
   - Value: `production`

3. **VITE_NEXT_PUBLIC_SITE_URL** (What Railway expects)
   - Value: `https://your-railway-app.railway.app`
   - Replace `your-railway-app` with your actual Railway app name

4. **VITE_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY** (What Railway detected)
   - Value: Your Google Maps API key
   - This is for the location maps on your website

### Optional but Recommended:
5. **VITE_RAILWAY_PUBLIC_DOMAIN**
   - Value: `your-railway-app.railway.app` (without https://)

## Step 2: Follow Railway's Generated Commands

Railway provided these exact commands in your screenshot:

```bash
git add .
git commit -m "feat: update environment variables for Next.js"
git push
```

## Step 3: What Happens After

1. **Automatic Deployment**: Railway will trigger a new deployment
2. **Environment Detection**: Your app will detect the Railway environment
3. **URL Configuration**: Site URLs will automatically use your Railway domain
4. **Google Maps**: Location maps will work with your API key

## Expected Results

- ✅ Site loads properly on Railway domain
- ✅ Google Maps show location information
- ✅ All API calls use correct Railway URL
- ✅ Health check responds correctly

## Verification

After deployment, check:
- Visit: `https://your-railway-app.railway.app/health`
- Test: Location pages with maps
- Confirm: No console errors about missing environment variables

This matches exactly what Railway's guidance system suggested in your screenshot!