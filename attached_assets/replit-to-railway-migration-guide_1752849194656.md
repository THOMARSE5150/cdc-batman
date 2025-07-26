# Replit to Railway Migration Guide

## Universal Migration Framework

This guide provides a comprehensive framework for migrating any web application from Replit to Railway hosting. While based on real-world experience with a React/Node.js application, it includes adaptable strategies for different technologies and architectures.

**Important**: Every website is unique. Use this guide as a foundation, but expect to adapt strategies based on your specific:
- Technology stack (React, Vue, Angular, vanilla JS, etc.)
- Backend framework (Express, Fastify, Next.js, etc.)
- Database requirements (PostgreSQL, MySQL, MongoDB, etc.)
- Build complexity and dependency chains
- Static asset requirements and structure

## Table of Contents

1. [Technology Stack Assessment](#technology-stack-assessment)
2. [Overview & Key Differences](#overview--key-differences)
3. [Pre-Migration Preparation](#pre-migration-preparation)
4. [Build System Challenges](#build-system-challenges)
5. [Docker vs Nixpacks](#docker-vs-nixpacks)
6. [File Path & Asset Management](#file-path--asset-management)
7. [Performance & Build Optimization](#performance--build-optimization)
8. [Production Configuration](#production-configuration)
9. [Debugging & Monitoring](#debugging--monitoring)
10. [Step-by-Step Migration Process](#step-by-step-migration-process)
11. [Common Issues & Solutions](#common-issues--solutions)
12. [Technology-Specific Adaptations](#technology-specific-adaptations)
13. [Railway-Specific Configuration](#railway-specific-configuration)

## Technology Stack Assessment

Before starting migration, conduct a comprehensive assessment of your specific application:

### 1. Frontend Framework Analysis

| Framework | Common Issues | Railway Compatibility | Migration Complexity |
|-----------|---------------|---------------------|---------------------|
| **React (SPA)** | Build timeouts, asset paths | ⭐⭐⭐⭐⭐ | Medium |
| **Next.js** | Static vs SSR deployment | ⭐⭐⭐⭐⭐ | Low-Medium |
| **Vue.js** | Build configuration | ⭐⭐⭐⭐⭐ | Medium |
| **Angular** | Complex build process | ⭐⭐⭐⭐ | Medium-High |
| **Svelte/SvelteKit** | Build outputs | ⭐⭐⭐⭐⭐ | Low-Medium |
| **Vanilla JS** | Asset management | ⭐⭐⭐⭐⭐ | Low |
| **Static Site** | File serving | ⭐⭐⭐⭐⭐ | Very Low |

### 2. Backend Framework Assessment

| Framework | Railway Support | Auto-Detection | Notes |
|-----------|----------------|----------------|-------|
| **Express.js** | ⭐⭐⭐⭐⭐ | Yes | Excellent compatibility |
| **Fastify** | ⭐⭐⭐⭐⭐ | Yes | Fast builds |
| **Koa.js** | ⭐⭐⭐⭐ | Yes | Standard Node.js patterns |
| **NestJS** | ⭐⭐⭐⭐ | Yes | May need build optimization |
| **Hapi.js** | ⭐⭐⭐⭐ | Yes | Standard patterns |
| **Django** | ⭐⭐⭐⭐⭐ | Yes | Python runtime |
| **Flask** | ⭐⭐⭐⭐⭐ | Yes | Lightweight Python |
| **Ruby on Rails** | ⭐⭐⭐⭐ | Yes | Ruby runtime |
| **Go** | ⭐⭐⭐⭐⭐ | Yes | Compiled binaries |
| **Rust** | ⭐⭐⭐⭐ | Yes | Compiled binaries |
| **PHP** | ⭐⭐⭐⭐ | Yes | Traditional hosting |

### 3. Database Requirements Matrix

| Database | Railway Native | Setup Complexity | Migration Notes |
|----------|----------------|------------------|-----------------|
| **PostgreSQL** | ✅ Native | Very Low | Automatic provisioning |
| **MySQL** | ✅ Native | Very Low | Automatic provisioning |
| **Redis** | ✅ Native | Very Low | Automatic provisioning |
| **MongoDB** | ❌ External | Medium | Use MongoDB Atlas |
| **SQLite** | ⚠️ Ephemeral | Low | File-based, no persistence |
| **Firebase** | ❌ External | Low | No changes needed |
| **Supabase** | ❌ External | Low | No changes needed |

### 4. Build Complexity Assessment

**Simple (Low Risk)**:
- Static HTML/CSS/JS sites
- Basic Node.js applications
- Python Flask apps with minimal dependencies
- Go/Rust compiled applications

**Medium (Moderate Risk)**:
- React/Vue single-page applications
- Next.js with SSG
- Node.js with moderate dependency chains
- Django applications

**Complex (High Risk)**:
- Large React apps with 50+ dependencies
- Applications using heavy UI libraries (Material-UI + Icons)
- Complex build pipelines with custom tooling
- Monorepos with multiple build targets

### 5. Asset Complexity Evaluation

**Low Complexity**:
- Few static assets (<10 files)
- Standard web assets (HTML, CSS, JS)
- Simple folder structure

**Medium Complexity**:
- Multiple asset types (images, fonts, videos)
- Organized folder structure
- Some dynamic asset generation

**High Complexity**:
- Large number of assets (50+ files)
- Complex folder structures
- Dynamic asset processing
- Multiple asset optimization pipelines

## Overview & Key Differences

### Replit vs Railway Architecture

| Aspect | Replit | Railway |
|--------|--------|---------|
| **Build System** | Native Node.js execution | Nixpacks or Docker containers |
| **File Paths** | Direct filesystem access | Container-based file resolution |
| **Static Assets** | Served directly from filesystem | Must be copied to container paths |
| **Environment** | Nix-based with direct execution | OCI containers with isolation |
| **Build Timeout** | Generous timeouts | 45-60 second production build limits |
| **Debugging** | Interactive shell access | Log-based debugging only |

### Critical Success Factors

1. **Container-first thinking**: Railway uses containers, not direct file execution
2. **Build optimization**: Production builds have strict time limits
3. **Asset management**: Static files must be explicitly copied to container paths
4. **Configuration as code**: Use `railway.json` or `railway.toml` for deployment settings

## Pre-Migration Preparation

### 1. Audit Your Dependencies

**For Node.js/JavaScript Applications**:

```bash
# Check dependency tree size
npm ls --depth=0
npm audit

# Check for problematic packages
npm ls lucide-react @radix-ui material-ui
```

**For Python Applications**:

```bash
# Check dependencies
pip list
pip check

# Check for heavy packages
pip show django pillow pandas numpy
```

**For Other Frameworks**:

```bash
# Ruby
bundle list
gem list

# PHP
composer show

# Go
go list -m all

# Rust
cargo tree
```

**Common Heavy Dependencies by Language**:
- **JavaScript**: Material-UI, Lucide React, Lodash, Moment.js
- **Python**: NumPy, Pandas, Pillow, TensorFlow
- **Ruby**: Rails with many gems
- **PHP**: Heavy frameworks with many dependencies

**Universal Solutions**:
- Replace heavy libraries with lightweight alternatives
- Use selective imports instead of full library imports
- Consider tree-shaking optimization
- Evaluate if dependencies are actually needed in production

### 2. File Structure Assessment

**Before Migration Checklist**:

```
✅ Identify all static assets (images, fonts, etc.)
✅ Document build output directories
✅ List all file path dependencies
✅ Check for relative vs absolute path usage
✅ Verify package.json scripts compatibility
```

### 3. Environment Variables Audit

Create a migration checklist:

```bash
# Document all environment variables
grep -r "process.env" . --include="*.js" --include="*.ts"
grep -r "import.meta.env" . --include="*.js" --include="*.ts"
```

## Build System Challenges

### Issue 1: Nixpacks Build Timeouts

**Problem**: Complex React applications with large dependency trees timeout during Nixpacks builds.

**Symptoms**:
- Builds consistently timeout at 45-60 seconds
- `lucide-react` and similar libraries cause 1800+ transformations
- Production builds fail with "Process killed" errors

**Solution Options**:

#### Option A: Optimize Dependencies
```bash
# Replace problematic imports
# Before:
import { ChevronUp, Mail, MapPin } from 'lucide-react'

# After: Create custom SVG components
const ChevronUp = () => <svg>...</svg>
```

#### Option B: Switch to Docker
Create a `Dockerfile`:

```dockerfile
FROM node:18-slim as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM node:18-slim
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 5000
CMD ["npm", "start"]
```

### Issue 2: Build Output Directory Conflicts

**Problem**: Replit and Railway have different expectations for build outputs.

**Replit Pattern**:
```
client/
├── dist/
│   └── public/
└── src/
```

**Railway Container Expected**:
```
/app/
├── dist/
│   └── public/
└── src/
```

**Solution**: Update build paths in package.json:

```json
{
  "scripts": {
    "build": "vite build --outDir dist/public",
    "prebuild": "node scripts/copy-assets.js"
  }
}
```

## Docker vs Nixpacks

### When to Use Docker

**Use Docker when**:
- Build times exceed 45-60 seconds with Nixpacks
- Complex dependency chains (React + large UI libraries)
- Custom build processes
- Need precise control over container environment

**Use Nixpacks when**:
- Simple applications with minimal dependencies
- Standard Node.js/React patterns
- Fast build times (<30 seconds)
- Zero-config deployment preferred

### Docker Configuration Best Practices

#### Multi-stage Production Dockerfile

```dockerfile
# Stage 1: Build dependencies
FROM node:18-alpine as deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --frozen-lockfile

# Stage 2: Build application
FROM node:18-alpine as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Copy static assets before build
RUN cp -r public/images dist/public/images 2>/dev/null || true
RUN npm run build

# Stage 3: Production runtime
FROM node:18-alpine as runner
WORKDIR /app

# Security: Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Set ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 5000
CMD ["node", "dist/server.js"]
```

#### Single-stage Dockerfile (Simpler Alternative)

```dockerfile
FROM node:18-alpine
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --frozen-lockfile

# Copy source code
COPY . .

# Ensure images are available for build
RUN mkdir -p dist/public/images
RUN cp -r public/images/* dist/public/images/ 2>/dev/null || true

# Build application
RUN npm run build

# Verify critical files exist
RUN ls -la dist/public/images/header_logo.png || echo "Warning: header_logo.png missing"

EXPOSE 5000
CMD ["npm", "start"]
```

## File Path & Asset Management

### Critical Issue: Container Path Resolution

**Problem**: Static assets work in development but return 404 in production.

**Root Cause**: Container file paths differ from development filesystem.

### Asset Copy Strategy

#### Method 1: Prebuild Script

Create `scripts/copy-assets.js`:

```javascript
const fs = require('fs');
const path = require('path');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyAssets() {
  const sourceDir = 'public/images';
  const targetDir = 'dist/public/images';
  
  ensureDir(targetDir);
  
  if (fs.existsSync(sourceDir)) {
    const files = fs.readdirSync(sourceDir);
    files.forEach(file => {
      const source = path.join(sourceDir, file);
      const target = path.join(targetDir, file);
      fs.copyFileSync(source, target);
      console.log(`Copied: ${source} → ${target}`);
    });
  }
}

copyAssets();
```

Update `package.json`:

```json
{
  "scripts": {
    "prebuild": "node scripts/copy-assets.js",
    "build": "vite build --outDir dist/public"
  }
}
```

#### Method 2: Dockerfile Asset Management

```dockerfile
# Copy public assets before build
COPY public ./public
RUN mkdir -p dist/public
RUN cp -r public/* dist/public/ 2>/dev/null || true

# Then run build
RUN npm run build

# Verify critical assets
RUN test -f dist/public/images/header_logo.png || (echo "Critical asset missing" && exit 1)
```

### Static File Serving in Production

**Server Configuration** (`server.js`):

```javascript
const express = require('express');
const path = require('path');
const app = express();

// Production static file paths
const staticPaths = [
  path.join(process.cwd(), 'dist/public'),
  path.join(process.cwd(), 'public'),
  path.join(__dirname, 'dist/public'),
  path.join(__dirname, 'public')
];

// Find correct static path
let staticPath = null;
for (const testPath of staticPaths) {
  if (fs.existsSync(testPath)) {
    staticPath = testPath;
    console.log(`Static files served from: ${staticPath}`);
    break;
  }
}

if (staticPath) {
  app.use(express.static(staticPath, {
    maxAge: '1y',
    etag: true
  }));
} else {
  console.warn('No static file directory found');
}

// Fallback for SPA routing
app.get('*', (req, res) => {
  const indexPath = staticPath ? 
    path.join(staticPath, 'index.html') : 
    path.join(__dirname, 'dist/public/index.html');
    
  res.sendFile(indexPath);
});
```

## Performance & Build Optimization

### Build Timeout Solutions

#### 1. Dependency Optimization

**Replace heavy libraries**:

```bash
# Before: 62 lucide-react imports (1800+ icons)
npm uninstall lucide-react

# After: Custom SVG components or lighter alternatives
npm install react-icons  # Much lighter
```

#### 2. Vite Build Configuration

`vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist/public',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-accordion', '@radix-ui/react-dialog']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
});
```

#### 3. Icon Import Optimization

**Before (Problematic)**:
```javascript
import { 
  MapPinIcon, MailIcon, PhoneIcon, ClockIcon,
  ChevronRightIcon, ChevronLeftIcon, ChevronUpIcon
  // ... 60+ more imports
} from 'lucide-react';
```

**After (Optimized)**:
```javascript
// Create custom SVG components
const MapPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

// Or use selective imports
import { MapPinIcon } from 'lucide-react/dist/esm/icons/map-pin';
```

## Production Configuration

### Railway.json Configuration

Create `railway.json`:

```json
{
  "$schema": "https://railway.com/railway.schema.json",
  "build": {
    "builder": "DOCKERFILE",
    "dockerfilePath": "Dockerfile"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 100,
    "restartPolicyType": "on_failure",
    "restartPolicyMaxRetries": 3
  }
}
```

### Environment-Specific Server Configuration

```javascript
const express = require('express');
const app = express();

// Environment detection
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';
const isRailway = process.env.RAILWAY_ENVIRONMENT !== undefined;

console.log('Environment:', {
  NODE_ENV: process.env.NODE_ENV,
  isProduction,
  isRailway,
  RAILWAY_ENVIRONMENT: process.env.RAILWAY_ENVIRONMENT
});

// Railway-specific configuration
if (isRailway) {
  // Railway provides PORT automatically
  const PORT = process.env.PORT || 5000;
  
  // Health check for Railway
  app.get('/health', (req, res) => {
    res.status(200).json({ 
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.RAILWAY_ENVIRONMENT || 'unknown'
    });
  });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Platform: ${isRailway ? 'Railway' : 'Other'}`);
});
```

## Debugging & Monitoring

### Build Debugging Scripts

Create `scripts/debug-build.js`:

```javascript
const fs = require('fs');
const path = require('path');

function debugBuild() {
  console.log('=== BUILD DEBUG INFORMATION ===');
  
  // Check file structure
  const checkPaths = [
    'dist',
    'dist/public',
    'dist/public/images',
    'public/images',
    'client/dist/public'
  ];
  
  checkPaths.forEach(checkPath => {
    if (fs.existsSync(checkPath)) {
      console.log(`✅ ${checkPath} exists`);
      try {
        const files = fs.readdirSync(checkPath);
        console.log(`   Files: ${files.length} total`);
        files.slice(0, 5).forEach(file => {
          const filePath = path.join(checkPath, file);
          const stats = fs.statSync(filePath);
          console.log(`   - ${file} (${stats.size} bytes)`);
        });
        if (files.length > 5) {
          console.log(`   ... and ${files.length - 5} more files`);
        }
      } catch (error) {
        console.log(`   Error reading directory: ${error.message}`);
      }
    } else {
      console.log(`❌ ${checkPath} missing`);
    }
  });
  
  // Check critical assets
  const criticalAssets = [
    'dist/public/index.html',
    'dist/public/images/header_logo.png',
    'public/images/header_logo.png'
  ];
  
  console.log('\n=== CRITICAL ASSETS ===');
  criticalAssets.forEach(asset => {
    if (fs.existsSync(asset)) {
      const stats = fs.statSync(asset);
      console.log(`✅ ${asset} (${stats.size} bytes)`);
    } else {
      console.log(`❌ ${asset} MISSING`);
    }
  });
}

debugBuild();
```

### Production Monitoring

```javascript
// Enhanced health check with diagnostics
app.get('/health', (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    platform: process.env.RAILWAY_ENVIRONMENT ? 'Railway' : 'Other',
    memory: process.memoryUsage(),
    uptime: process.uptime(),
    staticFiles: {}
  };
  
  // Check static file availability
  const criticalFiles = [
    'dist/public/index.html',
    'dist/public/images/header_logo.png'
  ];
  
  criticalFiles.forEach(file => {
    health.staticFiles[file] = fs.existsSync(file);
  });
  
  res.json(health);
});
```

## Step-by-Step Migration Process

### Phase 1: Preparation (Local)

1. **Audit Dependencies**
   ```bash
   npm audit
   npm ls --depth=0
   ```

2. **Test Build Locally**
   ```bash
   npm run build
   npm start
   ```

3. **Create Migration Branch**
   ```bash
   git checkout -b railway-migration
   ```

### Phase 2: Configuration Setup

1. **Create Railway Configuration**
   ```bash
   touch railway.json
   touch Dockerfile
   ```

2. **Update Package.json**
   ```json
   {
     "scripts": {
       "start": "node server.js",
       "build": "vite build --outDir dist/public",
       "prebuild": "node scripts/copy-assets.js"
     }
   }
   ```

3. **Create Production Server**
   ```bash
   cp server/index.ts server.js
   # Convert to vanilla JavaScript if needed
   ```

### Phase 3: Asset Management

1. **Audit Static Assets**
   ```bash
   find . -name "*.png" -o -name "*.jpg" -o -name "*.svg"
   ```

2. **Update Asset Paths**
   ```javascript
   // Change from:
   import logoPath from '@assets/header_logo.png'
   
   // To:
   const logoPath = '/images/header_logo.png'
   ```

3. **Create Asset Copy Script**
   ```bash
   mkdir scripts
   touch scripts/copy-assets.js
   ```

### Phase 4: Docker Configuration

1. **Create Dockerfile**
2. **Test Docker Build Locally**
   ```bash
   docker build -t my-app .
   docker run -p 5000:5000 my-app
   ```

3. **Verify Assets in Container**
   ```bash
   docker run -it my-app ls -la dist/public/images/
   ```

### Phase 5: Railway Deployment

1. **Connect GitHub Repository**
2. **Configure Environment Variables**
3. **Deploy and Monitor**
4. **Test All Functionality**

### Phase 6: Post-Migration Validation

1. **Check All Pages Load**
2. **Verify Static Assets**
3. **Test Form Submissions**
4. **Monitor Performance**
5. **Update DNS (if needed)**

## Common Issues & Solutions

### Issue 1: Blank Page on Deployment

**Symptoms**: Site loads but shows blank page, no JavaScript errors

**Diagnosis**:
```bash
# Check server logs
railway logs

# Check if static files exist
railway shell
ls -la dist/public/
```

**Solutions**:
1. Verify static file paths in server configuration
2. Check Docker COPY commands
3. Ensure index.html exists in correct location

### Issue 2: 404 for Static Assets

**Symptoms**: Images/CSS return 404 errors

**Root Causes**:
- Incorrect static file directory in server config
- Assets not copied to container during build
- Wrong file permissions in container

**Solutions**:
```javascript
// Multiple fallback paths
const staticPaths = [
  path.join(process.cwd(), 'dist/public'),
  path.join(__dirname, 'dist/public'),
  path.join(__dirname, 'public')
];
```

### Issue 3: Build Timeouts

**Symptoms**: Build consistently fails at 45-60 seconds

**Solutions**:
1. **Optimize Dependencies**: Remove heavy libraries
2. **Use Docker**: Switch from Nixpacks to Docker
3. **Code Splitting**: Break large bundles into chunks
4. **Static Build**: Create pre-built static files

### Issue 4: Environment Variable Issues

**Symptoms**: Variables available in Replit but undefined in Railway

**Solutions**:
1. Set variables in Railway dashboard
2. Update variable names (Railway uses different conventions)
3. Check `process.env` vs `import.meta.env` usage

### Issue 5: File Permission Errors

**Symptoms**: Docker build fails with permission denied

**Solutions**:
```dockerfile
# Set proper permissions
RUN chmod -R 755 /app/dist/public
```

```bash
# Fix local file permissions
chmod 644 public/images/*.png
```

## Railway-Specific Configuration

### Service Configuration

**Start Command**: `npm start`
**Build Command**: `npm run build`
**Health Check Path**: `/health`
**Port**: Railway provides `$PORT` automatically

### Environment Variables

**Required Variables**:
- `NODE_ENV=production`
- `PORT` (provided by Railway)

**Optional Variables**:
- `RAILWAY_DEPLOYMENT_OVERLAP_SECONDS=10`
- `RAILWAY_DEPLOYMENT_DRAINING_SECONDS=30`

### Restart Policy

```json
{
  "deploy": {
    "restartPolicyType": "on_failure",
    "restartPolicyMaxRetries": 3
  }
}
```

### Health Checks

```javascript
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});
```

## Best Practices Summary

### 1. Container-First Development
- Always test builds in container environments
- Use Docker locally to match Railway environment
- Avoid filesystem assumptions from development

### 2. Asset Management
- Explicitly copy all static assets during build
- Use absolute paths for static file references
- Verify asset availability in health checks

### 3. Build Optimization
- Profile build times and optimize dependencies
- Use code splitting for large applications
- Consider static builds for complex React apps

### 4. Monitoring & Debugging
- Implement comprehensive health checks
- Add detailed logging for production issues
- Create debugging scripts for build validation

### 5. Gradual Migration
- Test each component separately
- Use feature flags for rollback capability
- Monitor performance metrics after migration

## Technology-Specific Adaptations

### React Applications

**Common Issues**:
- Build timeouts with large dependency trees
- Static asset path resolution
- SPA routing configuration

**Railway Configuration**:
```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/health"
  }
}
```

**Optimization Strategies**:
```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  }
}
```

### Next.js Applications

**Static Export (Recommended)**:
```json
{
  "scripts": {
    "build": "next build && next export",
    "start": "serve out"
  }
}
```

**SSR Configuration**:
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start"
  }
}
```

### Vue.js Applications

**Build Configuration**:
```javascript
// vue.config.js
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  }
}
```

### Angular Applications

**Production Build**:
```json
{
  "scripts": {
    "build": "ng build --configuration production",
    "start": "node server.js"
  }
}
```

**Server Configuration**:
```javascript
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('./dist/your-app-name'));
app.get('/*', (req, res) => {
  res.sendFile('index.html', {root: 'dist/your-app-name/'});
});

app.listen(process.env.PORT || 8080);
```

### Python Django Applications

**Settings Configuration**:
```python
# settings.py
import os

DEBUG = False
ALLOWED_HOSTS = ['*']

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('PGDATABASE'),
        'USER': os.environ.get('PGUSER'),
        'PASSWORD': os.environ.get('PGPASSWORD'),
        'HOST': os.environ.get('PGHOST'),
        'PORT': os.environ.get('PGPORT'),
    }
}
```

**Railway Configuration**:
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "python manage.py runserver 0.0.0.0:$PORT"
  }
}
```

### Python Flask Applications

**Application Structure**:
```python
# app.py
from flask import Flask, render_template
import os

app = Flask(__name__)

@app.route('/health')
def health():
    return {'status': 'healthy'}

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
```

### Go Applications

**Main Function**:
```go
package main

import (
    "fmt"
    "net/http"
    "os"
)

func main() {
    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }

    http.HandleFunc("/", handler)
    http.HandleFunc("/health", healthHandler)
    
    fmt.Printf("Server starting on port %s\n", port)
    http.ListenAndServe(":"+port, nil)
}
```

**Railway Configuration**:
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "./main"
  }
}
```

### PHP Applications

**Index File**:
```php
<?php
// index.php
$port = $_ENV['PORT'] ?? 8080;

// Basic routing
$request = $_SERVER['REQUEST_URI'];

switch ($request) {
    case '/health':
        header('Content-Type: application/json');
        echo json_encode(['status' => 'healthy']);
        break;
    default:
        include 'views/home.php';
        break;
}
?>
```

### Static Sites

**Simple Server**:
```javascript
// server.js
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Ruby on Rails Applications

**Configuration**:
```ruby
# config/environments/production.rb
Rails.application.configure do
  config.force_ssl = false
  config.public_file_server.enabled = true
  config.assets.compile = false
  config.assets.digest = true
end
```

**Database Configuration**:
```yaml
# config/database.yml
production:
  adapter: postgresql
  encoding: unicode
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  url: <%= ENV['DATABASE_URL'] %>
```

### Technology-Specific Dockerfile Templates

**Node.js Dockerfile**:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE $PORT
CMD ["npm", "start"]
```

**Python Dockerfile**:
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE $PORT
CMD ["python", "app.py"]
```

**Go Dockerfile**:
```dockerfile
FROM golang:1.19-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o main .

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/main .
EXPOSE $PORT
CMD ["./main"]
```

### Database Migration Strategies

**PostgreSQL (Any Language)**:
1. Export data from Replit database
2. Create Railway PostgreSQL service
3. Import data using provided connection string

**MongoDB to PostgreSQL**:
1. Export MongoDB data to JSON
2. Create transformation scripts
3. Import to PostgreSQL with appropriate schema

**SQLite to PostgreSQL**:
1. Use conversion tools (sqlite3-to-postgresql)
2. Test data integrity after conversion
3. Update application database configuration

## Final Checklist

Before going live with Railway deployment:

```
✅ Local Docker build successful
✅ All static assets loading correctly
✅ Health check responding
✅ Environment variables configured
✅ Build time under 45 seconds (or using Docker)
✅ No 404 errors for critical assets
✅ Forms and interactive features working
✅ Performance metrics acceptable
✅ Monitoring and logging in place
✅ Rollback plan documented
```

---

## Migration Timeline

**By Technology Stack**:

| Technology | Simple Apps | Medium Apps | Complex Apps | Notes |
|------------|-------------|-------------|--------------|-------|
| **Static HTML/CSS/JS** | 1-2 hours | 2-3 hours | 3-4 hours | Minimal complexity |
| **React/Vue SPA** | 3-4 hours | 6-8 hours | 1-2 days | Depends on dependencies |
| **Next.js/Nuxt.js** | 2-3 hours | 4-6 hours | 8-12 hours | SSG easier than SSR |
| **Angular** | 4-6 hours | 8-12 hours | 1-2 days | Complex build process |
| **Node.js Backend** | 2-3 hours | 4-6 hours | 8-12 hours | API complexity varies |
| **Python Django** | 3-4 hours | 6-8 hours | 1-2 days | Database migration time |
| **Python Flask** | 2-3 hours | 3-4 hours | 6-8 hours | Simpler than Django |
| **Go Applications** | 1-2 hours | 2-3 hours | 4-6 hours | Compiled binaries |
| **PHP Applications** | 2-3 hours | 4-5 hours | 8-10 hours | Legacy considerations |
| **Ruby on Rails** | 4-6 hours | 8-12 hours | 1-2 days | Asset pipeline complexity |

**Complexity Factors**:
- **First Migration**: Add 50-100% time for learning curve
- **Heavy Dependencies**: Add 2-4 hours for optimization
- **Database Migration**: Add 2-6 hours depending on size
- **Custom Build Process**: Add 4-8 hours for troubleshooting
- **Multiple Services**: Multiply by number of services

## Success Metrics

After migration, you should see:
- ✅ Faster cold start times
- ✅ Better resource utilization
- ✅ Improved deployment reliability
- ✅ Enhanced monitoring capabilities
- ✅ Professional production environment

## Adaptability and Final Notes

**This guide is a living framework**: While based on real-world experience migrating a complex React/Node.js mental health counselling platform, the strategies and solutions are designed to be adapted for your specific technology stack and requirements.

**Key Adaptation Principles**:

1. **Assessment First**: Always start with the Technology Stack Assessment section to understand your specific challenges
2. **Technology-Specific Focus**: Use the relevant sections for your stack (React, Django, Go, etc.) as your primary guide
3. **Universal Patterns**: The core concepts (container thinking, asset management, build optimization) apply across all technologies
4. **Iterative Approach**: Don't try to solve everything at once - migrate incrementally and test thoroughly

**When Your Stack Isn't Covered**:
- Follow the universal migration principles
- Adapt the closest technology-specific example
- Focus on Railway's core requirements: containerization, PORT binding, health checks
- Use the debugging strategies to identify and solve stack-specific issues

**Remember**: Every migration is unique. This guide provides a proven framework and real solutions, but your specific application will likely require adaptations. Use the troubleshooting sections and debugging tools when you encounter issues not directly covered.

**Success Indicators**:
- Build completes successfully within time limits
- Application serves correctly on Railway domain
- All features work as expected in production
- Performance meets or exceeds Replit deployment
- Monitoring and health checks function properly

The original migration involved 60+ components, 20+ pages, extensive static assets, and resolved 20+ specific deployment challenges. Your experience will vary based on your technology choices, but the fundamental approach remains the same: assess, prepare, migrate incrementally, and debug systematically.