import { 
  bookings, 
  type Booking, 
  type InsertBooking,
  contacts,
  type Contact,
  type InsertContact,
  availability,
  type Availability,
  type InsertAvailability,
  googleTokens,
  type GoogleTokens,
  type InsertGoogleTokens
} from "@shared/schema";

// Storage interface for our application
export interface IStorage {
  // Booking methods
  getAllBookings(): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;

  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
  getContact(id: number): Promise<Contact | undefined>;

  // Availability methods
  upsertAvailability(date: string, slots: string[]): Promise<Availability>;
  getAvailabilityRange(startDate: string, endDate: string): Promise<Availability[]>;
  deleteAvailability(date: string): Promise<void>;

  // Google Calendar methods
  saveGoogleTokens(tokens: { accessToken: string; refreshToken: string; expiryDate: number; calendarId?: string }): Promise<GoogleTokens>;
  getGoogleTokens(): Promise<GoogleTokens | null>;
  updateGoogleTokens(tokens: { accessToken: string; expiryDate: number; calendarId?: string }): Promise<GoogleTokens | null>;
  clearGoogleTokens(): Promise<boolean>;
}

// In-memory implementation of the storage interface
export class MemStorage implements IStorage {
  private bookings: Map<number, Booking>;
  private contacts: Map<number, Contact>;
  private bookingId: number;
  private contactId: number;
  private availabilityId: number; // Added for availability ID tracking
  private availability: Map<number, Availability>;
  private googleTokensData: GoogleTokens | null;


  constructor() {
    this.bookings = new Map();
    this.contacts = new Map();
    this.bookingId = 1;
    this.contactId = 1;
    this.availabilityId = 1;
    this.availability = new Map();
    this.googleTokensData = null;
  }

  // Booking methods
  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.bookingId++;
    const createdAt = new Date();

    const booking: Booking = { 
      ...insertBooking, 
      id,
      createdAt,
      status: "confirmed" 
    };

    this.bookings.set(id, booking);
    return booking;
  }

  // Contact methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.contactId++;
    const createdAt = new Date();

    const contact: Contact = {
      id,
      firstName: insertContact.firstName,
      lastName: insertContact.lastName,
      email: insertContact.email,
      message: insertContact.message,
      phone: insertContact.phone,
      createdAt
    };

    this.contacts.set(id, contact);
    return contact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async getContact(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  // Availability methods
  async createAvailability(insertAvailability: InsertAvailability): Promise<Availability> {
    const id = this.availabilityId++;
    // Ensure proper type structure
    const availability: Availability = { 
      id,
      date: insertAvailability.date,
      availableSlots: insertAvailability.availableSlots || [],
      createdAt: insertAvailability.createdAt || new Date(),
      updatedAt: insertAvailability.updatedAt || new Date()
    };
    this.availability.set(id, availability);
    return availability;
  }

  async getAllAvailability(): Promise<Availability[]> {
    return Array.from(this.availability.values());
  }

  async getAvailability(id: number): Promise<Availability | undefined> {
    return this.availability.get(id);
  }
  
  async upsertAvailability(date: string, slots: string[]): Promise<Availability> {
    const existingAvailability = Array.from(this.availability.values())
      .find(a => a.date === date);

    if (existingAvailability) {
      const updated = {
        ...existingAvailability,
        availableSlots: slots,
        updatedAt: new Date()
      };
      this.availability.set(existingAvailability.id, updated);
      return updated;
    }

    const id = this.availabilityId++;
    const newAvailability: Availability = {
      id,
      date,
      availableSlots: slots,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.availability.set(id, newAvailability);
    return newAvailability;
  }

  async getAvailabilityRange(startDate: string, endDate: string): Promise<Availability[]> {
    return Array.from(this.availability.values())
      .filter(a => a.date >= startDate && a.date <= endDate);
  }

  async deleteAvailability(date: string): Promise<void> {
    const availability = Array.from(this.availability.values())
      .find(a => a.date === date);
    if (availability) {
      this.availability.delete(availability.id);
    }
  }
  
  // Google Calendar methods
  async saveGoogleTokens(tokens: { 
    accessToken: string; 
    refreshToken: string; 
    expiryDate: number;
    calendarId?: string 
  }): Promise<GoogleTokens> {
    const now = new Date();
    
    this.googleTokensData = {
      id: 1,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiryDate: tokens.expiryDate.toString(), // Store as string
      calendarId: tokens.calendarId || null,
      createdAt: now,
      updatedAt: now
    };
    
    return this.googleTokensData;
  }
  
  async getGoogleTokens(): Promise<GoogleTokens | null> {
    return this.googleTokensData;
  }
  
  async updateGoogleTokens(tokens: { 
    accessToken: string; 
    expiryDate: number; 
    calendarId?: string 
  }): Promise<GoogleTokens | null> {
    if (!this.googleTokensData) {
      return null;
    }
    
    this.googleTokensData = {
      ...this.googleTokensData,
      accessToken: tokens.accessToken,
      expiryDate: tokens.expiryDate.toString(),
      calendarId: tokens.calendarId || this.googleTokensData.calendarId,
      updatedAt: new Date()
    };
    
    return this.googleTokensData;
  }
  
  async clearGoogleTokens(): Promise<boolean> {
    this.googleTokensData = null;
    return true;
  }
}

// Export a singleton instance of the storage
export const storage = new MemStorage();