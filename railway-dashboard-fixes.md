# Railway Dashboard Configuration Guide

## What I Can Do For You

✅ **Updated your railway.json** - All settings are correctly configured in code
✅ **Fixed Dockerfile** - Uses static build instead of timeout-prone Vite build
✅ **Prepared deployment files** - Ready for immediate deployment

## What You Need to Do in Railway Dashboard

The Railway interface is showing "railway.json" instead of reading the actual values. Here's how to fix it:

### Step 1: Health Check Timeout Fix
1. Go to your Railway project settings
2. Scroll to **"Healthcheck Timeout"**
3. Clear the field showing "railway.json"
4. Type: `30`
5. Click outside the field to save

### Step 2: Verify Other Settings
Most settings should automatically read from railway.json, but verify these:

**Deploy Section:**
- Start Command: Should show `node start-server.js`
- If it shows "railway.json", change it to: `node start-server.js`

**Health Check:**
- Path: Should show `/health`
- If it shows "railway.json", change it to: `/health`

### Step 3: Environment Variables (if needed)
Go to **Variables** tab and ensure these exist:
- `NODE_ENV` = `production`
- `RAILWAY_ENVIRONMENT` = `production`

## Why Railway Shows "railway.json"

This happens when:
- Railway is configured to read from railway.json (correct)
- But the web interface doesn't display the actual values
- Manual override is needed for some fields

## Quick 2-Minute Fix

1. **Health Check Timeout**: Change from "railway.json" to `30`
2. **Start Command**: Ensure it shows `node start-server.js`
3. **Redeploy**: Push your fixed Dockerfile to trigger new deployment

That's it! Your railway.json file is already perfectly configured with Railway best practices.