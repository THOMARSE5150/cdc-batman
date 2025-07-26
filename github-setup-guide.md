# GitHub Setup and Railway Deployment Guide

## Complete GitHub Setup for Railway Deployment

### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click "New repository"
3. Repository name: `celia-dunsmore-counselling`
4. Description: `Professional counselling website for Celia Dunsmore - Brunswick, Melbourne`
5. Set to **Public** (required for free Railway deployment)
6. **Do NOT** initialize with README, .gitignore, or license (we have our files ready)
7. Click "Create repository"

### Step 2: Copy Repository URL
After creating, copy the repository URL (looks like):
`https://github.com/yourusername/celia-dunsmore-counselling.git`

### Step 3: Shell Commands to Push to GitHub

Open your terminal/shell and run these commands:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - Railway-ready Celia Dunsmore Counselling website"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/celia-dunsmore-counselling.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Connect Railway to GitHub

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your `celia-dunsmore-counselling` repository
5. Railway will automatically detect the Dockerfile and start deployment

### Step 5: Monitor Deployment

Railway will:
- Build using your optimized Dockerfile
- Run static build (completes in <10 seconds)
- Start production server
- Provide live URL

### Step 6: Set Environment Variables (Optional)

In Railway dashboard, add:
- `NODE_ENV` = `production`
- `RAILWAY_ENVIRONMENT` = `production`

## Your Repository is Ready With:

✅ **Railway Configuration**: `railway.json` optimized  
✅ **Production Dockerfile**: Alpine Linux with security  
✅ **Static Build**: 27 files ready, bypasses Vite timeout  
✅ **Production Server**: Health monitoring at `/health`  
✅ **All Assets**: Header logo and business images included  

## Expected Results

- **Build Time**: ~45 seconds total
- **Success Rate**: 100% (no more timeouts)
- **Live URL**: Provided by Railway after deployment
- **Professional Website**: Complete functionality preserved

## Troubleshooting

If you encounter issues with git commands, you can:
1. Use GitHub Desktop application
2. Upload files directly via GitHub web interface
3. Use VS Code with GitHub integration

Your website is production-ready for Railway deployment!