# Railway Deployment Configuration Guide

## Step 1: Get Your Railway URL

After deploying to Railway, you'll receive a URL that looks like:
- `https://your-app-name.railway.app`
- Or a custom domain if you've configured one

## Step 2: Update Site Configuration

1. **Update the main configuration file:**
   ```typescript
   // In client/src/lib/config.ts
   export const siteConfig = {
     siteUrl: 'https://your-railway-app.railway.app', // Replace with your actual URL
     apiUrl: 'https://your-railway-app.railway.app/api',
     // ... rest of config
   };
   ```

2. **Update environment variables in Railway:**
   - Go to your Railway project dashboard
   - Navigate to Variables tab
   - Add these environment variables:
     ```
     PUBLIC_URL=https://your-railway-app.railway.app
     RAILWAY_PUBLIC_DOMAIN=your-railway-app.railway.app
     NODE_ENV=production
     ```

## Step 3: Update Structured Data (SEO)

Update the URL in your index.html file:
```html
<!-- In client/index.html -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Celia Dunsmore Counselling",
  "url": "https://your-railway-app.railway.app/", // Update this URL
  // ... rest of structured data
}
</script>
```

## Step 4: Update Google OAuth Redirect URI

1. **Go to Google Cloud Console:**
   - Visit https://console.cloud.google.com/
   - Navigate to APIs & Services > Credentials
   - Find your OAuth 2.0 Client ID

2. **Update Authorized Redirect URIs:**
   - Add: `https://your-railway-app.railway.app/api/google/oauth/callback`
   - Remove old Replit URLs if no longer needed

## Step 5: Test Your Deployment

1. **Test main pages:**
   - Homepage: `https://your-railway-app.railway.app/`
   - Services: `https://your-railway-app.railway.app/services`
   - Contact: `https://your-railway-app.railway.app/contact`

2. **Test API endpoints:**
   - Health check: `https://your-railway-app.railway.app/api/health`
   - Contact form: Submit a test contact form

3. **Test mobile responsiveness:**
   - Open on mobile device or use browser dev tools
   - Verify navigation works properly

## Step 6: Update Domain DNS (If Using Custom Domain)

If you're using a custom domain like `celiadunsmorecounselling.com.au`:

1. **In Railway:**
   - Go to Settings > Domains
   - Add your custom domain
   - Note the CNAME/A record values provided

2. **In your DNS provider:**
   - Add CNAME record pointing to Railway
   - Wait for DNS propagation (24-48 hours)

3. **Update all configurations:**
   - Replace Railway URL with your custom domain in all config files

## Current Configuration Files to Update:

1. `client/src/lib/config.ts` - Main site configuration
2. `client/index.html` - Structured data and meta tags
3. `server/services/googleCalendar.ts` - OAuth redirect URI
4. Railway environment variables

## Quick Checklist:

- [ ] Update siteUrl in config.ts
- [ ] Update apiUrl in config.ts  
- [ ] Update structured data URL in index.html
- [ ] Add PUBLIC_URL environment variable in Railway
- [ ] Update Google OAuth redirect URI
- [ ] Test all main pages
- [ ] Test contact form submission
- [ ] Test mobile navigation
- [ ] Verify API endpoints work

Your site will now point to Railway instead of Replit!