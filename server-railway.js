// Railway Production Server - Optimized for Railway deployment
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import fs from 'fs';
import compression from 'compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const isRailway = process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PUBLIC_DOMAIN;

console.log('🚀 Railway Production Server Starting...');
console.log('Environment:', {
  NODE_ENV: process.env.NODE_ENV,
  RAILWAY_ENVIRONMENT: process.env.RAILWAY_ENVIRONMENT,
  RAILWAY_PUBLIC_DOMAIN: process.env.RAILWAY_PUBLIC_DOMAIN,
  PORT: PORT,
  isRailway: !!isRailway
});

// Enable compression
app.use(compression());

// Serve static files from dist/public
const publicPath = resolve(process.cwd(), 'dist/public');

console.log('Static files configuration:');
console.log('- Working directory:', process.cwd());
console.log('- Public path:', publicPath);
console.log('- Directory exists:', fs.existsSync(publicPath));

if (fs.existsSync(publicPath)) {
  const files = fs.readdirSync(publicPath);
  console.log('- Files found:', files.length);
  console.log('- Sample files:', files.slice(0, 10));
  
  // Check for critical files
  const indexExists = fs.existsSync(join(publicPath, 'index.html'));
  const assetsExists = fs.existsSync(join(publicPath, 'assets'));
  console.log('- Critical files check:', { indexExists, assetsExists });
  
  if (assetsExists) {
    const assetFiles = fs.readdirSync(join(publicPath, 'assets'));
    const jsFiles = assetFiles.filter(f => f.endsWith('.js'));
    const cssFiles = assetFiles.filter(f => f.endsWith('.css'));
    console.log('- Assets breakdown:', { 
      total: assetFiles.length, 
      js: jsFiles.length, 
      css: cssFiles.length 
    });
  }
} else {
  console.error('❌ CRITICAL: Static files directory not found!');
  console.error('Expected path:', publicPath);
  console.error('Available directories:');
  try {
    const dirs = fs.readdirSync(process.cwd()).filter(item => 
      fs.statSync(join(process.cwd(), item)).isDirectory()
    );
    console.error('Root directories:', dirs);
  } catch (e) {
    console.error('Cannot read root directory:', e.message);
  }
}

// Health check endpoint for Railway
app.get('/health', (req, res) => {
  const indexPath = join(publicPath, 'index.html');
  const indexExists = fs.existsSync(indexPath);
  
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    staticFiles: indexExists,
    environment: process.env.NODE_ENV || 'production',
    railway: !!isRailway,
    publicPath: publicPath
  });
});

// Serve static files with optimized caching
app.use(express.static(publicPath, {
  maxAge: isRailway ? '1y' : '0',
  etag: true,
  lastModified: true,
  setHeaders: (res, filePath) => {
    // Cache static assets aggressively in production
    if (filePath.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (filePath.endsWith('index.html')) {
      // Don't cache HTML files
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
  }
}));

// SPA fallback - serve index.html for any non-API routes
app.get('*', (req, res) => {
  const indexPath = join(publicPath, 'index.html');
  
  // Skip API routes
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  
  if (fs.existsSync(indexPath)) {
    console.log(`Serving SPA route ${req.path} -> index.html`);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(indexPath);
  } else {
    console.error('❌ index.html not found at:', indexPath);
    res.status(500).json({ 
      error: 'Application not available',
      message: 'Static files not found. Build may have failed.',
      path: indexPath
    });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Railway server running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
  console.log(`📁 Serving from: ${publicPath}`);
  console.log('🚀 Railway deployment ready!');
});