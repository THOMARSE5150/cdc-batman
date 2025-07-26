import { Request, Response, Router } from 'express';
import { storage } from '../storage';
import { validateRequest } from '../middleware/validation';
import { asyncHandler, ValidationError, errorHandler } from '../middleware/errorHandler';
import { rateLimiters } from '../middleware/rateLimit';
import { requestMonitoring } from '../middleware/monitoring';
import { sanitizeInput } from '../middleware/security';
import { sendBookingConfirmation, sendContactConfirmation } from '../email';
import { insertBookingSchema, insertContactSchema } from '@shared/schema';
import { DatabaseUtils } from '../utils/database';
import { logger } from '../utils/logger';
import { sendEmail } from '../services/email';
import { db, dbHelpers, checkDatabaseConnection } from '../db/index.js';
import { z } from 'zod';
import { sql } from 'drizzle-orm';
import geminiService from '../services/geminiService';

const router = Router();

// Apply middleware to all API routes
router.use(requestMonitoring);
router.use(sanitizeInput);

// Pagination schema for reuse
const paginationSchema = z.object({
  page: z.string().transform(val => parseInt(val, 10)).pipe(z.number().min(1)).optional().default('1'),
  limit: z.string().transform(val => parseInt(val, 10)).pipe(z.number().min(1).max(100)).optional().default('10'),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional()
});

// Contact form submission (enhanced version)
router.post('/contact', 
  validateRequest({
    body: z.object({
      firstName: z.string().min(1).max(100),
      lastName: z.string().min(1).max(100),
      email: z.string().email(),
      phone: z.string().optional(),
      enquiryType: z.enum(['general', 'appointment', 'brunswick', 'coburg-bell', 'coburg-solana', 'telehealth', 'fees', 'urgent']),
      preferredLocation: z.enum(['brunswick_503', 'coburg_81b', 'solana_psych', 'telehealth', 'no_preference']).optional(),
      message: z.string().min(10).max(5000),
    }),
  }),
  async (req, res) => {
    try {
      const contactData = {
        ...req.body,
        status: 'new' as const,
      };

      // Save to database if connected
      let contact = null;
      if (db) {
        try {
          contact = await dbHelpers.createContact(contactData);
          console.log('Contact saved to database:', contact.id);
        } catch (dbError) {
          console.error('Database error (non-fatal):', dbError);
          // Continue even if database fails
        }
      }

      // Send email notification
      try {
        await sendEmail({
          to: 'hello@celiadunsmorecounselling.com.au',
          subject: `New Contact Form Submission - ${req.body.enquiryType}`,
          template: 'contact-notification',
          data: {
            ...req.body,
            submittedAt: new Date().toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' }),
          },
        });

        // Send confirmation email to client
        await sendEmail({
          to: req.body.email,
          subject: 'Thank you for contacting Celia Dunsmore Counselling',
          template: 'contact-confirmation',
          data: {
            firstName: req.body.firstName,
          },
        });
      } catch (emailError) {
        console.error('Email error:', emailError);
        // Continue - don't fail the request if email fails
      }

      res.status(200).json({
        success: true,
        message: "Thank you for your message. I'll get back to you within 24 hours!",
        referenceId: contact?.id,
      });
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({
        success: false,
        message: 'Sorry, there was an error processing your request. Please try again or email directly.',
      });
    }
  }
);

// Original contact endpoint for backward compatibility
router.post('/contacts',
  // rateLimiters.contactForm, // Rate limiting disabled for now
  validateRequest({
    body: insertContactSchema.extend({
      firstName: z.string().min(1).max(50),
      lastName: z.string().min(1).max(50),
      email: z.string().email(),
      phone: z.string().optional(),
      subject: z.string().optional(),
      message: z.string().min(1).max(2000),
      preferredContact: z.string().optional(),
      urgency: z.string().optional()
    })
  }),
  asyncHandler(async (req: Request, res: Response) => {
    logger.info('Contact form submission received', 'API', { 
      email: req.body.email, 
      firstName: req.body.firstName,
      ip: req.ip 
    });

    const startTime = Date.now();

    // Create contact record
    const contact = await storage.createContact(req.body);

    // Send confirmation email (non-blocking)
    sendContactConfirmation(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.message,
      req.body.phone,
      req.body.subject,
      req.body.preferredContact
    ).catch(error => {
      logger.error('Failed to send contact confirmation email', 'EMAIL', { 
        contactId: contact.id,
        error: error.message 
      });
    });

    const duration = Date.now() - startTime;
    logger.database('INSERT', 'contacts', duration, true);

    res.status(201).json({
      success: true,
      data: contact,
      message: 'Contact form submitted successfully'
    });
  })
);

