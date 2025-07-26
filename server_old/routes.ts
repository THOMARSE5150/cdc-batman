import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertBookingSchema, insertContactSchema } from "@shared/schema";
import { sendBookingConfirmation, sendContactConfirmation } from "./email";
import path from "path";
import fs from "fs";
// Import both real and mock Google Calendar implementations
import * as realGoogleCalendar from "./services/googleCalendar";
import * as mockGoogleCalendar from "./services/mockGoogleCalendar";

// By default, use the real implementation
const googleCalendar = realGoogleCalendar;

// Export both implementations for use in specific routes
export const googleCalendarImplementations = {
  real: realGoogleCalendar,
  mock: mockGoogleCalendar
};

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  
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

  // Test endpoint for debugging
  app.get("/api/test-json", (req, res) => {
    console.log('Test JSON endpoint hit');
    res.json({ success: true, message: "This is a test JSON response" });
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
  
  // Handle contact form submissions
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      
      // Send confirmation email to the user
      try {
        const { firstName, lastName, email, message } = contactData;
        const emailSent = await sendContactConfirmation(firstName, lastName, email, message);
        console.log(`Contact confirmation email ${emailSent ? 'sent' : 'failed'} for: ${email}`);
      } catch (emailError) {
        console.error("Failed to send contact confirmation email:", emailError);
        // Continue with the response even if email fails
      }
      
      res.status(201).json({ message: "Message sent successfully", id: contact.id });
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

  const httpServer = createServer(app);
  return httpServer;
}
