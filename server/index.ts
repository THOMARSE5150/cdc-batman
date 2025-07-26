import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import performanceRoutes from "./routes/performance";
import { setupVite, serveStatic, log } from "./vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import staticRoutes from "./staticRoutes";
import { compressionMiddleware, brotliMiddleware } from "./middleware/compression";
import { staticCacheMiddleware, serviceWorkerCacheMiddleware } from "./middleware/caching";
import { performanceMiddleware, mobileOptimizationHeaders } from "./middleware/performance";
import { imageOptimizationMiddleware, criticalImageHeaders } from "./utils/imageOptimization";
import { mobileFirstOptimization, criticalResourcePriority } from "./middleware/mobileFirstOptimization";

// Environment detection
const isProduction = process.env.NODE_ENV === 'production' || process.env.RAILWAY_ENVIRONMENT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Safari-compatible mobile performance optimizations
import { 
  mobileResourcePriority, 
  criticalMobileCSS, 
  performanceHeaders, 
  mobileCacheStrategy 
} from './middleware/mobilePerformance';
import { coreWebVitalsOptimization } from './middleware/webVitalsOptimization';

app.use(performanceHeaders);
app.use(mobileResourcePriority);
app.use(coreWebVitalsOptimization);
app.use(criticalMobileCSS);
app.use(mobileCacheStrategy);

