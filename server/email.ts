import { MailService } from '@sendgrid/mail';
import { Booking } from '@shared/schema';
import { logger } from './utils/logger';
import { EmailTemplates, type BookingEmailData, type ContactEmailData } from './utils/emailTemplates';
import { EmailError } from './middleware/errorHandler';

// Initialize SendGrid with the API key
const mailService = new MailService();
const apiKey = process.env.SENDGRID_API_KEY;

// Set the API key if it exists and clean up format if needed
if (apiKey) {
  let cleanApiKey = apiKey;
  // Clean up the API key by removing any prefix
  if (apiKey.includes('=')) {
    cleanApiKey = apiKey.split('=')[1].trim();
  }
  
  mailService.setApiKey(cleanApiKey);
  console.log('SendGrid API key set successfully');
} else {
  console.warn('SENDGRID_API_KEY is not set. Email functionality will be disabled.');
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  const startTime = Date.now();
  
  // Skip sending if no API key
  if (!apiKey) {
    logger.warn('Email not sent - No SendGrid API key configured', 'EMAIL', { to: params.to });
    return false;
  }
  
  try {
    // Validate email parameters
    if (!params.to || !params.from || !params.subject) {
      throw new EmailError('Missing required email parameters');
    }

    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text || '',
      html: params.html || '',
    });
    
    const duration = Date.now() - startTime;
    logger.email(params.to, params.subject, true);
    logger.performance('email_send', duration);
    
    return true;
  } catch (error) {
    const duration = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : 'Unknown email error';
    
    logger.email(params.to, params.subject, false, errorMessage);
    logger.performance('email_send', duration);
    
    // Don't throw error, just return false to allow graceful degradation
    return false;
  }
}

export async function sendContactConfirmation(
  firstName: string, 
  lastName: string, 
  email: string, 
  message: string,
  phone?: string,
  subject?: string,
  preferredContact?: string
): Promise<boolean> {
  logger.info('Sending contact confirmation email', 'EMAIL', { to: email, firstName, lastName });
  
  const fromEmail = 'info@celiadunsmorecounselling.com.au';
  
  const contactData: ContactEmailData = {
    firstName,
    lastName,
    email,
    phone,
    subject,
    message,
    preferredContact
  };
  
  const emailTemplate = EmailTemplates.contactConfirmation(contactData);
  
  const success = await sendEmail({
    to: email,
    from: fromEmail,
    subject: emailTemplate.subject,
    html: emailTemplate.html,
    text: emailTemplate.text
  });

  // TODO: Send admin notification when function is implemented
  // if (success) {
  //   await sendAdminNotification('contact', contactData);
  // }

  return success;
}

export async function sendBookingConfirmation(booking: Booking): Promise<boolean> {
  logger.info('Sending booking confirmation email', 'EMAIL', { bookingId: booking.id });
  
  // Extract client and service info from the booking's JSON fields
  const client = typeof booking.client === 'string' 
    ? JSON.parse(booking.client as string) 
    : booking.client;
    
  const service = typeof booking.service === 'string'
    ? JSON.parse(booking.service as string)
    : booking.service;
  const fromEmail = 'info@celiadunsmorecounselling.com.au';
  
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time: string): string => {
    return time;
  };

  // Construct email content
  const subject = 'Your Appointment Confirmation with Celia Dunsmore Counselling';
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #4EB3A5; margin: 0;">Appointment Confirmation</h1>
        <p style="font-size: 18px; color: #666;">Celia Dunsmore Counselling</p>
      </div>
      
      <div style="background-color: #f7f7f7; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
        <p>Dear ${client.firstName} ${client.lastName},</p>
        <p>Your appointment has been confirmed. Please find the details below:</p>
        
        <div style="margin: 20px 0; padding: 15px; background-color: #ffffff; border-left: 4px solid #4EB3A5; border-radius: 3px;">
          <p><strong>Service:</strong> ${service.name}</p>
          <p><strong>Date:</strong> ${formatDate(booking.date)}</p>
          <p><strong>Time:</strong> ${formatTime(booking.time)}</p>
          <p><strong>Duration:</strong> ${service.duration} minutes</p>
        </div>
        
        <h3 style="color: #4EB3A5;">Location</h3>
        <p>178 Scotchman Rd, Bellingen NSW 2454</p>
        
        <h3 style="color: #4EB3A5;">Preparation</h3>
        <p>Please arrive 5-10 minutes before your appointment. If this is your first session, please bring any relevant referral letters, Medicare card, and health insurance information if applicable.</p>
        
        <h3 style="color: #4EB3A5;">Cancellation Policy</h3>
        <p>If you need to reschedule or cancel your appointment, please provide at least 24 hours notice to avoid a cancellation fee.</p>
      </div>
      
      <div style="text-align: center; font-size: 14px; color: #888; margin-top: 30px;">
        <p>If you have any questions, please contact us at:</p>
        <p>Email: info@celiadunsmorecounselling.com.au | Phone: 0422 804 479</p>
        <p>&copy; ${new Date().getFullYear()} Celia Dunsmore Counselling. All rights reserved.</p>
      </div>
    </div>
  `;
  
  const text = `
    Appointment Confirmation - Celia Dunsmore Counselling
    
    Dear ${client.firstName} ${client.lastName},
    
    Your appointment has been confirmed. Please find the details below:
    
    Service: ${service.name}
    Date: ${formatDate(booking.date)}
    Time: ${formatTime(booking.time)}
    Duration: ${service.duration} minutes
    
    Location: 178 Scotchman Rd, Bellingen NSW 2454
    
    Preparation:
    Please arrive 5-10 minutes before your appointment. If this is your first session, please bring any relevant referral letters, Medicare card, and health insurance information if applicable.
    
    Cancellation Policy:
    If you need to reschedule or cancel your appointment, please provide at least 24 hours notice to avoid a cancellation fee.
    
    If you have any questions, please contact us at:
    Email: info@celiadunsmorecounselling.com.au | Phone: 0422 804 479
    
    © ${new Date().getFullYear()} Celia Dunsmore Counselling. All rights reserved.
  `;
  
  return sendEmail({
    to: client.email,
    from: fromEmail,
    subject: subject,
    html: html,
    text: text
  });
}