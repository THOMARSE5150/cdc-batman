import { MailService } from '@sendgrid/mail';
import { Booking } from '@shared/schema';

// Initialize SendGrid with the API key
const mailService = new MailService();
const apiKey = process.env.SENDGRID_API_KEY;

// Set the API key if it exists - removed the format check as it's causing issues
if (apiKey) {
  mailService.setApiKey(apiKey);
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
  // Skip sending if no API key
  if (!apiKey) {
    console.warn('Email not sent to ' + params.to + ' - No SendGrid API key');
    return false;
  }
  
  try {
    await mailService.send({
      to: params.to,
      from: params.from, // This should be a verified sender in your SendGrid account
      subject: params.subject,
      text: params.text || '',
      html: params.html || '',
    });
    console.log(`Email sent successfully to ${params.to}`);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

export async function sendContactConfirmation(firstName: string, lastName: string, email: string, message: string): Promise<boolean> {
  const subject = 'We\'ve Received Your Message - Celia Dunsmore Counselling';
  const fromEmail = 'info@celiadunsmorecounselling.com.au'; // Update with your verified sender
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #4EB3A5; margin: 0;">Thank You for Contacting Us</h1>
        <p style="font-size: 18px; color: #666;">Celia Dunsmore Counselling</p>
      </div>
      
      <div style="background-color: #f7f7f7; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
        <p>Dear ${firstName} ${lastName},</p>
        <p>Thank you for reaching out. I have received your message and will get back to you as soon as possible, usually within 24-48 hours during business days.</p>
        
        <div style="margin: 20px 0; padding: 15px; background-color: #ffffff; border-left: 4px solid #4EB3A5; border-radius: 3px;">
          <p><strong>Your message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        
        <h3 style="color: #4EB3A5;">What happens next?</h3>
        <p>I will review your message and contact you via email or phone. If your matter is urgent, please call me directly at (03) 9123 4567.</p>
      </div>
      
      <div style="text-align: center; font-size: 14px; color: #888; margin-top: 30px;">
        <p>If you have any questions, please contact us at:</p>
        <p>Email: info@celiadunsmorecounselling.com.au | Phone: (03) 9123 4567</p>
        <p>&copy; ${new Date().getFullYear()} Celia Dunsmore Counselling. All rights reserved.</p>
      </div>
    </div>
  `;
  
  const text = `
    Thank You for Contacting Us - Celia Dunsmore Counselling
    
    Dear ${firstName} ${lastName},
    
    Thank you for reaching out. I have received your message and will get back to you as soon as possible, usually within 24-48 hours during business days.
    
    Your message:
    ${message}
    
    What happens next?
    I will review your message and contact you via email or phone. If your matter is urgent, please call me directly at (03) 9123 4567.
    
    If you have any questions, please contact us at:
    Email: info@celiadunsmorecounselling.com.au | Phone: (03) 9123 4567
    
    © ${new Date().getFullYear()} Celia Dunsmore Counselling. All rights reserved.
  `;
  
  return sendEmail({
    to: email,
    from: fromEmail,
    subject: subject,
    html: html,
    text: text
  });
}

export async function sendBookingConfirmation(booking: Booking): Promise<boolean> {
  // Extract client and service info from the booking's JSON fields
  const client = typeof booking.client === 'string' 
    ? JSON.parse(booking.client as string) 
    : booking.client;
    
  const service = typeof booking.service === 'string'
    ? JSON.parse(booking.service as string)
    : booking.service;
  
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
  const fromEmail = 'info@celiadunsmorecounselling.com.au'; // Update this with your verified sender
  
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