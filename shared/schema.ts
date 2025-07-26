import { pgTable, text, serial, timestamp, json, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Availability Schema
export const availability = pgTable("availability", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(),
  availableSlots: json("available_slots").$type<string[]>().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// Google Calendar Tokens Schema
export const googleTokens = pgTable("google_tokens", {
  id: serial("id").primaryKey(),
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token").notNull(),
  expiryDate: text("expiry_date").notNull(), // Stored as string timestamp number
  calendarId: text("calendar_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// Booking Schema
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  service: json("service").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  client: json("client").notNull(),
  status: text("status").notNull().default("confirmed"),
  createdAt: timestamp("created_at").defaultNow()
});

// Practice Locations Schema
export const practiceLocations = pgTable("practice_locations", {
  id: serial("id").primaryKey(),
  locationId: text("location_id").notNull().unique(),
  name: text("name").notNull(),
  displayName: text("display_name").notNull(),
  address: text("address").notNull(),
  description: text("description").notNull(),
  isPrimary: boolean("is_primary").default(false),
  isActive: boolean("is_active").default(true),
  coordinates: json("coordinates").$type<{ lat: number; lng: number }>().notNull(),
  features: json("features").$type<string[]>().notNull().default([]),
  hours: json("hours").$type<{ [key: string]: string }>(),
  parking: text("parking"),
  transport: json("transport").$type<string[]>().default([]),
  phone: text("phone"),
  email: text("email"),
  contactPersonName: text("contact_person_name"),
  specialNotes: text("special_notes"),
  accessibilityFeatures: json("accessibility_features").$type<string[]>().default([]),
  availableServices: json("available_services").$type<string[]>().default([]),
  sortOrder: serial("sort_order"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// Contact Schema
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"), // Make phone optional
  enquiryType: text("enquiry_type").notNull(),
  preferredLocation: text("preferred_location"),
  message: text("message").notNull(),
  urgencyLevel: serial("urgency_level").default(1),
  privacyConsent: boolean("privacy_consent").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow()
});

// Service Schema
export const serviceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  duration: z.number(),
  price: z.number(),
  withRebate: z.number().nullable()
});

// Client Schema
export const clientSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string().optional(),
  haveReferral: z.boolean().default(false),
  referralDetails: z.string().optional(),
  additionalNotes: z.string().optional(),
  hasMedicare: z.boolean().optional(),
  medicareNumber: z.string().optional(),
  notes: z.string().optional(),
});

// Create Zod schemas from Drizzle tables
export const insertBookingSchema = z.object({
  service: serviceSchema,
  date: z.string(),
  time: z.string(),
  client: clientSchema
});

export const insertContactSchema = createInsertSchema(contacts).pick({
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  enquiryType: true,
  preferredLocation: true,
  message: true,
  urgencyLevel: true,
  privacyConsent: true
});

export const insertPracticeLocationSchema = createInsertSchema(practiceLocations).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const practiceLocationSchema = z.object({
  id: z.number(),
  locationId: z.string(),
  name: z.string(),
  displayName: z.string(),
  address: z.string(),
  description: z.string(),
  isPrimary: z.boolean().default(false),
  isActive: z.boolean().default(true),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number()
  }),
  features: z.array(z.string()).default([]),
  hours: z.record(z.string()).optional(),
  parking: z.string().optional(),
  transport: z.array(z.string()).default([]),
  phone: z.string().optional(),
  email: z.string().optional(),
  contactPersonName: z.string().optional(),
  specialNotes: z.string().optional(),
  accessibilityFeatures: z.array(z.string()).default([]),
  availableServices: z.array(z.string()).default([]),
  sortOrder: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

// Types from schemas
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

export type InsertPracticeLocation = z.infer<typeof insertPracticeLocationSchema>;
export type PracticeLocation = typeof practiceLocations.$inferSelect;

export const insertAvailabilitySchema = createInsertSchema(availability);
export type Availability = typeof availability.$inferSelect;
export type InsertAvailability = typeof availability.$inferInsert;

// Availability Slots Schema (for calendar integration)
export const availabilitySlots = pgTable("availability_slots", {
  id: serial("id").primaryKey(),
  dayOfWeek: text("day_of_week").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  location: text("location").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// Email Logs Schema
export const emailLogs = pgTable("email_logs", {
  id: serial("id").primaryKey(),
  recipient: text("recipient").notNull(),
  subject: text("subject").notNull(),
  template: text("template").notNull(),
  success: boolean("success").notNull(),
  errorMessage: text("error_message"),
  sentAt: timestamp("sent_at").defaultNow()
});

// Google token types
export const insertGoogleTokenSchema = createInsertSchema(googleTokens);
export type GoogleTokens = typeof googleTokens.$inferSelect;
export type InsertGoogleTokens = typeof googleTokens.$inferInsert;

// Email log types
export const insertEmailLogSchema = createInsertSchema(emailLogs);
export type EmailLog = typeof emailLogs.$inferSelect;
export type NewEmailLog = typeof emailLogs.$inferInsert;
