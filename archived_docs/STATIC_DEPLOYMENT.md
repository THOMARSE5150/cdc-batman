# Static Deployment Guide for Celia Dunsmore Counselling

This document provides step-by-step instructions for deploying your website as a static site to fix the "Not Found" error and ensure it works correctly.

## Quick Fix for Deployment Issues

If you're seeing a "Not Found" error on your deployed site, follow these steps:

### Option 1: Deploy via Replit UI (Recommended)

1. In the Replit UI, click on the **Deployment** tab at the top of your screen
2. Make sure deployment is set to "Static"
3. Click "Deploy" or "Redeploy" 
4. Once deployment completes, click "View deployment" to verify it works

### Option 2: Manual Deployment Process

If the above doesn't work, follow these manual steps:

1. Run our custom build script to generate optimized static files:
   ```bash
   ./build-static.sh
   ```

2. Verify the build was successful - you should see files in the `dist/public` directory
   ```bash
   ls -la dist/public
   ```

3. From the Replit UI, click on the **Deployment** tab at the top
4. Click "Deploy" or "Redeploy"
5. Once deployment completes, click "View deployment" to verify it works

## How the Static Site Works

Your website has been modified to automatically detect when it's in a static environment:

- It shows a banner indicating static mode (so users know certain features might be limited)
- The contact form works using SendGrid's email service (doesn't require a backend server)
- The booking form sends email notifications instead of writing to a database

## Troubleshooting

If you still see deployment issues:

1. **Clear browser cache**: Try visiting your site in an incognito/private window
2. **Check URLs**: Make sure you're using the correct deployment URL
3. **Verify routing**: Static sites may have routing issues - ensure all links work properly

## Testing Static Features

You can test static features on your development site by adding `?static=true` to any URL:
```
https://your-replit-site.replit.app/?static=true
```

## Need More Help?

If you're still having issues with deployment:

1. Try a different static hosting provider like Netlify or Vercel (both offer free tiers)
2. Consider using a subdomain of your main domain for the static version
3. Reach out to Replit support if the issues persist

Remember that for most visitors, the static version will be fully functional for browsing content, submitting the contact form, and requesting bookings.