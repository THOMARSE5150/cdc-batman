// Email service for static mode
// This service handles sending emails directly from the frontend using SendGrid's API

// Types for contact form
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  phone?: string;
  subject?: string;
}

// Types for booking form
export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date?: Date | string;
  time?: string;
  service?: string;
  message?: string;
  additionalInfo?: string;
  medicare?: string;
  referral?: boolean;
  hasMedicare?: boolean;
  haveReferral?: boolean;
}

// Function to send contact form data via SendGrid
export async function sendContactFormEmail(formData: ContactFormData): Promise<boolean> {
  try {
    // In a static deployment, we use SendGrid's API directly
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ 
              email: import.meta.env.VITE_RECIPIENT_EMAIL || 'info@celiadunsmoorecounselling.com.au',
              name: 'Celia Dunsmore Counselling'
            }],
            subject: formData.subject || 'New Contact Form Submission'
          }
        ],
        from: {
          email: 'noreply@celiadunsmoorecounselling.com.au',
          name: 'Website Contact Form'
        },
        reply_to: {
          email: formData.email,
          name: formData.name
        },
        content: [
          {
            type: 'text/plain',
            value: `
Name: ${formData.name}
Email: ${formData.email}
${formData.phone ? `Phone: ${formData.phone}` : ''}

Message:
${formData.message}
            `
          },
          {
            type: 'text/html',
            value: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${formData.name}</p>
<p><strong>Email:</strong> ${formData.email}</p>
${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
<p><strong>Message:</strong></p>
<p>${formData.message.replace(/\n/g, '<br>')}</p>
            `
          }
        ]
      })
    });

    if (response.ok) {
      console.log('Email sent successfully');
      return true;
    } else {
      // Fall back to using the Netlify form system if SendGrid fails
      const netlifyFormData = new FormData();
      netlifyFormData.append('form-name', 'contact');
      Object.entries(formData).forEach(([key, value]) => {
        netlifyFormData.append(key, value.toString());
      });

      await fetch('/', {
        method: 'POST',
        body: netlifyFormData
      });
      return true;
    }
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Final fallback: redirect to mailto: link
    try {
      const subject = encodeURIComponent(formData.subject || 'Contact Form Submission');
      const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
${formData.phone ? `Phone: ${formData.phone}` : ''}

Message:
${formData.message}
      `);
      
      // Open email client as last resort
      window.open(`mailto:info@celiadunsmoorecounselling.com.au?subject=${subject}&body=${body}`);
      return true;
    } catch (e) {
      console.error('Final fallback failed:', e);
      return false;
    }
  }
}

// Function to send booking form data via SendGrid
export async function sendBookingFormEmail(bookingData: BookingFormData): Promise<boolean> {
  try {
    // Format the booking data for email
    const formattedDate = bookingData.date 
      ? (typeof bookingData.date === 'string' 
          ? bookingData.date 
          : bookingData.date.toLocaleDateString('en-AU'))
      : 'Not specified';
      
    // In a static deployment, we use SendGrid's API directly
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ 
              email: import.meta.env.VITE_RECIPIENT_EMAIL || 'info@celiadunsmoorecounselling.com.au',
              name: 'Celia Dunsmore Counselling'
            }],
            subject: 'New Booking Request'
          }
        ],
        from: {
          email: 'noreply@celiadunsmoorecounselling.com.au',
          name: 'Website Booking Form'
        },
        reply_to: {
          email: bookingData.email,
          name: `${bookingData.firstName} ${bookingData.lastName}`
        },
        content: [
          {
            type: 'text/plain',
            value: `
New Booking Request

Client Information:
Name: ${bookingData.firstName} ${bookingData.lastName}
Email: ${bookingData.email}
Phone: ${bookingData.phone}

Appointment Details:
Date: ${formattedDate}
Time: ${bookingData.time || 'Not specified'}
Service: ${bookingData.service || 'Not specified'}

Medicare Information:
Has Medicare: ${bookingData.hasMedicare ? 'Yes' : 'No'}
Has Referral: ${bookingData.haveReferral ? 'Yes' : 'No'}
${bookingData.medicare ? `Medicare Number: ${bookingData.medicare}` : ''}

Additional Information:
${bookingData.message || bookingData.additionalInfo || 'None provided'}
            `
          },
          {
            type: 'text/html',
            value: `
<h2>New Booking Request</h2>

<h3>Client Information:</h3>
<p><strong>Name:</strong> ${bookingData.firstName} ${bookingData.lastName}</p>
<p><strong>Email:</strong> ${bookingData.email}</p>
<p><strong>Phone:</strong> ${bookingData.phone}</p>

<h3>Appointment Details:</h3>
<p><strong>Date:</strong> ${formattedDate}</p>
<p><strong>Time:</strong> ${bookingData.time || 'Not specified'}</p>
<p><strong>Service:</strong> ${bookingData.service || 'Not specified'}</p>

<h3>Medicare Information:</h3>
<p><strong>Has Medicare:</strong> ${bookingData.hasMedicare ? 'Yes' : 'No'}</p>
<p><strong>Has Referral:</strong> ${bookingData.haveReferral ? 'Yes' : 'No'}</p>
${bookingData.medicare ? `<p><strong>Medicare Number:</strong> ${bookingData.medicare}</p>` : ''}

<h3>Additional Information:</h3>
<p>${(bookingData.message || bookingData.additionalInfo || 'None provided').replace(/\n/g, '<br>')}</p>
            `
          }
        ]
      })
    });

    if (response.ok) {
      console.log('Booking email sent successfully');
      return true;
    } else {
      // Fall back to using the Netlify form system if SendGrid fails
      const netlifyFormData = new FormData();
      netlifyFormData.append('form-name', 'booking');
      
      // Convert all form data to string format
      Object.entries(bookingData).forEach(([key, value]) => {
        if (key === 'date' && value instanceof Date) {
          netlifyFormData.append(key, value.toLocaleDateString('en-AU'));
        } else {
          netlifyFormData.append(key, String(value));
        }
      });

      await fetch('/', {
        method: 'POST',
        body: netlifyFormData
      });
      return true;
    }
  } catch (error) {
    console.error('Error sending booking email:', error);
    
    // Final fallback: redirect to mailto: link
    try {
      const subject = encodeURIComponent('Booking Request');
      const formattedDate = bookingData.date 
        ? (typeof bookingData.date === 'string' 
            ? bookingData.date 
            : bookingData.date.toLocaleDateString('en-AU'))
        : 'Not specified';
      
      const body = encodeURIComponent(`
New Booking Request

Client Information:
Name: ${bookingData.firstName} ${bookingData.lastName}
Email: ${bookingData.email}
Phone: ${bookingData.phone}

Appointment Details:
Date: ${formattedDate}
Time: ${bookingData.time || 'Not specified'}
Service: ${bookingData.service || 'Not specified'}

Medicare Information:
Has Medicare: ${bookingData.hasMedicare ? 'Yes' : 'No'}
Has Referral: ${bookingData.haveReferral ? 'Yes' : 'No'}
${bookingData.medicare ? `Medicare Number: ${bookingData.medicare}` : ''}

Additional Information:
${bookingData.message || bookingData.additionalInfo || 'None provided'}
      `);
      
      // Open email client as last resort
      window.open(`mailto:info@celiadunsmoorecounselling.com.au?subject=${subject}&body=${body}`);
      return true;
    } catch (e) {
      console.error('Final fallback failed:', e);
      return false;
    }
  }
}