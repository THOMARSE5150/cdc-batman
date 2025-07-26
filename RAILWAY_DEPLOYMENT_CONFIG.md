# Railway Deployment Configuration Guide

## Pre-Deployment Checklist ✅

Your webhook system is **READY FOR PRODUCTION**! Here's what's confirmed working:

### ✅ Webhook System Status
- **Health Check Endpoint**: `/webhooks/health` - ACTIVE
- **Test Endpoint**: `/webhooks/test` - WORKING
- **Railway Webhook**: `/webhooks/railway` - READY
- **Security**: HMAC-SHA256 signature validation implemented
- **Logging**: Comprehensive webhook activity tracking
- **Email Integration**: Professional HTML notifications ready

### ✅ Verified Features
- Deployment success/failure notifications
- Volume usage alerts
- Professional email templates
- Error handling and logging
- Performance monitoring

## Railway Webhook Configuration

### Step 1: Environment Variables
Add these to your Railway project **BEFORE** deploying:

```bash
# Required for webhook notifications
PRACTICE_EMAIL=celiadunsmore@outlook.com

# Optional but recommended for security
RAILWAY_WEBHOOK_SECRET=your-secret-key-here

# Already configured (keep existing values)
SENDGRID_API_KEY=your-existing-sendgrid-key
SENDGRID_FROM_EMAIL=noreply@celiadunsmore.com
```

### Step 2: Railway Webhook URL
After your deployment is live, configure this webhook URL in Railway:

```
https://your-railway-domain.up.railway.app/webhooks/railway
```

### Step 3: Railway Dashboard Setup
1. Go to your Railway project dashboard
2. Click "Settings" → "Webhooks"
3. Click "Add Webhook"
4. Enter the webhook URL above
5. Select these events:
   - ✅ **Deployment Status Changes**
   - ✅ **Volume Usage Alerts**
6. (Optional) Add webhook secret for security

## Expected Behavior After Setup

### Successful Deployment Email
```
Subject: ✅ Deployment SUCCESS - Celia Dunsmore Counselling

Your Celia Dunsmore Counselling website has been successfully deployed.

✓ Your website is now live! Clients can access your counselling services and book appointments.

Project: Celia Dunsmore Counselling
Environment: production
URL: https://your-domain.com
Time: 2025-07-18 12:25:30 PM
```

### Failed Deployment Email
```
Subject: ❌ Deployment FAILED - Celia Dunsmore Counselling

Action Required: Your website deployment failed. Please check the Railway dashboard for details and redeploy when ready.

Project: Celia Dunsmore Counselling
Environment: production
Deployment ID: deploy-123
Time: 2025-07-18 12:25:30 PM
```

### Storage Alert Email
```
Subject: ⚠️ Storage Alert - Database at 85%

Your database storage is reaching capacity and may need attention.

Recommended Actions:
- Review and clean up old booking records if appropriate
- Consider upgrading your Railway plan for more storage
- Monitor usage patterns to understand growth trends
```

## Testing Your Deployed Webhooks

After deployment, test these endpoints:

```bash
# Health check
curl https://your-domain.com/webhooks/health

# Test webhook
curl -X POST https://your-domain.com/webhooks/test \
  -H "Content-Type: application/json" \
  -d '{"test": "production verification"}'
```

## Deployment Commands

### For GitHub → Railway Integration:
1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add Railway webhook deployment monitoring"
   git push origin main
   ```

2. **Railway will auto-deploy** from your GitHub repository

### For Direct Railway Deploy:
```bash
railway login
railway link [your-project-id]
railway up
```

## Monitoring and Logs

### Webhook Activity Logs
All webhook events are logged with:
- Event type (deployment, volume_alert)
- Processing duration
- Email delivery status
- Performance metrics

### View Logs in Railway:
```bash
railway logs --follow
```

Look for these log patterns:
```
INFO [WEBHOOK] Railway deployment webhook received: SUCCESS
INFO [EMAIL] Email sent to celiadunsmore@outlook.com: ✅ Deployment SUCCESS
DEBUG [PERF] Performance: railway_webhook_processing took 250ms
```

## Troubleshooting

### Common Issues and Solutions

1. **Webhook not receiving events**
   - Verify Railway webhook URL is correct
   - Check domain is accessible from Railway
   - Ensure webhook events are selected

2. **Email notifications not sending**
   - Verify `SENDGRID_API_KEY` environment variable
   - Check `PRACTICE_EMAIL` is set correctly
   - Review application logs for email errors

3. **Invalid signature errors**
   - Ensure `RAILWAY_WEBHOOK_SECRET` matches Railway config
   - Verify secret is properly formatted

### Testing Commands
```bash
# Test webhook endpoint accessibility
curl -I https://your-domain.com/webhooks/railway

# Test health endpoint
curl https://your-domain.com/webhooks/health

# View Railway logs
railway logs --tail 100
```

## Security Features

- **HMAC Signature Validation**: Prevents unauthorized webhook calls
- **Environment Variable Security**: API keys stored securely
- **Error Logging**: Invalid attempts are logged for monitoring
- **Rate Limiting**: Built-in protection against webhook spam

## Next Steps After Deployment

1. **Verify webhook setup** using the test endpoints
2. **Monitor first deployment** to confirm notifications work
3. **Set up database backup monitoring** (future enhancement)
4. **Configure Google Calendar webhooks** for appointment notifications

Your webhook system provides enterprise-grade monitoring for your mental health platform. You'll have complete visibility into deployment status and proactive alerts for any issues.

**Ready to deploy!** 🚀