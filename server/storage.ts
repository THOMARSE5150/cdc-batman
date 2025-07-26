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
  type InsertGoogleTokens,
  practiceLocations,
  type PracticeLocation,
  type InsertPracticeLocation
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

  // Practice Location methods
  getAllPracticeLocations(): Promise<PracticeLocation[]>;
  getActivePracticeLocations(): Promise<PracticeLocation[]>;
  getPracticeLocation(id: number): Promise<PracticeLocation | undefined>;
  getPracticeLocationByLocationId(locationId: string): Promise<PracticeLocation | undefined>;
  createPracticeLocation(location: InsertPracticeLocation): Promise<PracticeLocation>;
  updatePracticeLocation(id: number, location: Partial<InsertPracticeLocation>): Promise<PracticeLocation | undefined>;
  deletePracticeLocation(id: number): Promise<boolean>;
  setPrimaryLocation(id: number): Promise<boolean>;

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
  private practiceLocations: Map<number, PracticeLocation>;
  private bookingId: number;
  private contactId: number;
  private locationId: number;
  private availabilityId: number;
  private availability: Map<number, Availability>;
  private googleTokensData: GoogleTokens | null;

  constructor() {
    this.bookings = new Map();
    this.contacts = new Map();
    this.practiceLocations = new Map();
    this.bookingId = 1;
    this.contactId = 1;
    this.locationId = 1;
    this.availabilityId = 1;
    this.availability = new Map();
    this.googleTokensData = null;
    
    // Initialize with the existing locations
    this.initializeDefaultLocations();
  }

  private initializeDefaultLocations() {
    const defaultLocations = [
      {
        locationId: 'brunswick',
        name: 'Brunswick',
        displayName: 'Brunswick Primary Location',
        address: '503 Sydney Road, Brunswick VIC',
        description: 'Primary location with excellent public transport access',
        isPrimary: true,
        isActive: true,
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
        phone: '(03) 9041 5031',
        email: null,
        contactPersonName: null,
        specialNotes: null,
        accessibilityFeatures: ['Ground floor access', 'Wide doorways'],
        availableServices: ['Individual counselling', 'Telehealth'],
        sortOrder: 1
      },
      {
        locationId: 'coburg-bell',
        name: 'Coburg Bell Street',
        displayName: 'Coburg - Bell Street Location',
        address: '81B Bell Street, Coburg VIC 3058',
        description: 'New location with on-site parking available',
        isPrimary: false,
        isActive: true,
        coordinates: { lat: -37.7559, lng: 144.9647 },
        features: ['On-site parking', '8 minute walk from Coburg Station', 'Weekend availability'],
        hours: {
          'Monday': '9:00 AM - 5:00 PM',
          'Tuesday': '9:00 AM - 5:00 PM',
          'Wednesday': '9:00 AM - 5:00 PM',
          'Thursday': '9:00 AM - 5:00 PM',
          'Friday': '9:00 AM - 5:00 PM',
          'Saturday': '9:00 AM - 1:00 PM'
        },
        parking: 'Free on-site parking available',
        transport: ['Train to Coburg Station', 'Bus 508'],
        phone: '(03) 9041 5031',
        email: null,
        contactPersonName: null,
        specialNotes: null,
        accessibilityFeatures: ['Ground level parking', 'Accessible entrance'],
        availableServices: ['Individual counselling', 'Weekend appointments'],
        sortOrder: 2
      },
      {
        locationId: 'coburg-solana',
        name: 'Coburg Solana Psychology',
        displayName: 'Coburg - Solana Psychology',
        address: 'FL 1, 420 Sydney Road, Coburg VIC 3058',
        description: 'Convenient location',
        isPrimary: false,
        isActive: true,
        coordinates: { lat: -37.7423, lng: 144.9631 },
        features: ['First floor with lift access', 'Near Coburg Station', 'Professional psychology centre'],
        hours: {
          'Monday': '9:00 AM - 5:00 PM',
          'Tuesday': '9:00 AM - 5:00 PM',
          'Wednesday': '9:00 AM - 5:00 PM',
          'Thursday': '9:00 AM - 5:00 PM',
          'Friday': '9:00 AM - 5:00 PM'
        },
        parking: 'Limited street parking available',
        transport: ['Train to Coburg Station', 'Tram 19'],
        phone: '(03) 9041 5031',
        email: null,
        contactPersonName: null,
        specialNotes: null,
        accessibilityFeatures: ['Lift access', 'Professional centre'],
        availableServices: ['Individual counselling', 'Specialist referrals'],
        sortOrder: 3
      }
    ];

    defaultLocations.forEach(locationData => {
      const id = this.locationId++;
      const now = new Date();
      const location: PracticeLocation = {
        id,
        ...locationData,
        createdAt: now,
        updatedAt: now
      };
      this.practiceLocations.set(id, location);
    });
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
      phone: insertContact.phone || null,
      enquiryType: insertContact.enquiryType,
      preferredLocation: insertContact.preferredLocation || null,
      message: insertContact.message,
      urgencyLevel: insertContact.urgencyLevel || 1,
      privacyConsent: insertContact.privacyConsent || false,
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

  // Practice Location methods
  async getAllPracticeLocations(): Promise<PracticeLocation[]> {
    return Array.from(this.practiceLocations.values())
      .sort((a, b) => (a.sortOrder || 999) - (b.sortOrder || 999));
  }

  async getActivePracticeLocations(): Promise<PracticeLocation[]> {
    return Array.from(this.practiceLocations.values())
      .filter(location => location.isActive)
      .sort((a, b) => (a.sortOrder || 999) - (b.sortOrder || 999));
  }

  async getPracticeLocation(id: number): Promise<PracticeLocation | undefined> {
    return this.practiceLocations.get(id);
  }

  async getPracticeLocationByLocationId(locationId: string): Promise<PracticeLocation | undefined> {
    return Array.from(this.practiceLocations.values())
      .find(location => location.locationId === locationId);
  }

  async createPracticeLocation(insertLocation: InsertPracticeLocation): Promise<PracticeLocation> {
    const id = this.locationId++;
    const now = new Date();
    
    const location: PracticeLocation = {
      id,
      ...insertLocation,
      createdAt: now,
      updatedAt: now
    };

    this.practiceLocations.set(id, location);
    return location;
  }

  async updatePracticeLocation(id: number, updateData: Partial<InsertPracticeLocation>): Promise<PracticeLocation | undefined> {
    const existing = this.practiceLocations.get(id);
    if (!existing) return undefined;

    const updated: PracticeLocation = {
      ...existing,
      ...updateData,
      updatedAt: new Date()
    };

    this.practiceLocations.set(id, updated);
    return updated;
  }

  async deletePracticeLocation(id: number): Promise<boolean> {
    return this.practiceLocations.delete(id);
  }

  async setPrimaryLocation(id: number): Promise<boolean> {
    const targetLocation = this.practiceLocations.get(id);
    if (!targetLocation) return false;

    // Set all locations to non-primary first
    for (const [locationId, location] of this.practiceLocations.entries()) {
      this.practiceLocations.set(locationId, {
        ...location,
        isPrimary: false,
        updatedAt: new Date()
      });
    }

    // Set the target location as primary
    this.practiceLocations.set(id, {
      ...targetLocation,
      isPrimary: true,
      updatedAt: new Date()
    });

    return true;
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