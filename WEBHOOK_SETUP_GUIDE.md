# Railway Webhook Setup Guide

## Overview
Your mental health platform now includes comprehensive deployment monitoring through Railway webhooks. This system will automatically notify you of deployment status changes and resource alerts.

## Webhook Endpoints

### Main Railway Webhook
- **URL**: `https://your-domain.com/webhooks/railway`
- **Method**: POST
- **Purpose**: Receives deployment status and volume usage alerts

### Health Check
- **URL**: `https://your-domain.com/webhooks/health`
- **Method**: GET
- **Purpose**: Verify webhook system is operational

### Test Endpoint
- **URL**: `https://your-domain.com/webhooks/test`
- **Method**: POST
- **Purpose**: Test webhook functionality during setup

## Setting Up Railway Webhooks

### Step 1: Configure Environment Variables
Add these environment variables to your Railway project:

```bash
# Required: Your practice email for notifications
PRACTICE_EMAIL=celiadunsmore@outlook.com

# Optional: Webhook security (recommended for production)
RAILWAY_WEBHOOK_SECRET=your-secret-key-here

# Required: SendGrid configuration (already configured)
SENDGRID_API_KEY=your-existing-sendgrid-key
SENDGRID_FROM_EMAIL=noreply@celiadunsmore.com
```

### Step 2: Railway Dashboard Configuration

1. **Access Railway Dashboard**
   - Go to your Railway project dashboard
   - Navigate to the "Settings" tab

2. **Add Webhook**
   - Click "Webhooks" in the sidebar
   - Click "Add Webhook"
   - Enter webhook URL: `https://your-domain.com/webhooks/railway`

3. **Configure Events**
   Select these events to monitor:
   - ✅ **Deployment Status Changes** (SUCCESS, FAILED, CRASHED)
   - ✅ **Volume Usage Alerts** (when storage reaches thresholds)

4. **Optional: Add Webhook Secret**
   - Generate a secure random string
   - Add it as `RAILWAY_WEBHOOK_SECRET` environment variable
   - Enter the same secret in Railway webhook configuration

### Step 3: Test Your Webhook

1. **Health Check**
   ```bash
   curl https://your-domain.com/webhooks/health
   ```
   Should return: `{"status":"healthy","webhooks":{"railway":"active"}}`

2. **Test Webhook**
   ```bash
   curl -X POST https://your-domain.com/webhooks/test \
     -H "Content-Type: application/json" \
     -d '{"test": "webhook setup"}'
   ```

## Notification Features

### Deployment Notifications
You'll receive email notifications for:

- **✅ Successful Deployments**
  - Confirmation your website is live
  - Deployment details and URL
  - Timestamp of completion

- **❌ Failed Deployments**
  - Alert about deployment failure
  - Deployment ID for troubleshooting
  - Recommendation to check Railway dashboard

### Volume Usage Alerts
You'll receive warnings when:

- **Database storage** reaches configured thresholds (e.g., 80%, 90%)
- **Recommendations** for managing storage
- **Action items** to prevent service disruption

## Email Notification Examples

### Successful Deployment Email
```
Subject: ✅ Deployment SUCCESS - Celia Dunsmore Counselling

Your Celia Dunsmore Counselling website has been successfully deployed.

Project: Celia Dunsmore Counselling
Environment: production
Status: SUCCESS
Time: 2025-07-18 10:30:15 PM
URL: https://your-domain.com

✓ Your website is now live! Clients can access your counselling services and book appointments.
```

### Storage Alert Email
```
Subject: ⚠️ Storage Alert - Database at 85%

Your database storage is reaching capacity and may need attention.

Project: Celia Dunsmore Counselling
Volume: Database
Usage: 85%
Alert Threshold: 80%

Recommended Actions:
- Review and clean up old booking records if appropriate
- Consider upgrading your Railway plan for more storage
- Monitor usage patterns to understand growth trends
```

## Security Features

### Webhook Signature Validation
- All webhooks are validated using HMAC-SHA256 signatures
- Protects against unauthorized webhook calls
- Automatically logs invalid signature attempts

### Error Handling
- Comprehensive error logging for debugging
- Graceful degradation if email service is unavailable
- Performance monitoring for webhook processing times

## Monitoring and Logs

### Application Logs
Webhook activity is logged with:
- Event types received (deployment, volume_alert)
- Processing duration
- Email delivery status
- Any errors or warnings

### Dashboard Integration
- Webhook health status available at `/webhooks/health`
- Integration with existing monitoring system
- Performance metrics tracking

## Troubleshooting

### Common Issues

1. **Webhook Not Receiving Events**
   - Verify Railway webhook URL is correct
   - Check that your domain is accessible from Railway
   - Ensure webhook events are properly selected

2. **Email Notifications Not Sending**
   - Verify `SENDGRID_API_KEY` is correctly configured
   - Check `PRACTICE_EMAIL` environment variable
   - Review application logs for email errors

3. **Invalid Signature Errors**
   - Ensure `RAILWAY_WEBHOOK_SECRET` matches Railway configuration
   - Verify webhook secret is properly URL-encoded

### Testing Commands

```bash
# Test webhook endpoint accessibility
curl -I https://your-domain.com/webhooks/railway

# Test health check
curl https://your-domain.com/webhooks/health

# View webhook logs (if you have log access)
railway logs --follow
```

## Benefits for Your Practice

### Immediate Awareness
- Know instantly if your website goes offline
- Receive alerts before storage issues cause problems
- Stay informed of all deployment changes

### Professional Reliability
- Proactive monitoring prevents client access issues
- Automated notifications reduce manual monitoring
- Professional-grade infrastructure monitoring

### Peace of Mind
- 24/7 monitoring of your mental health platform
- Automatic alerts allow quick response to issues
- Ensures your clients can always access your services

## Next Steps

After setting up Railway webhooks, consider:

1. **Google Calendar Webhooks** - Get notified of appointment changes
2. **Client Communication Webhooks** - Automate follow-up sequences
3. **Backup Monitoring** - Alerts when data backups complete
4. **Security Webhooks** - Notifications for suspicious activity

Your webhook system is now ready to provide professional-grade monitoring for your mental health practice!