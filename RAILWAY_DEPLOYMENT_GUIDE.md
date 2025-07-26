# Railway Deployment Guide - Celia Dunsmore Counselling

## Quick Deployment Steps

### 1. Connect to Railway
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select this repository

### 2. Environment Variables
Set these variables in Railway dashboard:

**Required:**
- `NODE_ENV=production`
- `DATABASE_URL` (your PostgreSQL connection string)

**Optional (for full functionality):**
- `SENDGRID_API_KEY` (for contact form emails)
- `GOOGLE_CLIENT_ID` (for calendar integration)
- `GOOGLE_CLIENT_SECRET` (for calendar integration)

### 3. Deploy
Railway will automatically:
- Build using the Dockerfile
- Run health checks on `/health`
- Start the server on the assigned port

## Deployment Configuration

### Files Configured:
- ✅ `Dockerfile` - Production-optimized container
- ✅ `railway.json` - Railway-specific configuration
- ✅ `nixpacks.toml` - Alternative build configuration
- ✅ `.railwayignore` - Excludes unnecessary files
- ✅ `start-server.js` - Production server with API routes

### Build Process:
1. **Install dependencies** with dev packages for build
2. **Build React app** to `dist/public/`
3. **Remove dev dependencies** for smaller image
4. **Start production server** serving static files + API

### Health Checks:
- **Endpoint:** `/health`
- **Timeout:** 60 seconds
- **Checks:** Static files existence, server status

### Static File Serving:
- **Path:** `dist/public/`
- **Caching:** 1 year for assets, no-cache for HTML
- **SPA Routing:** All routes serve `index.html`

## API Endpoints Available:

### Health & Status:
- `GET /health` - Health check for Railway
- `GET /api/status` - Service status

### Application APIs:
- `POST /api/contact` - Contact form submission
- `POST /api/bookings` - Booking requests

## Production Features:

### Performance:
- ✅ Compression enabled
- ✅ Static file caching
- ✅ Image optimization (WebP)
- ✅ Code splitting and minification

### Security:
- ✅ Non-root container user
- ✅ CORS protection
- ✅ Request validation with Zod

### Monitoring:
- ✅ Health checks every 30 seconds
- ✅ Restart on failure (max 3 retries)
- ✅ No application sleeping

## Testing Deployment:

### After deployment, verify:
1. **Homepage loads:** `https://your-app.railway.app/`
2. **Health check works:** `https://your-app.railway.app/health`
3. **Contact form submits:** Fill out contact form
4. **All pages accessible:** Navigate through all sections

### Expected responses:
- **Health check:** `{"status":"OK","timestamp":"...","staticFiles":true}`
- **Contact form:** Success message after submission
- **All routes:** Proper React app rendering

## Troubleshooting:

### Build Issues:
- Check Railway build logs for errors
- Ensure all dependencies are in `package.json`
- Verify build script runs locally: `npm run build`

### Runtime Issues:
- Visit `/health` to check static files
- Check Railway logs for server errors
- Verify environment variables are set

### Static Files Not Found:
- Verify `dist/public/index.html` exists after build
- Check file permissions in container
- Ensure proper paths in `start-server.js`

## Additional Notes:

- **Domain:** Railway provides a `.railway.app` domain automatically
- **SSL:** HTTPS enabled by default
- **Scaling:** Auto-scaling based on traffic
- **Logs:** Available in Railway dashboard
- **Restart:** Manual restart available in dashboard

Your professional counselling website is now ready for production deployment! 🚀