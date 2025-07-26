import sgMail from '@sendgrid/mail';

// Initialize SendGrid if API key is available
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailOptions {
  to: string;
  subject: string;
  template: string;
  data: any;
}

// Email templates
const templates: Record<string, (data: any) => { html: string; text: string }> = {
  'contact-notification': (data) => ({
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
      <p><strong>Enquiry Type:</strong> ${data.enquiryType}</p>
      <p><strong>Preferred Location:</strong> ${data.preferredLocation || 'Not specified'}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
      <p><strong>Submitted at:</strong> ${data.submittedAt}</p>
    `,
    text: `New Contact Form Submission
From: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Enquiry Type: ${data.enquiryType}
Preferred Location: ${data.preferredLocation || 'Not specified'}
Message: ${data.message}
Submitted at: ${data.submittedAt}`,
  }),

  'contact-confirmation': (data) => ({
    html: `
      <h2>Thank you for contacting Celia Dunsmore Counselling</h2>
      <p>Dear ${data.firstName},</p>
      <p>Thank you for reaching out. I've received your message and will get back to you within 24 hours.</p>
      <p>If you have an urgent matter, please don't hesitate to call me directly at 0438 593 071.</p>
      <p>Warm regards,<br>Celia Dunsmore<br>Accredited Mental Health Social Worker</p>
    `,
    text: `Thank you for contacting Celia Dunsmore Counselling
Dear ${data.firstName},
Thank you for reaching out. I've received your message and will get back to you within 24 hours.
If you have an urgent matter, please don't hesitate to call me directly at 0438 593 071.
Warm regards,
Celia Dunsmore
Accredited Mental Health Social Worker`,
  }),

  'booking-notification': (data) => ({
    html: `
      <h2>New Booking Request</h2>
      <p><strong>Client:</strong> ${data.clientFirstName} ${data.clientLastName}</p>
      <p><strong>Email:</strong> ${data.clientEmail}</p>
      <p><strong>Phone:</strong> ${data.clientPhone}</p>
      <p><strong>Service:</strong> ${data.serviceType}</p>
      <p><strong>Preferred Date:</strong> ${new Date(data.preferredDate).toLocaleDateString('en-AU')}</p>
      <p><strong>Preferred Time:</strong> ${data.preferredTime}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ''}
    `,
    text: `New Booking Request
Client: ${data.clientFirstName} ${data.clientLastName}
Email: ${data.clientEmail}
Phone: ${data.clientPhone}
Service: ${data.serviceType}
Preferred Date: ${new Date(data.preferredDate).toLocaleDateString('en-AU')}
Preferred Time: ${data.preferredTime}
Location: ${data.location}
${data.notes ? `Notes: ${data.notes}` : ''}`,
  }),

  'booking-confirmation': (data) => ({
    html: `
      <h2>Booking Request Received</h2>
      <p>Dear ${data.clientFirstName},</p>
      <p>Thank you for your booking request. I've received your request for a ${data.serviceType} on ${new Date(data.preferredDate).toLocaleDateString('en-AU')} at ${data.preferredTime}.</p>
      <p>I'll contact you within 2 hours during business hours to confirm your appointment.</p>
      <p>Your confirmation code is: <strong>${data.confirmationToken}</strong></p>
      <p>If you need to make any changes, please call me at 0438 593 071.</p>
      <p>Looking forward to meeting you,<br>Celia Dunsmore</p>
    `,
    text: `Booking Request Received
Dear ${data.clientFirstName},
Thank you for your booking request. I've received your request for a ${data.serviceType} on ${new Date(data.preferredDate).toLocaleDateString('en-AU')} at ${data.preferredTime}.
I'll contact you within 2 hours during business hours to confirm your appointment.
Your confirmation code is: ${data.confirmationToken}
If you need to make any changes, please call me at 0438 593 071.
Looking forward to meeting you,
Celia Dunsmore`,
  }),
};

export async function sendEmail(options: EmailOptions): Promise<void> {
  const template = templates[options.template];
  
  if (!template) {
    throw new Error(`Email template '${options.template}' not found`);
  }

  const { html, text } = template(options.data);

  // If SendGrid is not configured, log the email instead
  if (!process.env.SENDGRID_API_KEY) {
    console.log('Email Service: SendGrid not configured, logging email instead');
    console.log('To:', options.to);
    console.log('Subject:', options.subject);
    console.log('Content:', text);
    return;
  }

  try {
    await sgMail.send({
      to: options.to,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@celiadunsmorecounselling.com.au',
      subject: options.subject,
      text,
      html,
    });
    
    console.log(`Email sent successfully to ${options.to}`);
  } catch (error) {
    console.error('SendGrid error:', error);
    throw new Error('Failed to send email');
  }
}