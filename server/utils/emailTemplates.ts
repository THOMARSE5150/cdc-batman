export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface BookingEmailData {
  firstName: string;
  lastName: string;
  serviceName: string;
  preferredDate: string;
  preferredTime: string;
  location: string;
  duration: number;
  price: number;
  withRebate?: number;
  medicareNumber?: string;
  notes?: string;
}

export interface ContactEmailData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  preferredContact?: string;
  urgency?: string;
}

export class EmailTemplates {
  private static readonly PRIMARY_COLOR = '#4EB3A5';
  private static readonly SECONDARY_COLOR = '#2D8A7D';
  private static readonly BACKGROUND_COLOR = '#f7f9fc';
  private static readonly BORDER_COLOR = '#e2e8f0';

  private static createBaseTemplate(content: string): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Celia Dunsmore Counselling</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                margin: 0;
                padding: 0;
                background-color: ${this.BACKGROUND_COLOR};
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background: linear-gradient(135deg, ${this.PRIMARY_COLOR} 0%, ${this.SECONDARY_COLOR} 100%);
                color: white;
                padding: 30px 40px;
                text-align: center;
            }
            .header h1 {
                margin: 0 0 10px 0;
                font-size: 24px;
                font-weight: 600;
            }
            .header p {
                margin: 0;
                opacity: 0.9;
                font-size: 16px;
            }
            .content {
                padding: 40px;
            }
            .greeting {
                font-size: 18px;
                margin-bottom: 20px;
                color: #2d3748;
            }
            .info-box {
                background: ${this.BACKGROUND_COLOR};
                border: 1px solid ${this.BORDER_COLOR};
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
            }
            .info-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 0;
                border-bottom: 1px solid #f1f5f9;
            }
            .info-row:last-child {
                border-bottom: none;
            }
            .info-label {
                font-weight: 600;
                color: #4a5568;
                flex: 1;
            }
            .info-value {
                color: #2d3748;
                flex: 2;
                text-align: right;
            }
            .highlight {
                background: linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%);
                border: 1px solid #4fd1c7;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
            }
            .highlight h3 {
                margin: 0 0 10px 0;
                color: ${this.SECONDARY_COLOR};
            }
            .button {
                display: inline-block;
                background: ${this.PRIMARY_COLOR};
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 6px;
                font-weight: 600;
                margin: 20px 0;
            }
            .footer {
                background: #f8fafc;
                padding: 30px 40px;
                text-align: center;
                border-top: 1px solid ${this.BORDER_COLOR};
                color: #64748b;
                font-size: 14px;
            }
            .contact-info {
                margin: 20px 0;
            }
            .contact-info p {
                margin: 5px 0;
            }
            @media only screen and (max-width: 600px) {
                .container {
                    margin: 10px;
                    border-radius: 8px;
                }
                .header, .content, .footer {
                    padding: 20px;
                }
                .info-row {
                    flex-direction: column;
                    align-items: flex-start;
                }
                .info-value {
                    text-align: left;
                    margin-top: 5px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            ${content}
        </div>
    </body>
    </html>`;
  }

  static bookingConfirmation(data: BookingEmailData): EmailTemplate {
    const content = `
            <div class="header">
                <h1>Booking Request Received</h1>
                <p>Thank you for choosing Celia Dunsmore Counselling</p>
            </div>
            
            <div class="content">
                <div class="greeting">
                    Dear ${data.firstName} ${data.lastName},
                </div>
                
                <p>Thank you for your booking request. I have received your details and will contact you within 24 hours to confirm your appointment and discuss any questions you may have.</p>
                
                <div class="info-box">
                    <h3 style="margin-top: 0; color: ${this.SECONDARY_COLOR};">Booking Details</h3>
                    <div class="info-row">
                        <span class="info-label">Service:</span>
                        <span class="info-value">${data.serviceName}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Duration:</span>
                        <span class="info-value">${data.duration} minutes</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Preferred Date:</span>
                        <span class="info-value">${data.preferredDate}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Preferred Time:</span>
                        <span class="info-value">${data.preferredTime}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Location:</span>
                        <span class="info-value">${data.location}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Fee:</span>
                        <span class="info-value">$${data.price}${data.withRebate ? ` ($${data.withRebate} with Medicare rebate)` : ''}</span>
                    </div>
                </div>

                ${data.notes ? `
                <div class="info-box">
                    <h3 style="margin-top: 0; color: ${this.SECONDARY_COLOR};">Additional Notes</h3>
                    <p style="margin: 0; white-space: pre-wrap;">${data.notes}</p>
                </div>
                ` : ''}

                <div class="highlight">
                    <h3>What happens next?</h3>
                    <p>I will review your booking request and contact you within 24 hours to:</p>
                    <ul style="margin: 10px 0;">
                        <li>Confirm your appointment time</li>
                        <li>Provide location details and parking information</li>
                        <li>Answer any questions you may have</li>
                        <li>Discuss payment options and Medicare rebates</li>
                    </ul>
                </div>

                <p><strong>Urgent matters:</strong> If you need immediate assistance, please contact me directly at (03) 9123 4567.</p>
            </div>

            <div class="footer">
                <div class="contact-info">
                    <p><strong>Celia Dunsmore</strong><br>
                    Accredited Mental Health Social Worker</p>
                    <p>📍 Brunswick & Coburg locations<br>
                    📞 (03) 9123 4567<br>
                    ✉️ info@celiadunsmorecounselling.com.au</p>
                    <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">
                        This email was sent in response to your booking request on our website.<br>
                        If you didn't make this request, please contact us immediately.
                    </p>
                </div>
            </div>`;

    const textVersion = `
Dear ${data.firstName} ${data.lastName},

Thank you for your booking request with Celia Dunsmore Counselling.

BOOKING DETAILS:
- Service: ${data.serviceName}
- Duration: ${data.duration} minutes
- Preferred Date: ${data.preferredDate}
- Preferred Time: ${data.preferredTime}
- Location: ${data.location}
- Fee: $${data.price}${data.withRebate ? ` ($${data.withRebate} with Medicare rebate)` : ''}

${data.notes ? `Additional Notes: ${data.notes}` : ''}

WHAT HAPPENS NEXT:
I will contact you within 24 hours to confirm your appointment and provide all necessary details.

For urgent matters, please call (03) 9123 4567.

Best regards,
Celia Dunsmore
Accredited Mental Health Social Worker
Phone: (03) 9123 4567
Email: info@celiadunsmorecounselling.com.au`;

    return {
      subject: 'Booking Request Received - Celia Dunsmore Counselling',
      html: this.createBaseTemplate(content),
      text: textVersion
    };
  }

  static contactConfirmation(data: ContactEmailData): EmailTemplate {
    const content = `
            <div class="header">
                <h1>Message Received</h1>
                <p>Thank you for contacting Celia Dunsmore Counselling</p>
            </div>
            
            <div class="content">
                <div class="greeting">
                    Dear ${data.firstName} ${data.lastName},
                </div>
                
                <p>Thank you for reaching out. I have received your message and will respond as soon as possible, typically within 24-48 hours during business days.</p>
                
                <div class="info-box">
                    <h3 style="margin-top: 0; color: ${this.SECONDARY_COLOR};">Your Message</h3>
                    ${data.subject ? `
                    <div class="info-row">
                        <span class="info-label">Subject:</span>
                        <span class="info-value">${data.subject}</span>
                    </div>
                    ` : ''}
                    <div style="background: white; padding: 15px; border-radius: 6px; margin-top: 15px;">
                        <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
                    </div>
                </div>

                <div class="info-box">
                    <h3 style="margin-top: 0; color: ${this.SECONDARY_COLOR};">Contact Information</h3>
                    <div class="info-row">
                        <span class="info-label">Email:</span>
                        <span class="info-value">${data.email}</span>
                    </div>
                    ${data.phone ? `
                    <div class="info-row">
                        <span class="info-label">Phone:</span>
                        <span class="info-value">${data.phone}</span>
                    </div>
                    ` : ''}
                    ${data.preferredContact ? `
                    <div class="info-row">
                        <span class="info-label">Preferred Contact:</span>
                        <span class="info-value">${data.preferredContact}</span>
                    </div>
                    ` : ''}
                </div>

                <div class="highlight">
                    <h3>What happens next?</h3>
                    <p>I will review your message and respond via your preferred contact method. I typically respond within 24-48 hours during business days (Monday to Friday).</p>
                </div>

                <p><strong>Urgent matters:</strong> If your matter is urgent, please call me directly at (03) 9123 4567.</p>
                
                <p>If you'd like to book an appointment, you can also use our online booking system on the website.</p>
            </div>

            <div class="footer">
                <div class="contact-info">
                    <p><strong>Celia Dunsmore</strong><br>
                    Accredited Mental Health Social Worker</p>
                    <p>📍 Brunswick & Coburg locations<br>
                    📞 (03) 9123 4567<br>
                    ✉️ info@celiadunsmorecounselling.com.au</p>
                    <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">
                        This email was sent in response to your contact form submission.<br>
                        If you didn't send this message, please contact us immediately.
                    </p>
                </div>
            </div>`;

    const textVersion = `
Dear ${data.firstName} ${data.lastName},

Thank you for contacting Celia Dunsmore Counselling.

YOUR MESSAGE:
${data.subject ? `Subject: ${data.subject}` : ''}
${data.message}

CONTACT DETAILS:
- Email: ${data.email}
${data.phone ? `- Phone: ${data.phone}` : ''}
${data.preferredContact ? `- Preferred Contact: ${data.preferredContact}` : ''}

I will respond within 24-48 hours during business days.

For urgent matters, please call (03) 9123 4567.

Best regards,
Celia Dunsmore
Accredited Mental Health Social Worker
Phone: (03) 9123 4567
Email: info@celiadunsmorecounselling.com.au`;

    return {
      subject: 'Message Received - Celia Dunsmore Counselling',
      html: this.createBaseTemplate(content),
      text: textVersion
    };
  }

  static adminNotification(type: 'booking' | 'contact', data: BookingEmailData | ContactEmailData): EmailTemplate {
    const isBooking = type === 'booking';
    const bookingData = isBooking ? data as BookingEmailData : null;
    const contactData = !isBooking ? data as ContactEmailData : null;

    const content = `
            <div class="header">
                <h1>New ${isBooking ? 'Booking Request' : 'Contact Message'}</h1>
                <p>Website submission received</p>
            </div>
            
            <div class="content">
                <div class="greeting">
                    New ${isBooking ? 'booking request' : 'contact message'} from ${data.firstName} ${data.lastName}
                </div>
                
                ${isBooking && bookingData ? `
                <div class="info-box">
                    <h3 style="margin-top: 0; color: ${this.SECONDARY_COLOR};">Booking Details</h3>
                    <div class="info-row">
                        <span class="info-label">Service:</span>
                        <span class="info-value">${bookingData.serviceName}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Preferred Date:</span>
                        <span class="info-value">${bookingData.preferredDate}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Preferred Time:</span>
                        <span class="info-value">${bookingData.preferredTime}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Location:</span>
                        <span class="info-value">${bookingData.location}</span>
                    </div>
                    ${bookingData.medicareNumber ? `
                    <div class="info-row">
                        <span class="info-label">Medicare Number:</span>
                        <span class="info-value">${bookingData.medicareNumber}</span>
                    </div>
                    ` : ''}
                </div>
                ` : ''}

                ${!isBooking && contactData ? `
                <div class="info-box">
                    <h3 style="margin-top: 0; color: ${this.SECONDARY_COLOR};">Message Details</h3>
                    ${contactData.subject ? `
                    <div class="info-row">
                        <span class="info-label">Subject:</span>
                        <span class="info-value">${contactData.subject}</span>
                    </div>
                    ` : ''}
                    <div style="background: white; padding: 15px; border-radius: 6px; margin-top: 15px;">
                        <p style="margin: 0; white-space: pre-wrap;">${contactData.message}</p>
                    </div>
                </div>
                ` : ''}

                <div class="info-box">
                    <h3 style="margin-top: 0; color: ${this.SECONDARY_COLOR};">Contact Information</h3>
                    <div class="info-row">
                        <span class="info-label">Name:</span>
                        <span class="info-value">${data.firstName} ${data.lastName}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Email:</span>
                        <span class="info-value">${isBooking ? 'N/A' : (contactData?.email || 'N/A')}</span>
                    </div>
                    ${contactData?.phone || bookingData ? `
                    <div class="info-row">
                        <span class="info-label">Phone:</span>
                        <span class="info-value">${contactData?.phone || 'N/A'}</span>
                    </div>
                    ` : ''}
                </div>

                ${(bookingData?.notes || contactData?.urgency) ? `
                <div class="info-box">
                    <h3 style="margin-top: 0; color: ${this.SECONDARY_COLOR};">Additional Information</h3>
                    ${bookingData?.notes ? `<p><strong>Notes:</strong> ${bookingData.notes}</p>` : ''}
                    ${contactData?.urgency ? `<p><strong>Urgency:</strong> ${contactData.urgency}</p>` : ''}
                </div>
                ` : ''}

                <div class="highlight">
                    <h3>Action Required</h3>
                    <p>Please follow up with this client within 24 hours to ${isBooking ? 'confirm the booking' : 'respond to their message'}.</p>
                </div>
            </div>

            <div class="footer">
                <p>This notification was automatically generated from your website.</p>
                <p style="font-size: 12px; color: #9ca3af;">
                    Received at: ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' })}
                </p>
            </div>`;

    const textVersion = `
New ${isBooking ? 'Booking Request' : 'Contact Message'} from ${data.firstName} ${data.lastName}

${isBooking && bookingData ? `
BOOKING DETAILS:
- Service: ${bookingData.serviceName}
- Preferred Date: ${bookingData.preferredDate}
- Preferred Time: ${bookingData.preferredTime}
- Location: ${bookingData.location}
${bookingData.medicareNumber ? `- Medicare Number: ${bookingData.medicareNumber}` : ''}
` : ''}

${!isBooking && contactData ? `
MESSAGE:
${contactData.subject ? `Subject: ${contactData.subject}` : ''}
${contactData.message}
` : ''}

CONTACT INFORMATION:
- Name: ${data.firstName} ${data.lastName}
- Email: ${isBooking ? 'N/A' : (contactData?.email || 'N/A')}
${contactData?.phone ? `- Phone: ${contactData.phone}` : ''}

${(bookingData?.notes || contactData?.urgency) ? `
ADDITIONAL INFORMATION:
${bookingData?.notes ? `Notes: ${bookingData.notes}` : ''}
${contactData?.urgency ? `Urgency: ${contactData.urgency}` : ''}
` : ''}

ACTION REQUIRED: Please follow up within 24 hours.

Received: ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' })}`;

    return {
      subject: `New ${isBooking ? 'Booking Request' : 'Contact Message'} - ${data.firstName} ${data.lastName}`,
      html: this.createBaseTemplate(content),
      text: textVersion
    };
  }
}