router.get('/contacts',
  validateRequest({ query: paginationSchema }),
  asyncHandler(async (req: Request, res: Response) => {
    const { page, limit, search, sortBy, sortOrder } = req.query as any;
    const startTime = Date.now();

    // Get all contacts
    const allContacts = await storage.getAllContacts();

    // Apply search if provided
    let filteredContacts = allContacts;
    if (search) {
      filteredContacts = DatabaseUtils.applySearch(
        allContacts,
        search,
        ['firstName', 'lastName', 'email', 'message']
      );
    }

    // Apply sorting if provided
    if (sortBy && ['firstName', 'lastName', 'email', 'createdAt'].includes(sortBy)) {
      const sortOptions = DatabaseUtils.validateSort(sortBy, sortOrder || 'desc', 
        ['firstName', 'lastName', 'email', 'createdAt']);
      if (sortOptions) {
        filteredContacts = DatabaseUtils.applySorting(filteredContacts, sortOptions);
      }
    }

    // Apply pagination
    const pagination = DatabaseUtils.validatePagination(page, limit);
    const result = DatabaseUtils.applyPagination(filteredContacts, pagination);

    const duration = Date.now() - startTime;
    logger.database('SELECT', 'contacts', duration, true);

    res.json({
      success: true,
      data: result.data,
      pagination: {
        currentPage: result.currentPage,
        totalPages: result.totalPages,
        totalItems: result.totalItems,
        itemsPerPage: limit,
        hasNextPage: result.hasNextPage,
        hasPreviousPage: result.hasPreviousPage
      }
    });
  })
);

router.get('/contacts/:id',
  validateRequest({ params: z.object({ id: z.string().regex(/^\d+$/) }) }),
  asyncHandler(async (req: Request, res: Response) => {
    const id = DatabaseUtils.validateId(req.params.id);
    const startTime = Date.now();

    const contact = await storage.getContact(id);

    const duration = Date.now() - startTime;
    logger.database('SELECT', 'contacts', duration, !!contact);

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });
  })
);

// Enhanced booking submission endpoint
router.post('/bookings',
  validateRequest({
    body: z.object({
      clientFirstName: z.string().min(1).max(100),
      clientLastName: z.string().min(1).max(100),
      clientEmail: z.string().email(),
      clientPhone: z.string().min(10).max(20),
      serviceType: z.enum(['Initial Assessment', 'Standard Session', 'Couples Counselling']),
      preferredDate: z.string().transform(str => new Date(str)),
      preferredTime: z.string().regex(/^\d{2}:\d{2}$/),
      location: z.enum(['Brunswick', 'Coburg Bell Street', 'Coburg Solana Psychology', 'Telehealth']),
      notes: z.string().optional(),
    }),
  }),
  async (req, res) => {
    try {
      const bookingData = {
        ...req.body,
        status: 'pending' as const,
        confirmationToken: generateConfirmationToken(),
      };

      // Save to database if connected
      let booking = null;
      if (db) {
        try {
          booking = await dbHelpers.createBooking(bookingData);
          console.log('Booking saved to database:', booking.id);
        } catch (dbError) {
          console.error('Database error (non-fatal):', dbError);
        }
      }

      // Send notification emails
      try {
        await sendEmail({
          to: 'hello@celiadunsmorecounselling.com.au',
          subject: `New Booking Request - ${req.body.serviceType}`,
          template: 'booking-notification',
          data: bookingData,
        });

        await sendEmail({
          to: req.body.clientEmail,
          subject: 'Booking Request Received - Celia Dunsmore Counselling',
          template: 'booking-confirmation',
          data: {
            ...bookingData,
            confirmationLink: `${process.env.SITE_URL}/booking/confirm/${bookingData.confirmationToken}`,
          },
        });
      } catch (emailError) {
        console.error('Email error:', emailError);
      }

      res.status(200).json({
        success: true,
        message: "Booking request received. I'll contact you within 2 hours to confirm.",
        bookingId: booking?.id,
        confirmationToken: bookingData.confirmationToken,
      });
    } catch (error) {
      console.error('Booking error:', error);
      res.status(500).json({
        success: false,
        message: 'Sorry, there was an error with your booking. Please try again or call directly.',
      });
    }
  }
);

