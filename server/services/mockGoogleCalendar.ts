/**
 * Mock Google Calendar Implementation
 * 
 * This provides a simulated Google Calendar interface that doesn't depend on actual OAuth authentication.
 * It allows for development and testing of the calendar availability feature without
 * requiring actual Google credentials.
 */

import { storage } from '../storage';
import { addDays, format } from 'date-fns';

// Simulated calendar data
const MOCK_CALENDARS = [
  { id: 'primary', summary: 'My Primary Calendar' },
  { id: 'work', summary: 'Work Calendar' },
  { id: 'personal', summary: 'Personal Events' }
];

// Hardcoded redirect URI for compatibility with the original routes
const REDIRECT_URI = 'https://workspace.thomarse5150.repl.co/api/google/oauth/callback';

// Simulated login state
let isConnected = false;

/**
 * Get the redirect URI (compatibility with original implementation)
 */
export function getRedirectUri() {
  return REDIRECT_URI;
}

/**
 * Get authentication URL (compatibility with original implementation)
 */
export function getAuthUrl(): string {
  return 'https://mockgoogleauth.example.com/auth';
}

/**
 * Exchange code for tokens (compatibility with original implementation)
 */
export async function exchangeCodeForTokens(code: string): Promise<any> {
  console.log('Mock implementation: Using code to authorize:', code);
  
  // Simulate successful authorization using any provided code
  await storage.saveGoogleTokens({
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
    expiryDate: Date.now() + 3600 * 1000, // 1 hour from now
    calendarId: 'primary'
  });
  
  isConnected = true;
  
  return {
    access_token: 'mock-access-token',
    refresh_token: 'mock-refresh-token',
    expiry_date: Date.now() + 3600 * 1000
  };
}

/**
 * Simulates connecting to Google Calendar
 */
export async function connectMockGoogleCalendar(): Promise<boolean> {
  // Store a mock token in the database
  await storage.saveGoogleTokens({
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
    expiryDate: Date.now() + 3600 * 1000, // 1 hour from now
    calendarId: 'primary'
  });
  
  isConnected = true;
  return true;
}

/**
 * Checks if the mock account is connected
 */
export async function hasValidCredentials(): Promise<boolean> {
  const tokens = await storage.getGoogleTokens();
  return !!tokens && !!tokens.refreshToken;
}

/**
 * Lists available calendars
 */
export async function listCalendars() {
  if (!isConnected && !(await hasValidCredentials())) {
    return null;
  }
  
  return MOCK_CALENDARS;
}

/**
 * Simulates syncing a calendar's availability
 */
export async function syncCalendarAvailability(
  calendarId: string,
  startDate: Date,
  endDate: Date
): Promise<boolean> {
  if (!isConnected && !(await hasValidCredentials())) {
    // Try to connect first
    await connectMockGoogleCalendar();
  }
  
  // Generate daily availability for the date range
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    // Skip weekends for more realistic data
    const dayOfWeek = currentDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    // Generate available slots
    const availableSlots = isWeekend 
      ? [] // No slots on weekends
      : generateAvailableSlotsForDate(currentDate);
    
    // Format the date as 'YYYY-MM-DD'
    const dateString = format(currentDate, 'yyyy-MM-dd');
    
    // Update availability in storage
    await storage.upsertAvailability(dateString, availableSlots);
    
    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return true;
}

/**
 * Generates realistic available time slots for a given date
 */
function generateAvailableSlotsForDate(date: Date): string[] {
  // Standard business hours (9am-5pm)
  const allTimeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', 
    '1:00 PM', '2:00 PM', '3:00 PM', 
    '4:00 PM', '5:00 PM'
  ];
  
  // Randomly mark some slots as unavailable to simulate a realistic calendar
  const availableSlots = allTimeSlots.filter(() => Math.random() > 0.3);
  
  return availableSlots;
}

/**
 * List events (not used directly in the UI but needed for compatibility)
 */
export async function listEvents(
  calendarId: string,
  startDate: Date,
  endDate: Date
): Promise<any[] | null> {
  return [];
}

/**
 * Create events (not used directly in the UI but needed for compatibility)
 */
export async function createEvent(
  calendarId: string,
  summary: string,
  description: string,
  startDateTime: Date,
  endDateTime: Date,
  attendees = []
): Promise<any | null> {
  return { id: "mock-event-id", summary, description };
}

/**
 * Get available time slots (required for compatibility with original interface)
 */
export async function getAvailableTimeSlots(
  calendarId: string,
  date: Date
): Promise<string[] | null> {
  return generateAvailableSlotsForDate(date);
}

/**
 * Disconnects from the mock Google Calendar
 */
export async function disconnectGoogleCalendar(): Promise<boolean> {
  isConnected = false;
  return await storage.clearGoogleTokens();
}