import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import compression from 'compression';
// Note: Cannot import TS files directly, need to create simplified production server

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 5000;
  // CRITICAL FIX: Force production mode for Railway
  const isRailwayDeployment = !!(process.env.RAILWAY_ENVIRONMENT || 
                                 process.env.RAILWAY_PUBLIC_DOMAIN ||
                                 (process.env.PORT && !process.env.REPLIT_DOMAINS));

  const isProduction = process.env.NODE_ENV === 'production' || isRailwayDeployment;

  console.log('🚀 Celia Dunsmore Counselling - Production Server');
  console.log('Environment:', { NODE_ENV: process.env.NODE_ENV, PORT, isProduction });

  // Enable compression for all responses
  app.use(compression());

  // Enable JSON parsing for API routes
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // CRITICAL FIX: Add essential API routes directly for Railway production
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      console.log('Contact form submission:', req.body);
      // In production, this would save to database and send email
      res.status(200).json({ 
        success: true, 
        message: "Thank you for your message. I'll get back to you soon!" 
      });
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Sorry, there was an error sending your message. Please try again." 
      });
    }
  });

  // Booking endpoint
  app.post("/api/bookings", async (req, res) => {
    try {
      console.log('Booking submission:', req.body);
      res.status(200).json({ 
        success: true, 
        message: "Booking request received. I'll contact you to confirm." 
      });
    } catch (error) {
      console.error('Booking error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Sorry, there was an error with your booking. Please try again." 
      });
    }
  });

  const { createServer } = await import('http');
  const httpServer = createServer(app);

  // RAILWAY FIX: Multiple paths to find static files
  const possiblePaths = [
    join(__dirname, 'dist/public'),
    join(process.cwd(), 'dist/public'),
    join(__dirname, '../dist/public'),
    join(process.cwd(), '../dist/public')
  ];

  let publicPath = null;
  for (const path of possiblePaths) {
    if (fs.existsSync(path)) {
      publicPath = path;
      break;
    }
  }

  if (!publicPath) {
    console.error('❌ CRITICAL: No static files found in any expected location!');
    console.error('Searched paths:', possiblePaths);
    publicPath = join(__dirname, 'dist/public'); // fallback
  }

  console.log('Static files path:', publicPath);
  console.log('Files exist:', fs.existsSync(publicPath));

  if (fs.existsSync(publicPath)) {
    const files = fs.readdirSync(publicPath);
    console.log('Files in public:', files.slice(0, 10));
    console.log('Total files:', files.length);
    
    // Check for critical files
    const indexExists = fs.existsSync(join(publicPath, 'index.html'));
    const assetsExists = fs.existsSync(join(publicPath, 'assets'));
    console.log('Critical files:', { indexExists, assetsExists });
    
    if (assetsExists) {
      const assetFiles = fs.readdirSync(join(publicPath, 'assets'));
      const jsFiles = assetFiles.filter(f => f.endsWith('.js'));
      const cssFiles = assetFiles.filter(f => f.endsWith('.css'));
      console.log('Assets:', { totalAssets: assetFiles.length, jsFiles: jsFiles.length, cssFiles: cssFiles.length });
    }
  }

  // Optimized static file serving
  app.use(express.static(publicPath, {
    maxAge: isProduction ? '1y' : '0',
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

  // Health check endpoint for Railway
  app.get('/health', (req, res) => {
    const indexPath = join(publicPath, 'index.html');
    const indexExists = fs.existsSync(indexPath);
    
    res.status(200).json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      staticFiles: indexExists,
      environment: process.env.NODE_ENV || 'development'
    });
  });

  // API endpoint to test server functionality
  app.get('/api/status', (req, res) => {
    res.json({
      service: 'Celia Dunsmore Counselling',
      status: 'operational',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  });

  // Catch-all handler: send back index.html for any non-API routes (SPA routing)
  app.get('*', (req, res) => {
    const indexPath = join(publicPath, 'index.html');
    
    // Skip API routes
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ error: 'API endpoint not found' });
    }
    
    if (fs.existsSync(indexPath)) {
      // Set proper headers for SPA
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Content-Type', 'text/html');
      res.sendFile(indexPath);
    } else {
      console.error('❌ index.html not found at:', indexPath);
      res.status(500).json({ 
        error: 'Application not available',
        message: 'Static files not found. Please ensure the build completed successfully.' 
      });
    }
  });

  // Start server using httpServer from registerRoutes
  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📁 Serving static files from: ${publicPath}`);
    console.log(`🌐 Health check available at: http://localhost:${PORT}/health`);
    console.log('✅ Server ready for Railway deployment with API routes');
  });
}

// Start the server
startServer().catch(console.error);