app.use(staticRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add performance monitoring routes
app.use(performanceRoutes);

app.get('/favicon.ico', (_req, res) => {
  try {
    const iconPath = path.join(__dirname, '../client/public/favicon.ico');
    const icon = fs.readFileSync(iconPath);
    res.setHeader('Content-Type', 'image/x-icon');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(icon);
  } catch {
    res.status(404).send('Not found');
  }
});

app.get('/favicon-32x32.png', (_req, res) => {
  try {
    const iconPath = path.join(process.cwd(), 'client/public/favicon-32x32.png');
    const icon = fs.readFileSync(iconPath);
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(icon);
  } catch {
    res.status(404).send('Not found');
  }
});

app.get('/apple-touch-icon.png', (_req, res) => {
  try {
    const iconPath = path.join(__dirname, '../client/public/apple-touch-icon.png');
    const icon = fs.readFileSync(iconPath);
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(icon);
  } catch {
    res.status(404).send('Not found');
  }
});

// Force HTTPS redirect for Replit domains
app.use((req, res, next) => {
  // Skip HTTPS redirect for localhost and Replit dev environment
  if (req.headers.host?.includes('localhost') || req.headers.host?.includes('127.0.0.1')) {
    return next();
  }
  
  // Force HTTPS for Replit domains
  if (process.env.REPLIT_DOMAINS && req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
  }
  
  if (process.env.REPLIT_DOMAINS) return next();

  const host = req.headers.host || '';
  const userAgent = req.headers['user-agent'] || '';

  if (!host.startsWith('www.') && host.includes('.') &&
      !host.startsWith('localhost') &&
      !/^(\d{1,3}\.){3}\d{1,3}/.test(host)) {
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const newUrl = `${protocol}://www.${host}${req.originalUrl}`;
    const statusCode = userAgent.includes('Chrome') ? 307 : 301;

    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');

    if (userAgent.includes('Chrome')) {
      res.setHeader('Clear-Site-Data', '"cache", "cookies", "storage"');
    }

    return res.redirect(statusCode, newUrl);
  }

  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      if (logLine.length > 80) logLine = logLine.slice(0, 79) + "…";
      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.get('/googlee964abc67dc1d83e.html', (_req, res) => {
    res.type('text/html');
    res.send('google-site-verification: googlee964abc67dc1d83e.html');
  });

  app.get('/sitemap.xml', (_req, res) => {
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url><loc>https://celiadunsmorecounselling.com.au/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>
   <url><loc>https://celiadunsmorecounselling.com.au/about</loc></url>
   <url><loc>https://celiadunsmorecounselling.com.au/services</loc></url>
   <url><loc>https://celiadunsmorecounselling.com.au/contact</loc></url>
</urlset>`;
    res.type('text/xml');
    res.setHeader('Cache-Control', 'no-cache');
    res.send(sitemapContent);
  });

  // Health check endpoint for Railway
  app.get('/health', (_req, res) => {
    const possiblePaths = [
      path.resolve(process.cwd(), "dist", "public"),
      path.resolve(__dirname, "..", "dist", "public"),
      path.resolve("/app", "dist", "public")
    ];
    
    let publicPath = null;
    let pathResults = [];
    
    for (const testPath of possiblePaths) {
      const exists = fs.existsSync(testPath);
      pathResults.push({ path: testPath, exists });
      if (exists && !publicPath) {
        publicPath = testPath;
      }
    }
    
    const indexExists = publicPath ? fs.existsSync(path.join(publicPath, 'index.html')) : false;
    const assetsExists = publicPath ? fs.existsSync(path.join(publicPath, 'assets')) : false;
    
    res.status(200).json({ 
      status: publicPath ? 'OK' : 'ERROR', 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      staticFiles: { indexExists, assetsExists },
      railway: !!(process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PUBLIC_DOMAIN),
      buildPath: publicPath,
      searchedPaths: pathResults
    });
  });

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  // CRITICAL FIX: Force production mode for Railway deployment
  // Railway sets PORT but not NODE_ENV, so detect Railway deployment
  const isRailwayDeployment = !!(process.env.RAILWAY_ENVIRONMENT || 
                                 process.env.RAILWAY_PUBLIC_DOMAIN ||
                                 (process.env.PORT && !process.env.REPLIT_DOMAINS));
  
  const isProduction = process.env.NODE_ENV === "production" || 
                       isRailwayDeployment;
  
  console.log(`🔍 Environment Detection:`);
  console.log(`  NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`  RAILWAY_ENVIRONMENT: ${process.env.RAILWAY_ENVIRONMENT}`);
  console.log(`  RAILWAY_PUBLIC_DOMAIN: ${process.env.RAILWAY_PUBLIC_DOMAIN}`);
  console.log(`  REPLIT_DOMAINS: ${process.env.REPLIT_DOMAINS}`);
  console.log(`  PORT: ${process.env.PORT}`);
  console.log(`  Railway Detected: ${isRailwayDeployment}`);
  console.log(`  Final isProduction: ${isProduction}`);

  if (isProduction) {
    console.log(`🚀 PRODUCTION MODE: serving static files`);

    // RAILWAY FIX: Multiple path resolution
    const possiblePaths = [
      path.resolve(process.cwd(), "dist", "public"),
      path.resolve(__dirname, "..", "dist", "public"),
      path.resolve(process.cwd(), "..", "dist", "public"),
      path.resolve("/app", "dist", "public")
    ];
    
    let publicPath = null;
    for (const testPath of possiblePaths) {
      if (fs.existsSync(testPath)) {
        publicPath = testPath;
        break;
      }
    }
    
    if (!publicPath) {
      console.error('❌ CRITICAL: No static files found in Railway container!');
      console.error('Searched paths:', possiblePaths);
      publicPath = path.resolve(process.cwd(), "dist", "public"); // fallback
    }

    console.log(`📁 Static file configuration:`);
    console.log(`  Working directory: ${process.cwd()}`);
    console.log(`  Static files path: ${publicPath}`);
    console.log(`  Directory exists: ${fs.existsSync(publicPath)}`);

    if (fs.existsSync(publicPath)) {
      const files = fs.readdirSync(publicPath);
      console.log(`  Files found: ${files.length}`);
      console.log(`  Sample files:`, files.slice(0, 5));
      
      // Check critical files
      const indexExists = fs.existsSync(path.join(publicPath, 'index.html'));
      const assetsExists = fs.existsSync(path.join(publicPath, 'assets'));
      console.log(`  Critical files: index=${indexExists}, assets=${assetsExists}`);
      
      if (assetsExists) {
        const assetFiles = fs.readdirSync(path.join(publicPath, 'assets'));
        const jsFiles = assetFiles.filter(f => f.endsWith('.js'));
        console.log(`  React bundles: ${jsFiles.length} JS files`);
      }
    } else {
      console.error(`❌ CRITICAL ERROR: Static files directory not found!`);
      console.error(`Expected: ${publicPath}`);
      
      // Check what's actually available
      try {
        const rootFiles = fs.readdirSync(process.cwd());
        console.error(`Root directory contents:`, rootFiles);
        
        const distExists = fs.existsSync(path.join(process.cwd(), 'dist'));
        console.error(`dist directory exists: ${distExists}`);
        
        if (distExists) {
          const distContents = fs.readdirSync(path.join(process.cwd(), 'dist'));
          console.error(`dist contents:`, distContents);
        }
      } catch (e) {
        console.error(`Cannot analyze directory structure:`, (e as Error).message);
      }
    }

    // Serve static files
    app.use(express.static(publicPath, {
      maxAge: '1y',
      etag: true,
      lastModified: true,
      setHeaders: (res, filePath) => {
        if (filePath.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp)$/)) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else if (filePath.endsWith('index.html')) {
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        }
      }
    }));
    
    // SPA fallback for all non-API routes
    app.use("*", (req, res) => {
      const indexPath = path.resolve(publicPath, "index.html");
      
      if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: 'API endpoint not found' });
      }
      
      console.log(`📄 SPA route ${req.path} -> serving index.html`);
      
      if (fs.existsSync(indexPath)) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Content-Type', 'text/html');
        res.sendFile(indexPath);
      } else {
        console.error(`❌ index.html not found at: ${indexPath}`);
        res.status(500).json({ 
          error: 'Application not available',
          message: 'React app build not found. Build process may have failed.',
          path: indexPath
        });
      }
    });
  } else {
    console.log(`🛠️ DEVELOPMENT MODE: using Vite dev server`);
    await setupVite(app, server);
  }

  const port = process.env.PORT || 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`🚀 Serving on port ${port}`);
  });
})();