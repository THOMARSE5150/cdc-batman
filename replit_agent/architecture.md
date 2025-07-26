# Celia Dunsmore Counselling Website Architecture

## Overview

This document outlines the architecture for the Celia Dunsmore Counselling website, a full-stack web application that enables clients to view services, book appointments, and contact the counselor directly. The site also includes an admin dashboard for managing bookings and availability.

The application follows a modern web architecture with a clear separation between frontend and backend components, using TypeScript throughout the entire stack for type safety and improved developer experience.

## System Architecture

The system follows a client-server architecture with the following high-level components:

1. **Frontend**: React-based single-page application (SPA) served to clients
2. **Backend**: Express.js API server handling business logic and data access
3. **Database**: PostgreSQL database managed through Drizzle ORM
4. **External Services**: Integration with Google Calendar for scheduling and SendGrid for email notifications

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│             │      │             │      │             │
│   Browser   │<────>│  API Server │<────>│  Database   │
│  (React SPA)│      │  (Express)  │      │ (PostgreSQL)│
│             │      │             │      │             │
└─────────────┘      └──────┬──────┘      └─────────────┘
                            │
                            ▼
                     ┌─────────────┐
                     │  External   │
                     │  Services   │
                     │ (Google,    │
                     │  SendGrid)  │
                     └─────────────┘
```

## Key Components

### Frontend

The frontend is a React-based SPA with the following key characteristics:

1. **Technology Stack**:
   - React 18 with TypeScript
   - Tailwind CSS for styling
   - shadcn/ui components for UI elements
   - Wouter for routing (lightweight alternative to React Router)
   - Framer Motion for animations
   - React Hook Form for form management
   - Zod for validation schemas
   - Tanstack React Query for data fetching and caching

2. **Project Structure**:
   - `/client/src/components/`: UI components organized by feature
   - `/client/src/pages/`: Page components mapped to routes
   - `/client/src/hooks/`: Custom React hooks
   - `/client/src/lib/`: Utility functions and shared logic

3. **Performance Optimizations**:
   - Lazy loading of non-critical components 
   - Image optimization for faster loading
   - Mobile-specific optimizations for iOS and Android
   - Progressive loading strategies

### Backend

The backend is built with Express.js and provides the following functionality:

1. **Technology Stack**:
   - Express.js with TypeScript
   - Node.js runtime
   - esbuild for server-side bundling

2. **Project Structure**:
   - `/server/index.ts`: Main entry point
   - `/server/routes.ts`: API route definitions
   - `/server/db.ts`: Database connection setup
   - `/server/storage.ts`: Data access layer
   - `/server/services/`: Service integrations (Google Calendar, etc.)

3. **API Endpoints**:
   - `/api/admin/availability`: Manage counselor availability
   - `/api/google/oauth`: Google OAuth2 authentication flow
   - `/api/contact`: Client contact form submission
   - `/api/bookings`: Appointment booking management

### Data Layer

The application uses PostgreSQL with Drizzle ORM for data management:

1. **Schema**:
   - `availability`: Counselor availability dates and times
   - `bookings`: Client booking information
   - `contacts`: Contact form submissions
   - `googleTokens`: OAuth tokens for Google Calendar integration

2. **Data Access**:
   - Drizzle ORM for type-safe database queries
   - Zod for schema validation between API and database

### External Integrations

The application integrates with several external services:

1. **Google Calendar**:
   - OAuth2 authentication flow
   - Calendar event creation and management
   - Availability synchronization
   - Both real and mock implementations for development

2. **SendGrid**:
   - Email notifications for booking confirmations
   - Contact form submission notifications

## Data Flow

### Booking Flow

1. Client selects a service from the services page
2. Client navigates to booking page and selects available date/time
3. Client enters personal details and confirms booking
4. Backend validates booking request and creates record in database
5. Backend creates corresponding event in Google Calendar
6. Email confirmation is sent to both client and counselor
7. Client is shown confirmation message

### Admin Availability Management

1. Admin logs into the admin calendar page
2. Admin can view and manage availability by date
3. Admin can sync with Google Calendar
4. Admin can manually set available time slots
5. Changes are persisted to the database

## External Dependencies

The application relies on the following key external dependencies:

1. **Frontend**:
   - React ecosystem (React, React DOM)
   - UI component libraries (shadcn/ui, Radix UI)
   - State management and data fetching (Tanstack Query)
   - Form handling (React Hook Form, Zod)
   - Animation (Framer Motion)

2. **Backend**:
   - Express.js for API server
   - Drizzle ORM for database access
   - Google APIs for calendar integration
   - SendGrid for email services
   - TypeScript for type safety

3. **Infrastructure**:
   - PostgreSQL database (via Neon serverless)
   - Replit for hosting and deployment

## Deployment Strategy

The application is deployed on Replit with the following configuration:

1. **Build Process**:
   - Frontend: Vite for development, bundling and optimization
   - Backend: esbuild for TypeScript compilation and bundling
   - Combined build output to `dist` directory

2. **Runtime Environment**:
   - Node.js 20
   - PostgreSQL 16
   - Environment variables for sensitive configuration

3. **Deployment Steps**:
   - Build frontend and backend with `npm run build`
   - Run the production server with `npm run start`
   - Expose port 5000 for HTTP traffic

4. **Environment Variables**:
   - `DATABASE_URL`: PostgreSQL connection string
   - `GOOGLE_CLIENT_ID`: Google API client ID
   - `GOOGLE_CLIENT_SECRET`: Google API client secret
   - `SENDGRID_API_KEY`: SendGrid API key for email services

The deployment configuration in `.replit` ensures the application is properly built and served in the Replit environment.