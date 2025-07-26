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

// Contact Schema
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
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
  message: true
});

// Types from schemas
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

export const insertAvailabilitySchema = createInsertSchema(availability);
export type Availability = typeof availability.$inferSelect;
export type InsertAvailability = typeof availability.$inferInsert;

// Google token types
export const insertGoogleTokenSchema = createInsertSchema(googleTokens);
export type GoogleTokens = typeof googleTokens.$inferSelect;
export type InsertGoogleTokens = typeof googleTokens.$inferInsert;
