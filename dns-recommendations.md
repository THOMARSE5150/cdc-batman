# DNS Configuration Recommendations for celiadunsmorecounselling.com.au

Based on the SEO audit, the following DNS records should be added to improve security and email deliverability:

## SPF Record (Sender Policy Framework)
Add a TXT record for your domain:

**Name:** @ (or celiadunsmorecounselling.com.au)
**Type:** TXT
**Value:** `v=spf1 include:_spf.google.com ~all`

This assumes you're using Google Workspace for email. If using a different email provider, adjust accordingly:
- For SendGrid: `v=spf1 include:sendgrid.net ~all`
- For Microsoft 365: `v=spf1 include:spf.protection.outlook.com ~all`

## DMARC Record (Domain-based Message Authentication)
Add a TXT record for _dmarc subdomain:

**Name:** _dmarc
**Type:** TXT  
**Value:** `v=DMARC1; p=none; rua=mailto:hello@celiadunsmorecounselling.com.au; ruf=mailto:hello@celiadunsmorecounselling.com.au; fo=1`

## DKIM Record
If using Google Workspace, this is automatically configured. For SendGrid or other providers, you'll need to add the DKIM key they provide.

## Additional Security Headers
These are implemented in the server configuration:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Content-Security-Policy with appropriate policies

## Benefits
- **SPF**: Prevents email spoofing by specifying which servers can send email on your behalf
- **DMARC**: Provides reporting and policy enforcement for email authentication
- **Improved SEO**: Search engines favor sites with proper security configurations
- **Professional credibility**: Shows attention to technical details and security

## Implementation Steps
1. Access your domain registrar's DNS management panel
2. Add the TXT records as specified above
3. Wait for DNS propagation (usually 24-48 hours)
4. Test the records using tools like MXToolbox or DMARCian