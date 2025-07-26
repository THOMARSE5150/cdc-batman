# Replit Static Deployment Guide

This guide will help you deploy your Celia Dunsmore Counselling website as a static site on Replit, ensuring proper routing and functionality.

## Step 1: Build the Static Files

Run the updated build script to generate optimized static files with all necessary routing configurations:

```bash
./build-static.sh
```

This will create a `dist/public` directory with all the static files needed for deployment.

## Step 2: Deploy via Replit UI

1. In the Replit UI, click on the **Deploy** button at the top right of your screen
2. Select **Static** as the deployment type (it should be one of the options)
3. In the deployment settings, make sure:
   - The "directory to deploy" is set to `dist/public`
   - Ensure "Always include routing.json" is checked if that option exists

4. Click "Deploy" or "Deploy Now"
5. Once deployment completes, click "View deployment" to verify it works

## Step 3: Verify Your Deployment

After deployment, check these things:

1. Visit the main homepage and ensure it loads correctly
2. Try navigating to a subpage directly (e.g., `/about` or `/services`)
3. Refresh the page while on a subpage to ensure routing works
4. Test the contact form functionality

## Static Mode Features

Your website has been configured to automatically detect when it's running in static mode:

- The site shows a subtle banner indicating static mode
- Contact forms use SendGrid's email service (no backend required)
- The booking form works through email notifications

## Troubleshooting

If you're seeing a "Not Found" error:

1. Make sure the `routing.json` file exists in the root of your repository
2. Verify that your static build completed successfully
3. Check that you selected "Static" as the deployment type
4. Try redeploying with the "Clear cache" option if available

## Domain Setup

When connecting your custom domain:

1. Set up the domain in Replit's domain settings
2. Point your domain's DNS to the provided Replit URL
3. Wait for DNS propagation (can take 24-48 hours)
4. Test your site on the custom domain, focusing on direct page access

## Need More Help?

If you continue to have issues with the static deployment:

1. Try the URL with `?static=true` appended to force static mode
2. Check the browser console for any specific errors
3. Reach out to Replit support if persistent issues occur