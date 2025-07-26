import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { eq, desc } from 'drizzle-orm';
import * as schema from './schema';

// Get database URL from environment
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn('DATABASE_URL not set, database features will be disabled');
}

// Create database connection
const sql = databaseUrl ? neon(databaseUrl) : null;
export const db = sql ? drizzle(sql, { schema }) : null;

// Database health check
export async function checkDatabaseConnection(): Promise<boolean> {
  if (!db) {
    return false;
  }
  
  try {
    // Simple query to test connection
    await sql!('SELECT 1');
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
}

// Export all schema and types
export * from './schema';

// Helper functions for common operations
export const dbHelpers = {
  // Contacts
  async createContact(data: typeof schema.contacts.$inferInsert) {
    if (!db) throw new Error('Database not connected');
    
    const [contact] = await db
      .insert(schema.contacts)
      .values(data)
      .returning();
    
    return contact;
  },

  async getContacts(limit = 50, offset = 0) {
    if (!db) throw new Error('Database not connected');
    
    return db
      .select()
      .from(schema.contacts)
      .orderBy(desc(schema.contacts.createdAt))
      .limit(limit)
      .offset(offset);
  },

  async updateContactStatus(id: number, status: string) {
    if (!db) throw new Error('Database not connected');
    
    const [updated] = await db
      .update(schema.contacts)
      .set({ status, updatedAt: new Date() })
      .where(eq(schema.contacts.id, id))
      .returning();
    
    return updated;
  },

  // Bookings
  async createBooking(data: typeof schema.bookings.$inferInsert) {
    if (!db) throw new Error('Database not connected');
    
    const [booking] = await db
      .insert(schema.bookings)
      .values(data)
      .returning();
    
    return booking;
  },

  async getBookings(status?: string) {
    if (!db) throw new Error('Database not connected');
    
    let query = db.select().from(schema.bookings);
    
    if (status) {
      return query.where(eq(schema.bookings.status, status)).orderBy(desc(schema.bookings.preferredDate));
    }
    
    return query.orderBy(desc(schema.bookings.preferredDate));
  },

  async updateBookingStatus(id: number, status: string, googleEventId?: string) {
    if (!db) throw new Error('Database not connected');
    
    const updateData: any = { status, updatedAt: new Date() };
    if (googleEventId) {
      updateData.googleEventId = googleEventId;
    }
    
    const [updated] = await db
      .update(schema.bookings)
      .set(updateData)
      .where(eq(schema.bookings.id, id))
      .returning();
    
    return updated;
  },

  // Email logs
  async logEmail(data: typeof schema.emailLogs.$inferInsert) {
    if (!db) throw new Error('Database not connected');
    
    const [log] = await db
      .insert(schema.emailLogs)
      .values(data)
      .returning();
    
    return log;
  },

  // Availability
  async getAvailabilitySlots(location?: string) {
    if (!db) throw new Error('Database not connected');
    
    let baseQuery = db
      .select()
      .from(schema.availabilitySlots)
      .where(eq(schema.availabilitySlots.isActive, true));
    
    if (location) {
      return db
        .select()
        .from(schema.availabilitySlots)
        .where(eq(schema.availabilitySlots.isActive, true))
        .where(eq(schema.availabilitySlots.location, location))
        .orderBy(desc(schema.availabilitySlots.dayOfWeek));
    }
    
    return baseQuery.orderBy(
      desc(schema.availabilitySlots.dayOfWeek)
    );
  },
};

