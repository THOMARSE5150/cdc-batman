import { pgTable, serial, text, varchar, timestamp, boolean, integer, jsonb } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

// Contact form submissions
export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  enquiryType: varchar('enquiry_type', { length: 50 }).notNull(),
  preferredLocation: varchar('preferred_location', { length: 100 }),
  message: text('message').notNull(),
  status: varchar('status', { length: 20 }).default('new').notNull(), // new, contacted, resolved
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Bookings
export const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  clientFirstName: varchar('client_first_name', { length: 100 }).notNull(),
  clientLastName: varchar('client_last_name', { length: 100 }).notNull(),
  clientEmail: varchar('client_email', { length: 255 }).notNull(),
  clientPhone: varchar('client_phone', { length: 20 }).notNull(),
  serviceType: varchar('service_type', { length: 100 }).notNull(),
  preferredDate: timestamp('preferred_date').notNull(),
  preferredTime: varchar('preferred_time', { length: 10 }).notNull(),
  location: varchar('location', { length: 100 }).notNull(),
  notes: text('notes'),
  status: varchar('status', { length: 20 }).default('pending').notNull(), // pending, confirmed, cancelled, completed
  confirmationToken: varchar('confirmation_token', { length: 255 }),
  googleEventId: varchar('google_event_id', { length: 255 }),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Email logs for tracking communications
export const emailLogs = pgTable('email_logs', {
  id: serial('id').primaryKey(),
  recipient: varchar('recipient', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 255 }).notNull(),
  template: varchar('template', { length: 100 }).notNull(),
  status: varchar('status', { length: 20 }).notNull(), // sent, failed, bounced
  metadata: jsonb('metadata'),
  sentAt: timestamp('sent_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Availability slots for booking system
export const availabilitySlots = pgTable('availability_slots', {
  id: serial('id').primaryKey(),
  dayOfWeek: integer('day_of_week').notNull(), // 0-6 (Sunday-Saturday)
  startTime: varchar('start_time', { length: 5 }).notNull(), // HH:MM format
  endTime: varchar('end_time', { length: 5 }).notNull(), // HH:MM format
  location: varchar('location', { length: 100 }).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Create Zod schemas for validation
export const insertContactSchema = createInsertSchema(contacts);
export const selectContactSchema = createSelectSchema(contacts);

export const insertBookingSchema = createInsertSchema(bookings);
export const selectBookingSchema = createSelectSchema(bookings);

export const insertEmailLogSchema = createInsertSchema(emailLogs);
export const selectEmailLogSchema = createSelectSchema(emailLogs);

export const insertAvailabilitySlotSchema = createInsertSchema(availabilitySlots);
export const selectAvailabilitySlotSchema = createSelectSchema(availabilitySlots);

// Type exports
export type Contact = z.infer<typeof selectContactSchema>;
export type NewContact = z.infer<typeof insertContactSchema>;

export type Booking = z.infer<typeof selectBookingSchema>;
export type NewBooking = z.infer<typeof insertBookingSchema>;

export type EmailLog = z.infer<typeof selectEmailLogSchema>;
export type NewEmailLog = z.infer<typeof insertEmailLogSchema>;

export type AvailabilitySlot = z.infer<typeof selectAvailabilitySlotSchema>;
export type NewAvailabilitySlot = z.infer<typeof insertAvailabilitySlotSchema>;