// Original booking endpoint for backward compatibility
router.post('/bookings-legacy',
  rateLimiters.bookingForm,
  validateRequest({ body: insertBookingSchema }),
  asyncHandler(async (req: Request, res: Response) => {
    logger.info('Booking request received', 'API', { 
      service: req.body.service,
      preferredDate: req.body.preferredDate,
      ip: req.ip 
    });

    const startTime = Date.now();

    // Create booking record
    const booking = await storage.createBooking(req.body);

    // Send confirmation email (non-blocking)
    sendBookingConfirmation(booking).catch(error => {
      logger.error('Failed to send booking confirmation email', 'EMAIL', { 
        bookingId: booking.id,
        error: error.message 
      });
    });

    const duration = Date.now() - startTime;
    logger.database('INSERT', 'bookings', duration, true);

    res.status(201).json({
      success: true,
      data: booking,
      message: 'Booking request submitted successfully'
    });
  })
);

router.get('/bookings',
  validateRequest({ query: paginationSchema }),
  asyncHandler(async (req: Request, res: Response) => {
    const { page, limit, search, sortBy, sortOrder } = req.query as any;
    const startTime = Date.now();

    // Get all bookings
    const allBookings = await storage.getAllBookings();

    // Apply search if provided (search in client names and service info)
    let filteredBookings = allBookings;
    if (search) {
      filteredBookings = allBookings.filter(booking => {
        const client = typeof booking.client === 'string' 
          ? JSON.parse(booking.client) 
          : booking.client;
        const service = typeof booking.service === 'string'
          ? JSON.parse(booking.service)
          : booking.service;
        
        const searchLower = search.toLowerCase();
        return (
          client.firstName?.toLowerCase().includes(searchLower) ||
          client.lastName?.toLowerCase().includes(searchLower) ||
          client.email?.toLowerCase().includes(searchLower) ||
          service.name?.toLowerCase().includes(searchLower)
        );
      });
    }

    // Apply sorting if provided
    if (sortBy && ['date', 'time', 'createdAt'].includes(sortBy)) {
      const sortOptions = DatabaseUtils.validateSort(sortBy, sortOrder || 'desc', 
        ['date', 'time', 'createdAt']);
      if (sortOptions) {
        filteredBookings = DatabaseUtils.applySorting(filteredBookings, sortOptions);
      }
    }

    // Apply pagination
    const pagination = DatabaseUtils.validatePagination(page, limit);
    const result = DatabaseUtils.applyPagination(filteredBookings, pagination);

    const duration = Date.now() - startTime;
    logger.database('SELECT', 'bookings', duration, true);

    res.json({
      success: true,
      data: result.data,
      pagination: {
        currentPage: result.currentPage,
        totalPages: result.totalPages,
        totalItems: result.totalItems,
        itemsPerPage: limit,
        hasNextPage: result.hasNextPage,
        hasPreviousPage: result.hasPreviousPage
      }
    });
  })
);

router.get('/bookings/:id',
  validateRequest({ params: z.object({ id: z.string().regex(/^\d+$/) }) }),
  asyncHandler(async (req: Request, res: Response) => {
    const id = DatabaseUtils.validateId(req.params.id);
    const startTime = Date.now();

    const booking = await storage.getBooking(id);

    const duration = Date.now() - startTime;
    logger.database('SELECT', 'bookings', duration, !!booking);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  })
);

