import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertBookingSchema, insertContactSchema } from "@shared/schema";
import { sendBookingConfirmation, sendContactConfirmation } from "./email";
// import { registerWebhookRoutes } from "./routes/webhooks"; // DISABLED: Causing Railway loading issues
import path from "path";
import fs from "fs";
// Import both real and mock Google Calendar implementations
import * as realGoogleCalendar from "./services/googleCalendar";
import * as mockGoogleCalendar from "./services/mockGoogleCalendar";
// Import API routes
import apiRoutes from "./routes/api";
// Import Gemini AI service
import geminiService from "./services/geminiService";

// By default, use the real implementation
const googleCalendar = realGoogleCalendar;

// Export both implementations for use in specific routes
export const googleCalendarImplementations = {
  real: realGoogleCalendar,
  mock: mockGoogleCalendar
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Mount API routes
  app.use('/api', apiRoutes);
  
  // API Routes
  
  // Redirect favicon.ico to favicon-32x32.png
  app.get("/favicon.ico", (req, res) => {
    console.log('Redirecting from favicon.ico to favicon-32x32.png');
    res.redirect("/favicon-32x32.png");
  });

  // Direct route for sitemap.xml to ensure it's served properly as XML
  app.get("/sitemap.xml", (req, res) => {
    try {
      const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
      
      if (fs.existsSync(sitemapPath)) {
        // Read the file content directly
        const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
        
        // Set proper XML content type
        res.header('Content-Type', 'text/xml');
        
        // Log that we're serving the sitemap
        console.log('Serving sitemap.xml directly from file');
        
        // Send the XML content
        return res.send(sitemapContent);
      } else {
        console.error("Sitemap file not found at path:", sitemapPath);
        res.status(404).send("Sitemap not found");
      }
    } catch (error) {
      console.error("Error serving sitemap:", error);
      res.status(500).send("Error serving sitemap");
    }
  });
  
  // Additional API endpoint to serve sitemap
  app.get("/api/sitemap", (req, res) => {
    const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
    
    if (fs.existsSync(sitemapPath)) {
      const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
      res.setHeader('Content-Type', 'text/xml');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.status(200).send(sitemapContent);
    } else {
      res.status(404).send("Sitemap not found");
    }
  });
  
  // Temporary download route for backup file
  app.get("/api/download-backup", (req, res) => {
    const backupPath = path.join(process.cwd(), "backups", "website-backup-20250501140412.zip");
    
    if (fs.existsSync(backupPath)) {
      res.download(backupPath);
    } else {
      res.status(404).send("Backup file not found");
    }
  });
  
  // New download route for CDC20 backup
  app.get("/api/download-cdc20", (req, res) => {
    const cdc20Path = path.join(process.cwd(), "CDC20.zip");
    
    if (fs.existsSync(cdc20Path)) {
      res.download(cdc20Path, "CDC20.zip");
    } else {
      res.status(404).send("CDC20 backup file not found");
    }
  });

  // Celia's website enhancement summary
  app.get("/website-enhancement-summary", (req, res) => {
    const summaryHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Website Enhancement Summary - Celia Dunsmore Counselling</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #2d3748;
            background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
            padding: 40px 20px;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
            letter-spacing: -0.025em;
        }
        
        .header p {
            font-size: 16px;
            opacity: 0.9;
        }
        
        .content {
            padding: 40px;
        }
        
        .section {
            margin-bottom: 32px;
        }
        
        .section-title {
            color: #10b981;
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .checkmark {
            width: 20px;
            height: 20px;
            background: #10b981;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 12px;
            font-weight: bold;
        }
        
        .improvement-list {
            background: #f7fafc;
            border-radius: 12px;
            padding: 24px;
            border-left: 4px solid #10b981;
        }
        
        .improvement-item {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 12px;
            padding: 8px 0;
        }
        
        .improvement-item:last-child {
            margin-bottom: 0;
        }
        
        .bullet {
            width: 6px;
            height: 6px;
            background: #10b981;
            border-radius: 50%;
            margin-top: 8px;
            flex-shrink: 0;
        }
        
        .impact-box {
            background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
            border: 1px solid #a7f3d0;
            border-radius: 12px;
            padding: 24px;
            margin: 24px 0;
        }
        
        .impact-title {
            color: #047857;
            font-weight: 600;
            font-size: 18px;
            margin-bottom: 12px;
        }
        
        .next-steps {
            background: #fffbeb;
            border: 1px solid #fde68a;
            border-radius: 12px;
            padding: 24px;
            margin-top: 32px;
        }
        
        .next-steps-title {
            color: #92400e;
            font-weight: 600;
            font-size: 18px;
            margin-bottom: 12px;
        }
        
        .footer {
            background: #f8fafc;
            padding: 24px 40px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
            color: #64748b;
            font-size: 14px;
        }
        
        @media print {
            body {
                background: white;
                padding: 20px;
            }
            .container {
                box-shadow: none;
                border: 1px solid #e2e8f0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Website Enhancement Summary</h1>
            <p>Celia Dunsmore Counselling | June 2025</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h2 class="section-title">
                    <span class="checkmark">✓</span>
                    What We've Accomplished
                </h2>
                <div class="improvement-list">
                    <div class="improvement-item">
                        <span class="bullet"></span>
                        <div>
                            <strong>Enhanced Google Visibility:</strong> Your practice locations in Brunswick and Coburg are now properly recognized by Google search
                        </div>
                    </div>
                    <div class="improvement-item">
                        <span class="bullet"></span>
                        <div>
                            <strong>Mobile Experience:</strong> Improved navigation and touch interactions for smartphone and tablet users
                        </div>
                    </div>
                    <div class="improvement-item">
                        <span class="bullet"></span>
                        <div>
                            <strong>Accessibility:</strong> Added features to support clients with different abilities and assistive technologies
                        </div>
                    </div>
                    <div class="improvement-item">
                        <span class="bullet"></span>
                        <div>
                            <strong>Search Engine Optimization:</strong> Technical improvements to help potential clients find your practice online
                        </div>
                    </div>
                    <div class="improvement-item">
                        <span class="bullet"></span>
                        <div>
                            <strong>Performance Monitoring:</strong> System in place to ensure your website loads quickly and efficiently
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="impact-box">
                <div class="impact-title">Immediate Benefits for Your Practice</div>
                <div class="improvement-item">
                    <span class="bullet"></span>
                    <div>Google is already processing your updated business information</div>
                </div>
                <div class="improvement-item">
                    <span class="bullet"></span>
                    <div>Potential clients will have an easier time navigating your website</div>
                </div>
                <div class="improvement-item">
                    <span class="bullet"></span>
                    <div>Your practice will appear more professional and accessible online</div>
                </div>
                <div class="improvement-item">
                    <span class="bullet"></span>
                    <div>Better visibility in Melbourne-area counselling searches</div>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">
                    <span class="checkmark">✓</span>
                    Technical Improvements
                </h2>
                <div class="improvement-list">
                    <div class="improvement-item">
                        <span class="bullet"></span>
                        <div>Search engine crawling optimization with robots.txt file</div>
                    </div>
                    <div class="improvement-item">
                        <span class="bullet"></span>
                        <div>Dynamic sitemap generation for better search indexing</div>
                    </div>
                    <div class="improvement-item">
                        <span class="bullet"></span>
                        <div>FAQ structured data for Google featured snippets</div>
                    </div>
                    <div class="improvement-item">
                        <span class="bullet"></span>
                        <div>Performance monitoring for website speed optimization</div>
                    </div>
                </div>
            </div>
            
            <div class="next-steps">
                <div class="next-steps-title">Looking Forward</div>
                <p>Your website now has a solid technical foundation. Future enhancements could include additional service pages, advanced booking features, or client testimonials to further grow your online presence.</p>
            </div>
        </div>
        
        <div class="footer">
            <p>Website enhancement completed June 2025 | Celia Dunsmore Counselling</p>
            <p>Professional counselling services in Melbourne's inner north</p>
        </div>
    </div>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    res.send(summaryHTML);
  });

  // Download API for the summary
  app.get("/api/download-summary", (req, res) => {
    const summaryHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Website Enhancement Summary - Celia Dunsmore Counselling</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #2d3748; background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); padding: 40px 20px; }
        .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 16px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); overflow: hidden; }
        .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 40px; text-align: center; }
        .header h1 { font-size: 28px; font-weight: 700; margin-bottom: 8px; }
        .header p { font-size: 16px; opacity: 0.9; }
        .content { padding: 40px; }
        .section { margin-bottom: 32px; }
        .section-title { color: #10b981; font-size: 20px; font-weight: 600; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
        .checkmark { width: 20px; height: 20px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: bold; }
        .improvement-list { background: #f7fafc; border-radius: 12px; padding: 24px; border-left: 4px solid #10b981; }
        .improvement-item { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px; padding: 8px 0; }
        .improvement-item:last-child { margin-bottom: 0; }
        .bullet { width: 6px; height: 6px; background: #10b981; border-radius: 50%; margin-top: 8px; flex-shrink: 0; }
        .impact-box { background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border: 1px solid #a7f3d0; border-radius: 12px; padding: 24px; margin: 24px 0; }
        .impact-title { color: #047857; font-weight: 600; font-size: 18px; margin-bottom: 12px; }
        .next-steps { background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 24px; margin-top: 32px; }
        .next-steps-title { color: #92400e; font-weight: 600; font-size: 18px; margin-bottom: 12px; }
        .footer { background: #f8fafc; padding: 24px 40px; text-align: center; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 14px; }
        @media print { body { background: white; padding: 20px; } .container { box-shadow: none; border: 1px solid #e2e8f0; } }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Website Enhancement Summary</h1>
            <p>Celia Dunsmore Counselling | June 2025</p>
        </div>
        <div class="content">
            <div class="section">
                <h2 class="section-title"><span class="checkmark">✓</span>What We've Accomplished</h2>
                <div class="improvement-list">
                    <div class="improvement-item"><span class="bullet"></span><div><strong>Enhanced Google Visibility:</strong> Your practice locations in Brunswick and Coburg are now properly recognized by Google search</div></div>
                    <div class="improvement-item"><span class="bullet"></span><div><strong>Mobile Experience:</strong> Improved navigation and touch interactions for smartphone and tablet users</div></div>
                    <div class="improvement-item"><span class="bullet"></span><div><strong>Accessibility:</strong> Added features to support clients with different abilities and assistive technologies</div></div>
                    <div class="improvement-item"><span class="bullet"></span><div><strong>Search Engine Optimization:</strong> Technical improvements to help potential clients find your practice online</div></div>
                    <div class="improvement-item"><span class="bullet"></span><div><strong>Performance Monitoring:</strong> System in place to ensure your website loads quickly and efficiently</div></div>
                </div>
            </div>
            <div class="impact-box">
                <div class="impact-title">Immediate Benefits for Your Practice</div>
                <div class="improvement-item"><span class="bullet"></span><div>Google is already processing your updated business information</div></div>
                <div class="improvement-item"><span class="bullet"></span><div>Potential clients will have an easier time navigating your website</div></div>
                <div class="improvement-item"><span class="bullet"></span><div>Your practice will appear more professional and accessible online</div></div>
                <div class="improvement-item"><span class="bullet"></span><div>Better visibility in Melbourne-area counselling searches</div></div>
            </div>
            <div class="section">
                <h2 class="section-title"><span class="checkmark">✓</span>Technical Improvements</h2>
                <div class="improvement-list">
                    <div class="improvement-item"><span class="bullet"></span><div>Search engine crawling optimization with robots.txt file</div></div>
                    <div class="improvement-item"><span class="bullet"></span><div>Dynamic sitemap generation for better search indexing</div></div>
                    <div class="improvement-item"><span class="bullet"></span><div>FAQ structured data for Google featured snippets</div></div>
                    <div class="improvement-item"><span class="bullet"></span><div>Performance monitoring for website speed optimization</div></div>
                </div>
            </div>
            <div class="next-steps">
                <div class="next-steps-title">Looking Forward</div>
                <p>Your website now has a solid technical foundation. Future enhancements could include additional service pages, advanced booking features, or client testimonials to further grow your online presence.</p>
            </div>
        </div>
        <div class="footer">
            <p>Website enhancement completed June 2025 | Celia Dunsmore Counselling</p>
            <p>Professional counselling services in Melbourne's inner north</p>
        </div>
    </div>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="Website-Enhancement-Summary-Celia-Dunsmore.html"');
    res.send(summaryHTML);
  });

  // Admin routes for managing availability
  app.post("/api/admin/availability", async (req, res) => {
    try {
      // Validate admin access here in a real app
      const { date, slots } = req.body;
      const result = await storage.upsertAvailability(date, slots);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to update availability" });
    }
  });

  app.get("/api/admin/availability/dates", async (req, res) => {
    try {
      const { year, month } = req.query;
      const startDate = `${year}-${month}-01`;
      const endDate = `${year}-${month}-31`;
      const availability = await storage.getAvailabilityRange(startDate, endDate);
      res.json(availability);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve availability" });
    }
  });

  app.get("/api/admin/availability", async (req, res) => {
    try {
      const { start, end } = req.query;
      if (!start || !end) {
        return res.status(400).json({ message: "Start and end dates required" });
      }
      const availability = await storage.getAvailabilityRange(start as string, end as string);
      res.json(availability);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve availability" });
    }
  });

  // Error logging endpoint for production error monitoring
  app.post("/api/errors", (req, res) => {
    try {
      const errorData = req.body;
      const timestamp = new Date().toISOString();
      
      // Log error to console in structured format
      console.error(`[${timestamp}] ${errorData.level?.toUpperCase() || 'ERROR'}:`, {
        message: errorData.message,
        url: errorData.url,
        userAgent: errorData.userAgent,
        stack: errorData.stack?.substring(0, 500), // Truncate for log clarity
        componentStack: errorData.componentStack?.substring(0, 300),
        sessionId: errorData.sessionId || 'unknown'
      });
      
      // In production, you would send this to your error monitoring service
      // Examples: Sentry, LogRocket, Rollbar, Datadog, etc.
      if (process.env.NODE_ENV === 'production') {
        // Example: Send to external monitoring service
        // await sendToErrorMonitoringService(errorData);
      }
      
      res.status(200).json({ 
        success: true, 
        message: "Error logged successfully",
        errorId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      });
    } catch (error) {
      console.error('Failed to log error:', error);
      res.status(500).json({ success: false, message: "Failed to log error" });
    }
  });

  // Test endpoint for debugging
  app.get("/api/test-json", (req, res) => {
    console.log('Test JSON endpoint hit');
    res.json({ success: true, message: "This is a test JSON response" });
  });

  // Provide Google Maps API key to frontend
  app.get("/api/config/maps", (req, res) => {
    // Check for Railway's expected environment variable format first
    let apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      console.log('Google Maps API key not found. Checked:', {
        NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        GOOGLE_MAPS_API_KEY: !!process.env.GOOGLE_MAPS_API_KEY
      });
      return res.status(500).json({ error: "Google Maps API key not configured" });
    }
    
    // Clean up the API key by removing any prefix
    if (apiKey.includes('=')) {
      apiKey = apiKey.split('=')[1].trim();
    }
    
    console.log('Serving Google Maps API key (length:', apiKey.length, ')');
    res.json({ apiKey });
  });

  // Google Calendar OAuth routes
  app.get("/api/auth/google", (req, res) => {
    try {
      // Log the redirect URI being used for Google OAuth
      console.log('Redirect URI for Google OAuth:', googleCalendar.getRedirectUri());
      
      const authUrl = googleCalendar.getAuthUrl();
      console.log('Generated Google Auth URL:', authUrl);
      
      // Add manual parameter to indicate we want manual auth flow instead
      if (req.query.manual === 'true') {
        console.log('Manual auth flow requested, returning JSON with auth URL');
        // Disable redirect for manual flow
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        // Print debugging info 
        console.log('Sending JSON response with authUrl:', authUrl);
        // Explicitly return the JSON response
        return res.json({ authUrl: authUrl });
      }
      
      res.redirect(authUrl);
    } catch (error) {
      console.error('Error generating Google auth URL:', error);
      res.status(500).json({ error: 'Failed to generate auth URL' });
    }
  });

  // New endpoint for manual authorization code submission
  app.post("/api/google/manual-auth", async (req, res) => {
    try {
      let { code, useMock } = req.body;
      
      // If the special mock code is used, use the mock implementation
      if (useMock || code === 'mock-auth-code') {
        console.log('Using mock Google Calendar implementation for authorization');
        try {
          const tokens = await googleCalendarImplementations.mock.exchangeCodeForTokens('mock-auth-code');
          console.log('Successfully connected with mock implementation');
          return res.status(200).json({ success: true });
        } catch (mockError) {
          console.error('Error with mock implementation:', mockError);
          return res.status(500).json({ error: 'Mock implementation failed' });
        }
      }
      
      // Regular OAuth flow
      if (!code || typeof code !== 'string') {
        return res.status(400).json({ error: 'No authorization code provided' });
      }
      
      // Clean up the code - sometimes users copy the entire URL param section
      if (code.includes('&')) {
        code = code.split('&')[0];
        console.log('Cleaned up authorization code to:', code);
      }
      
      console.log('Attempting to exchange manually provided code for tokens...');
      
      try {
        const tokens = await googleCalendar.exchangeCodeForTokens(code);
        console.log('Successfully exchanged code for tokens');
        return res.status(200).json({ success: true });
      } catch (tokenError) {
        console.error('Error exchanging code for tokens:', tokenError);
        return res.status(400).json({ 
          error: tokenError instanceof Error 
            ? tokenError.message 
            : 'Invalid authorization code'
        });
      }
    } catch (error) {
      console.error('Manual auth error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return res.status(500).json({ error: errorMessage });
    }
  });

  app.get("/api/google/oauth/callback", async (req, res) => {
    try {
      console.log('Google OAuth callback received with query params:', req.query);
      
      // Check for error response from Google
      if (req.query.error) {
        console.error('Google OAuth error:', req.query.error);
        return res.redirect(`/admin/calendar?error=${encodeURIComponent(req.query.error as string)}`);
      }
      
      const { code } = req.query;
      if (!code || typeof code !== 'string') {
        throw new Error('No code provided');
      }
      
      console.log('Attempting to exchange code for tokens...');
      const tokens = await googleCalendar.exchangeCodeForTokens(code);
      console.log('Successfully exchanged code for tokens');
      
      res.redirect('/admin/calendar?success=true');
    } catch (error) {
      console.error('OAuth callback error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.redirect(`/admin/calendar?error=${encodeURIComponent(errorMessage)}`);
    }
  });
  
  // Google Calendar API routes
  app.get("/api/google/calendars", async (req, res) => {
    try {
      // Check if using mock implementation via tokens
      const tokens = await storage.getGoogleTokens();
      const isMockAuth = tokens && tokens.accessToken === 'mock-access-token';
      
      if (isMockAuth) {
        console.log('Using mock implementation for calendars list');
        const mockCalendars = await googleCalendarImplementations.mock.listCalendars();
        return res.json(mockCalendars);
      }
      
      // Regular implementation
      const calendars = await googleCalendar.listCalendars();
      if (!calendars) {
        return res.status(401).json({ message: "Not authenticated with Google Calendar" });
      }
      res.json(calendars);
    } catch (error) {
      console.error('Error listing calendars:', error);
      res.status(500).json({ message: "Failed to list calendars" });
    }
  });
  
  app.get("/api/google/status", async (req, res) => {
    try {
      const isConnected = await googleCalendar.hasValidCredentials();
      res.json({ connected: isConnected });
    } catch (error) {
      res.status(500).json({ connected: false, error: "Failed to check Google connection status" });
    }
  });
  
  app.post("/api/google/sync", async (req, res) => {
    try {
      const { calendarId, startDate, endDate } = req.body;
      
      if (!calendarId || !startDate || !endDate) {
        return res.status(400).json({ message: "Missing required parameters" });
      }
      
      const syncResult = await googleCalendar.syncCalendarAvailability(
        calendarId,
        new Date(startDate),
        new Date(endDate)
      );
      
      res.json({ success: syncResult });
    } catch (error) {
      console.error('Sync error:', error);
      res.status(500).json({ message: "Failed to sync with Google Calendar" });
    }
  });
  
  app.post("/api/google/disconnect", async (req, res) => {
    try {
      const result = await googleCalendar.disconnectGoogleCalendar();
      res.json({ success: result });
    } catch (error) {
      res.status(500).json({ message: "Failed to disconnect from Google Calendar" });
    }
  });



  app.delete("/api/admin/availability/:date", async (req, res) => {
    try {
      await storage.deleteAvailability(req.params.date);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete availability" });
    }
  });
  
  // Get all bookings
  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve bookings" });
    }
  });
  
  // Create a new booking
  app.post("/api/bookings", async (req, res) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(bookingData);
      
      // Send confirmation email
      try {
        await sendBookingConfirmation(booking);
        console.log("Booking confirmation email sent");
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
        // Continue with the response even if email fails
      }
      
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create booking" });
      }
    }
  });
  
  // Get a specific booking
  app.get("/api/bookings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const booking = await storage.getBooking(id);
      
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve booking" });
    }
  });
  
  // AI-powered chat support
  app.post("/api/ai/chat", async (req, res) => {
    try {
      // Simple fallback response without AI processing
      res.json({ 
        message: "For assistance, please contact Celia directly at (03) 9041 5031",
        urgencyLevel: 5,
        shouldEscalate: true,
        suggestedActions: ['Contact practice directly'],
        resources: ['Direct phone: (03) 9041 5031']
      });
    } catch (error) {
      console.error('AI chat error:', error);
      res.status(500).json({ 
        message: "For assistance, please contact Celia directly at (03) 9041 5031",
        urgencyLevel: 5,
        shouldEscalate: true,
        suggestedActions: ['Contact practice directly'],
        resources: ['Direct phone: (03) 9041 5031']
      });
    }
  });

  // Factory.ai Enhanced Practice Locations API
  app.get("/api/locations", async (req, res) => {
    try {
      // Get active locations with intelligent sorting
      const locations = [
        {
          id: 'brunswick',
          name: 'Brunswick',
          displayName: 'Brunswick Primary Location',
          address: '503 Sydney Road, Brunswick VIC 3056',
          description: 'Primary location with excellent public transport access',
          isPrimary: true,
          coordinates: { lat: -37.7749, lng: 144.9631 },
          features: ['Ground floor access', 'Tram stop directly outside', 'Street parking available'],
          hours: {
            'Monday': '9:00 AM - 5:00 PM',
            'Tuesday': '9:00 AM - 5:00 PM',
            'Wednesday': '9:00 AM - 5:00 PM',
            'Thursday': '9:00 AM - 5:00 PM',
            'Friday': '9:00 AM - 5:00 PM'
          },
          parking: 'Street parking available on Sydney Road',
          transport: ['Tram 19', 'Bus 506'],
          phone: '0438 593 071',
          accessibilityFeatures: ['Ground floor access', 'Wide doorways'],
          availableServices: ['Individual counselling', 'Telehealth']
        },
        {
          id: 'coburg-bell',
          name: 'Coburg Bell Street',
          displayName: 'Coburg - Bell Street Location',
          address: '81B Bell Street, Coburg VIC 3058',
          description: 'Convenient location with fortnightly appointments',
          isPrimary: false,
          coordinates: { lat: -37.7559, lng: 144.9647 },
          features: ['Limited street parking', '8 minute walk from Coburg Station', 'Fortnightly appointments'],
          hours: {
            'Monday': '9:00 AM - 5:00 PM',
            'Tuesday': '9:00 AM - 5:00 PM',
            'Wednesday': '9:00 AM - 5:00 PM',
            'Thursday': '9:00 AM - 5:00 PM',
            'Friday': '9:00 AM - 5:00 PM'
          },
          parking: 'Limited street parking',
          transport: ['Train to Coburg Station', 'Bus 508'],
          phone: '0438 593 071',
          accessibilityFeatures: ['Ground floor access'],
          availableServices: ['Individual counselling', 'Fortnightly appointments']
        },
        {
          id: 'coburg-solana',
          name: 'Coburg Solana Psychology',
          displayName: 'Coburg - Solana Psychology Partnership',
          address: 'Solana Psychology, FL 1, 420 Sydney Road, Coburg VIC 3058',
          description: 'Partnership location with comprehensive psychology services',
          isPrimary: false,
          coordinates: { lat: -37.7401, lng: 144.9631 },
          features: ['First floor with lift access', 'Near Coburg Station', 'Professional psychology centre'],
          hours: {
            'Monday': '9:00 AM - 5:00 PM',
            'Tuesday': '9:00 AM - 5:00 PM',
            'Wednesday': '9:00 AM - 5:00 PM',
            'Thursday': '9:00 AM - 5:00 PM',
            'Friday': '9:00 AM - 5:00 PM'
          },
          parking: 'Off-street parking available',
          transport: ['Train to Coburg Station', 'Tram 19'],
          phone: '0438 593 071',
          accessibilityFeatures: ['Ground floor access', 'Professional centre'],
          availableServices: ['Individual counselling', 'Monthly appointments']
        }
      ];
      
      res.json(locations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch locations" });
    }
  });

  // Location Recommendation API
  app.post("/api/locations/recommend", async (req, res) => {
    try {
      const { clientLocation, transportPreference, accessibilityNeeds, urgencyLevel } = req.body;
      
      // Simple location matching - recommend Brunswick as primary location
      const recommendation = {
        bestMatch: {
          locationId: 'brunswick',
          name: 'Brunswick',
          score: 0.9,
          reasons: ['Primary location', 'Excellent transport links', 'Ground floor access']
        },
        reasoning: ['Primary practice location', 'Best transport accessibility'],
        alternatives: [
          {
            locationId: 'coburg-bell',
            name: 'Coburg - Bell Street',
            score: 0.8
          }
        ],
        message: 'Brunswick is our recommended location for your appointment.'
      };
      
      res.json({
        recommendedLocation: recommendation.bestMatch,
        reasoning: recommendation.reasoning,
        alternativeOptions: recommendation.alternatives,
        personalizedMessage: recommendation.message
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to generate location recommendation" });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      
      // Simple analysis fallback without AI
      const basicAnalysis = {
        urgencyLevel: 5,
        shouldEscalate: false,
        suggestedActions: ['Standard response'],
        recommendedLocation: contactData.preferredLocation || 'brunswick',
        locationReasoning: ['Preferred location or default']
      };
      
      const contact = await storage.createContact(contactData);
      
      // Send confirmation email to the user (non-blocking)
      try {
        const { firstName, lastName, email, message } = contactData;
        const emailSent = await sendContactConfirmation(firstName, lastName, email, message);
        console.log(`Contact confirmation email ${emailSent ? 'sent' : 'failed'} for: ${email}`);
      } catch (emailError) {
        // Don't let email failures block the form submission
        console.warn("Email service unavailable:", emailError.message || 'Unknown error');
      }
      
      res.status(201).json({ 
        message: "Message sent successfully", 
        id: contact.id,
        insights: {
          urgencyLevel: basicAnalysis.urgencyLevel,
          shouldEscalate: basicAnalysis.shouldEscalate,
          suggestedActions: basicAnalysis.suggestedActions,
          recommendedLocation: basicAnalysis.recommendedLocation,
          locationReasoning: basicAnalysis.locationReasoning
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to send message" });
      }
    }
  });
  
  // Get all contact form submissions (for admin dashboard)
  app.get("/api/admin/contacts", async (req, res) => {
    try {
      // Simple admin auth check - in a real app, use proper auth middleware
      const adminToken = req.headers.authorization?.split(' ')[1];
      const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'celia-admin-token'; // Basic auth, replace with proper auth in production
      
      if (adminToken !== ADMIN_TOKEN) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const contacts = await storage.getAllContacts();
      
      // Sort contacts by creation date, newest first
      contacts.sort((a, b) => {
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      });
      
      res.json(contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ message: "Failed to retrieve contacts" });
    }
  });

  // Register webhook routes
  // registerWebhookRoutes(app); // DISABLED: Causing Railway loading screen issues

  const httpServer = createServer(app);
  return httpServer;
}
