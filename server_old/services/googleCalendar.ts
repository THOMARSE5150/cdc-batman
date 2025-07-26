import { google, calendar_v3 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { storage } from '../storage';

// Google OAuth2 configuration
// Security Fix: Use environment variables for all credentials
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// Log the OAuth credentials status (without exposing the actual values)
console.log('Google OAuth credentials status:');
console.log('GOOGLE_CLIENT_ID present:', !!GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET present:', !!GOOGLE_CLIENT_SECRET);

// Important: Make sure client ID and secret are consistent between authorization URL and token exchange

// Get hostname dynamically from Replit environment
const getHostname = () => {
  // For debugging environment variables
  console.log('REPL_SLUG:', process.env.REPL_SLUG);
  console.log('REPL_OWNER:', process.env.REPL_OWNER);
  console.log('REPLIT_DOMAINS:', process.env.REPLIT_DOMAINS);
  console.log('REPLIT_DB_URL:', process.env.REPLIT_DB_URL);
  
  // First try to use REPLIT_DOMAINS which is the most reliable in new Replit
  if (process.env.REPLIT_DOMAINS) {
    const url = `https://${process.env.REPLIT_DOMAINS}`;
    console.log('Using REPLIT_DOMAINS URL:', url);
    return url;
  }
  
  // Fallback to traditional Replit URL format
  if (process.env.REPL_SLUG && process.env.REPL_OWNER) {
    const url = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
    console.log('Using Replit Owner/Slug URL:', url);
    return url;
  }
  
  // Fallback to localhost if not in Replit environment
  console.log('Using localhost URL');
  return 'http://localhost:5000';
};

const REDIRECT_URI = `${getHostname()}/api/google/oauth/callback`;

// Export for debugging
export function getRedirectUri() {
  return REDIRECT_URI;
}

const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events',
];

// Create OAuth2 client
export const oauth2Client = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URI
);

// Get authentication URL for Google OAuth
export function getAuthUrl(): string {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent', // Force displaying consent screen for refresh token
  });
}

// Exchange authorization code for tokens
export async function exchangeCodeForTokens(code: string): Promise<{
  access_token: string;
  refresh_token: string;
  expiry_date: number;
}> {
  const { tokens } = await oauth2Client.getToken(code);
  
  if (!tokens.access_token || !tokens.refresh_token || !tokens.expiry_date) {
    throw new Error('Incomplete tokens received from Google');
  }
  
  // Store tokens for later use
  await storage.saveGoogleTokens({
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiryDate: tokens.expiry_date, // this is a number (timestamp)
  });
  
  return {
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    expiry_date: tokens.expiry_date,
  };
}

// Initialize client with stored tokens
export async function initializeCalendarClient(): Promise<calendar_v3.Calendar | null> {
  const tokens = await storage.getGoogleTokens();
  
  if (!tokens) {
    return null;
  }
  
  oauth2Client.setCredentials({
    access_token: tokens.accessToken,
    refresh_token: tokens.refreshToken,
    expiry_date: parseInt(tokens.expiryDate),
  });
  
  return google.calendar({ version: 'v3', auth: oauth2Client });
}

// List calendars
export async function listCalendars(): Promise<calendar_v3.Schema$CalendarListEntry[] | null> {
  const calendar = await initializeCalendarClient();
  
  if (!calendar) {
    return null;
  }
  
  try {
    const response = await calendar.calendarList.list();
    return response.data.items || [];
  } catch (error) {
    console.error('Error listing calendars:', error);
    return null;
  }
}

// List events for a date range
export async function listEvents(
  calendarId: string,
  startDate: Date,
  endDate: Date
): Promise<calendar_v3.Schema$Event[] | null> {
  const calendar = await initializeCalendarClient();
  
  if (!calendar) {
    return null;
  }
  
  try {
    const response = await calendar.events.list({
      calendarId,
      timeMin: startDate.toISOString(),
      timeMax: endDate.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });
    
    return response.data.items || [];
  } catch (error) {
    console.error('Error listing events:', error);
    return null;
  }
}

// Create a new calendar event
export async function createEvent(
  calendarId: string,
  summary: string,
  description: string,
  startDateTime: Date,
  endDateTime: Date,
  attendees: { email: string }[] = []
): Promise<calendar_v3.Schema$Event | null> {
  const calendar = await initializeCalendarClient();
  
  if (!calendar) {
    return null;
  }
  
  try {
    const event: calendar_v3.Schema$Event = {
      summary,
      description,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'Australia/Sydney', // Use appropriate timezone for Australia
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'Australia/Sydney',
      },
      attendees,
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day
          { method: 'popup', minutes: 30 },
        ],
      },
    };
    
    const response = await calendar.events.insert({
      calendarId,
      requestBody: event,
      sendUpdates: 'all', // Send email notifications to attendees
    });
    
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    return null;
  }
}

// Get available time slots from Google Calendar
export async function getAvailableTimeSlots(
  calendarId: string,
  date: Date
): Promise<string[] | null> {
  // Set the time range for the day
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  // Get events for the day
  const events = await listEvents(calendarId, startOfDay, endOfDay);
  
  if (!events) {
    return null;
  }
  
  // Define all potential time slots (9am-5pm, hourly slots)
  const allTimeSlots: string[] = [];
  for (let hour = 9; hour < 17; hour++) {
    allTimeSlots.push(`${hour}:00`);
  }
  
  // Filter out slots that overlap with events
  const busySlots = events
    .filter(event => !event.transparency || event.transparency !== 'transparent') // Exclude "free" events
    .map(event => {
      const start = new Date(event.start?.dateTime || '');
      return `${start.getHours()}:00`;
    });
  
  // Return available slots
  return allTimeSlots.filter(slot => !busySlots.includes(slot));
}

// Sync calendar availability with Google Calendar
export async function syncCalendarAvailability(
  calendarId: string,
  startDate: Date,
  endDate: Date
): Promise<boolean> {
  // Process one day at a time
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    // Get available slots from Google Calendar
    const availableSlots = await getAvailableTimeSlots(calendarId, currentDate);
    
    if (availableSlots) {
      // Format the date as 'YYYY-MM-DD'
      const dateString = currentDate.toISOString().split('T')[0];
      
      // Update availability in storage
      await storage.upsertAvailability(dateString, availableSlots);
    }
    
    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return true;
}

// Check if we have valid Google credentials
export async function hasValidCredentials(): Promise<boolean> {
  const tokens = await storage.getGoogleTokens();
  return !!tokens && !!tokens.refreshToken;
}

// Disconnect from Google Calendar
export async function disconnectGoogleCalendar(): Promise<boolean> {
  return await storage.clearGoogleTokens();
}