// Practice locations endpoints
router.get('/locations',
  asyncHandler(async (req: Request, res: Response) => {
    const startTime = Date.now();
    const locations = await storage.getActivePracticeLocations();
    const duration = Date.now() - startTime;
    
    logger.database('SELECT', 'practiceLocations', duration, true);

    res.json({
      success: true,
      data: locations
    });
  })
);

// Availability endpoints (when calendar integration is ready)
router.get('/availability',
  rateLimiters.calendarAvailability,
  validateRequest({ 
    query: z.object({
      startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      locationId: z.string().optional()
    })
  }),
  asyncHandler(async (req: Request, res: Response) => {
    const { startDate, endDate, locationId } = req.query as any;
    
    logger.info('Availability check requested', 'API', { 
      startDate, 
      endDate, 
      locationId,
      ip: req.ip 
    });

    // TODO: Implement actual calendar availability check
    // For now, return mock data to maintain API contract
    const mockAvailability = [
      { date: startDate, slots: ['9:00 AM', '10:00 AM', '2:00 PM'] },
      { date: endDate, slots: ['11:00 AM', '3:00 PM', '4:00 PM'] }
    ];

    res.json({
      success: true,
      data: mockAvailability,
      message: 'Calendar integration pending - showing sample availability'
    });
  })
);

// Health check with database status (enhanced version)
router.get('/health', async (req, res) => {
  let dbConnected = false;
  if (db) {
    try {
      // Simple database test
      await db.execute(sql`SELECT 1`);
      dbConnected = true;
    } catch (error) {
      dbConnected = false;
    }
  }
  
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    services: {
      database: dbConnected ? 'connected' : 'disconnected',
      email: !!process.env.SENDGRID_API_KEY ? 'configured' : 'not configured',
    },
  });
});

// Error logging endpoint
router.post('/errors',
  validateRequest({
    body: z.object({
      message: z.string(),
      stack: z.string().optional(),
      componentStack: z.string().optional(),
      timestamp: z.string(),
      userAgent: z.string(),
      url: z.string(),
    }),
  }),
  async (req, res) => {
    console.error('Client error reported:', req.body);
    
    // In production, you'd want to send this to a monitoring service
    // For now, just log it
    
    res.status(200).json({ received: true });
  }
);

// AI Chat endpoint for Gemini integration
router.post('/ai/chat', async (req: Request, res: Response) => {
  try {
    const { message, context } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Message is required and must be a string'
      });
    }
    
    console.log('AI Chat request received:', { 
      messageLength: message.length,
      hasContext: !!context 
    });

    const aiResponse = await geminiService.generateResponse(message, context);
    
    console.log('AI Chat response generated:', {
      urgencyLevel: aiResponse.urgencyLevel,
      shouldEscalate: aiResponse.shouldEscalate,
      responseLength: aiResponse.message.length
    });

    res.json({
      success: true,
      data: aiResponse
    });
  } catch (error) {
    console.error('AI Chat error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate AI response',
      data: {
        message: "I'm experiencing a technical issue. For immediate assistance, please call Celia directly at (03) 9041 5031.",
        urgencyLevel: 8,
        shouldEscalate: true,
        suggestedActions: ['Call Celia directly: (03) 9041 5031'],
        resources: ['Emergency contact: (03) 9041 5031']
      }
    });
  }
});

// AI service health check
router.get('/ai/health', async (req: Request, res: Response) => {
  try {
    const healthStatus = await geminiService.healthCheck();
    
    res.json({
      success: true,
      data: {
        status: healthStatus.status,
        geminiConfigured: healthStatus.apiKeyConfigured,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('AI health check error:', error);
    res.status(500).json({
      success: false,
      data: {
        status: 'error',
        geminiConfigured: false,
        timestamp: new Date().toISOString()
      }
    });
  }
});

// Helper function
function generateConfirmationToken(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}



export default router;