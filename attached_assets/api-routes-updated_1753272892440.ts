import { Router } from 'express';
import { z } from 'zod';
import { db, dbHelpers, insertContactSchema, insertBookingSchema } from '../db';
import { sendEmail } from '../services/email';
import { validateRequest } from '../middleware/validation';

const router = Router();

// Contact form submission
router.post('/contact', 
  validateRequest({
    body: z.object({
      firstName: z.string().min(1).max(100),
      lastName: z.string().min(1).max(100),
      email: z.string().email(),
      phone: z.string().optional(),
      enquiryType: z.enum(['general', 'booking', 'medicare', 'fees', 'other']),
      preferredLocation: z.enum(['Brunswick', 'Coburg Bell Street', 'Coburg Solana Psychology', 'Telehealth']).optional(),
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

// Booking submission
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

// Health check with database status
router.get('/health', async (req, res) => {
  const dbConnected = db ? await db.checkDatabaseConnection() : false;
  
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

// Helper function
function generateConfirmationToken(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

export default router;