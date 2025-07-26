#!/usr/bin/env node

/**
 * Railway-Optimized Production Server
 * Celia Dunsmore Counselling Platform
 * 
 * Optimized for Railway deployment with:
 * - Security headers and CSP
 * - Enhanced performance
 * - Health monitoring
 * - Error handling
 * - Static asset optimization
 */

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import compression from 'compression';
import helmet from 'helmet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Environment detection with Railway optimization
const isProduction = process.env.NODE_ENV === 'production' || 
                    process.env.RAILWAY_ENVIRONMENT ||
                    process.env.RAILWAY_PUBLIC_DOMAIN ||
                    (process.env.PORT && !process.env.REPLIT_DOMAINS);

const PORT = process.env.PORT || 5000;

console.log('🚀 Celia Dunsmore Counselling - Railway Optimized Server');
console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`Production Mode: ${isProduction}`);
console.log(`Port: ${PORT}`);

async function createOptimizedServer() {
  const app = express();
  
  // Security headers with Railway optimization
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:", "blob:"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        connectSrc: ["'self'", "https:", "wss:"],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        upgradeInsecureRequests: isProduction ? [] : null,
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" }
  }));

  // Performance optimization
  app.use(compression({
    level: 9,
    threshold: 1024,
    filter: (req, res) => {
      if (req.headers['x-no-compression']) return false;
      return compression.filter(req, res);
    }
  }));

  // Body parsing with limits
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: false, limit: '10mb' }));

  // Enhanced logging middleware
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
    });
    next();
  });

  // Static file serving with optimized caching
  const staticPaths = [
    join(__dirname, 'dist/public'),
    join(process.cwd(), 'dist/public'),
    join(__dirname, '../dist/public'),
    join(process.cwd(), '../dist/public'),
    join(__dirname, 'public'),
    join(process.cwd(), 'public')
  ];

  let publicPath = null;
  for (const path of staticPaths) {
    if (fs.existsSync(path)) {
      publicPath = path;
      console.log(`✅ Static files found at: ${path}`);
      break;
    }
  }

  if (!publicPath) {
    console.error('❌ CRITICAL: No static files found!');
    publicPath = staticPaths[0]; // fallback
  }

  // Optimized static serving with aggressive caching
  app.use(express.static(publicPath, {
    maxAge: isProduction ? '1y' : '0',
    etag: true,
    lastModified: true,
    immutable: isProduction,
    setHeaders: (res, filePath) => {
      // Cache static assets aggressively
      if (filePath.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp)$/)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      } else if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
      }
      
      // Security headers for assets
      if (filePath.match(/\.(js|css)$/)) {
        res.setHeader('X-Content-Type-Options', 'nosniff');
      }
    }
  }));

  // API Routes for Railway
  
  // Health check endpoint for Railway monitoring
  app.get('/health', (req, res) => {
    const indexPath = join(publicPath, 'index.html');
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      staticFiles: fs.existsSync(indexPath),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      port: PORT
    };
    
    res.status(200).json(healthData);
  });

  // API status endpoint
  app.get('/api/status', (req, res) => {
    res.json({
      service: 'Celia Dunsmore Counselling',
      status: 'operational',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    });
  });

  // Contact form endpoint with validation
  app.post('/api/contact', async (req, res) => {
    try {
      const { firstName, lastName, email, phone, message, enquiryType } = req.body;
      
      // Basic validation
      if (!firstName || !lastName || !email || !message) {
        return res.status(400).json({
          success: false,
          message: 'Please fill in all required fields.'
        });
      }

      console.log('Contact form submission:', { firstName, lastName, email, enquiryType });
      
      // In production, this would integrate with email service and database
      res.status(200).json({
        success: true,
        message: "Thank you for your message. I'll get back to you within 24 hours!"
      });
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({
        success: false,
        message: "Sorry, there was an error sending your message. Please try again."
      });
    }
  });

  // Booking endpoint with validation
  app.post('/api/bookings', async (req, res) => {
    try {
      const { service, date, time, client } = req.body;
      
      if (!service || !date || !time || !client) {
        return res.status(400).json({
          success: false,
          message: 'Please fill in all booking details.'
        });
      }

      console.log('Booking submission:', { service, date, time, client: client.firstName });
      
      res.status(200).json({
        success: true,
        message: "Booking request received. I'll contact you within 2 hours to confirm."
      });
    } catch (error) {
      console.error('Booking error:', error);
      res.status(500).json({
        success: false,
        message: "Sorry, there was an error with your booking. Please try again."
      });
    }
  });

  // Rate limiting middleware for API routes
  const rateLimitMap = new Map();
  app.use('/api/', (req, res, next) => {
    const clientIP = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const maxRequests = 100;

    const clientData = rateLimitMap.get(clientIP) || { count: 0, resetTime: now + windowMs };
    
    if (now > clientData.resetTime) {
      clientData.count = 0;
      clientData.resetTime = now + windowMs;
    }
    
    if (clientData.count >= maxRequests) {
      return res.status(429).json({
        error: 'Too many requests, please try again later.'
      });
    }
    
    clientData.count++;
    rateLimitMap.set(clientIP, clientData);
    next();
  });

  // SPA fallback handler for all non-API routes
  app.get('*', (req, res) => {
    const indexPath = join(publicPath, 'index.html');
    
    // Skip API routes
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ 
        error: 'API endpoint not found',
        path: req.path 
      });
    }
    
    if (fs.existsSync(indexPath)) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.sendFile(indexPath);
    } else {
      console.error('❌ index.html not found at:', indexPath);
      res.status(500).json({
        error: 'Application not available',
        message: 'Static files not found. Build may have failed.'
      });
    }
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
      error: 'Internal server error',
      message: isProduction ? 'Something went wrong' : err.message
    });
  });

  // Graceful shutdown handling
  const gracefulShutdown = (signal) => {
    console.log(`Received ${signal}, shutting down gracefully...`);
    server.close(() => {
      console.log('Process terminated');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  // Start server
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌐 Server running on port ${PORT}`);
    console.log(`📁 Serving static files from: ${publicPath}`);
    console.log(`🔒 Security headers enabled`);
    console.log(`⚡ Compression enabled`);
    console.log(`💚 Health check: http://localhost:${PORT}/health`);
    console.log('✅ Railway-optimized server ready!');
  });

  return server;
}

// Start the optimized server
createOptimizedServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});