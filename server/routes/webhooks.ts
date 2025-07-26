import type { Express } from "express";
import { z } from "zod";
import { logger } from "../utils/logger";
import { sendEmail } from "../email";
import crypto from "crypto";

// Railway Webhook Event Schemas
const railwayDeploymentSchema = z.object({
  type: z.literal("deployment"),
  data: z.object({
    deployment: z.object({
      id: z.string(),
      status: z.enum(["BUILDING", "DEPLOYING", "SUCCESS", "FAILED", "CRASHED", "REMOVED"]),
      url: z.string().optional(),
      createdAt: z.string(),
      updatedAt: z.string()
    }),
    project: z.object({
      id: z.string(),
      name: z.string()
    }),
    environment: z.object({
      id: z.string(),
      name: z.string()
    })
  })
});

const railwayVolumeAlertSchema = z.object({
  type: z.literal("volume_alert"),
  data: z.object({
    volume: z.object({
      id: z.string(),
      name: z.string(),
      usagePercent: z.number(),
      threshold: z.number()
    }),
    project: z.object({
      id: z.string(),
      name: z.string()
    })
  })
});

type RailwayWebhookEvent = z.infer<typeof railwayDeploymentSchema> | z.infer<typeof railwayVolumeAlertSchema>;

// Webhook security validation
function validateWebhookSignature(payload: string, signature: string, secret: string): boolean {
  if (!secret) return true; // Skip validation if no secret configured
  
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}

// Email notification functions
async function sendDeploymentNotification(event: z.infer<typeof railwayDeploymentSchema>) {
  const { deployment, project, environment } = event.data;
  const isSuccess = deployment.status === "SUCCESS";
  const isFailed = deployment.status === "FAILED" || deployment.status === "CRASHED";
  
  if (!isSuccess && !isFailed) return; // Only notify on success or failure
  
  const subject = `${isSuccess ? "✅" : "❌"} Deployment ${deployment.status} - ${project.name}`;
  
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: ${isSuccess ? "#f0f9ff" : "#fef2f2"}; border-left: 4px solid ${isSuccess ? "#3b82f6" : "#ef4444"}; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="margin: 0 0 10px 0; color: ${isSuccess ? "#1e40af" : "#dc2626"};">
          ${isSuccess ? "Deployment Successful" : "Deployment Failed"}
        </h2>
        <p style="margin: 0; font-size: 16px; color: #374151;">
          Your Celia Dunsmore Counselling website has been ${deployment.status.toLowerCase()}.
        </p>
      </div>
      
      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 15px 0; color: #374151;">Deployment Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Project:</td>
            <td style="padding: 8px 0; color: #111827;">${project.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Environment:</td>
            <td style="padding: 8px 0; color: #111827;">${environment.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Status:</td>
            <td style="padding: 8px 0; color: #111827;">${deployment.status}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Deployment ID:</td>
            <td style="padding: 8px 0; color: #111827; font-family: monospace;">${deployment.id}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Time:</td>
            <td style="padding: 8px 0; color: #111827;">${new Date(deployment.updatedAt).toLocaleString()}</td>
          </tr>
          ${deployment.url ? `
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">URL:</td>
            <td style="padding: 8px 0;"><a href="${deployment.url}" style="color: #3b82f6; text-decoration: none;">${deployment.url}</a></td>
          </tr>
          ` : ''}
        </table>
      </div>
      
      ${isSuccess ? `
      <div style="background: #ecfdf5; border: 1px solid #a7f3d0; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <p style="margin: 0; color: #065f46;">
          <strong>Your website is now live!</strong> Clients can access your counselling services and book appointments.
        </p>
      </div>
      ` : `
      <div style="background: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <p style="margin: 0; color: #991b1b;">
          <strong>Action Required:</strong> Your website deployment failed. Please check the Railway dashboard for details and redeploy when ready.
        </p>
      </div>
      `}
      
      <div style="text-align: center; padding: 20px 0; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0; color: #6b7280; font-size: 14px;">
          This notification was sent automatically by your Railway webhook system.
        </p>
      </div>
    </div>
  `;
  
  const text = `
Deployment ${deployment.status} - ${project.name}

Project: ${project.name}
Environment: ${environment.name}
Status: ${deployment.status}
Deployment ID: ${deployment.id}
Time: ${new Date(deployment.updatedAt).toLocaleString()}
${deployment.url ? `URL: ${deployment.url}` : ''}

${isSuccess ? 'Your website is now live! Clients can access your counselling services and book appointments.' : 'Action Required: Your website deployment failed. Please check the Railway dashboard for details and redeploy when ready.'}
  `;
  
  // Send to the practice email (you can configure this)
  const practiceEmail = process.env.PRACTICE_EMAIL || "celiadunsmore@outlook.com";
  
  await sendEmail({
    to: practiceEmail,
    from: process.env.SENDGRID_FROM_EMAIL || "noreply@celiadunsmore.com",
    subject,
    text,
    html
  });
}

async function sendVolumeAlertNotification(event: z.infer<typeof railwayVolumeAlertSchema>) {
  const { volume, project } = event.data;
  
  const subject = `⚠️ Storage Alert - ${volume.name} at ${volume.usagePercent}%`;
  
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="margin: 0 0 10px 0; color: #92400e;">Storage Usage Alert</h2>
        <p style="margin: 0; font-size: 16px; color: #374151;">
          Your database storage is reaching capacity and may need attention.
        </p>
      </div>
      
      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 15px 0; color: #374151;">Storage Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Project:</td>
            <td style="padding: 8px 0; color: #111827;">${project.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Volume:</td>
            <td style="padding: 8px 0; color: #111827;">${volume.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Usage:</td>
            <td style="padding: 8px 0; color: #111827; font-weight: bold;">${volume.usagePercent}%</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Alert Threshold:</td>
            <td style="padding: 8px 0; color: #111827;">${volume.threshold}%</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Time:</td>
            <td style="padding: 8px 0; color: #111827;">${new Date().toLocaleString()}</td>
          </tr>
        </table>
      </div>
      
      <div style="background: #fef3c7; border: 1px solid #fcd34d; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <p style="margin: 0; color: #92400e;">
          <strong>Recommended Actions:</strong>
        </p>
        <ul style="margin: 10px 0 0 20px; color: #92400e;">
          <li>Review and clean up old booking records if appropriate</li>
          <li>Consider upgrading your Railway plan for more storage</li>
          <li>Monitor usage patterns to understand growth trends</li>
        </ul>
      </div>
      
      <div style="text-align: center; padding: 20px 0; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0; color: #6b7280; font-size: 14px;">
          This notification was sent automatically by your Railway webhook system.
        </p>
      </div>
    </div>
  `;
  
  const text = `
Storage Usage Alert - ${volume.name} at ${volume.usagePercent}%

Project: ${project.name}
Volume: ${volume.name}
Usage: ${volume.usagePercent}%
Alert Threshold: ${volume.threshold}%
Time: ${new Date().toLocaleString()}

Recommended Actions:
- Review and clean up old booking records if appropriate
- Consider upgrading your Railway plan for more storage
- Monitor usage patterns to understand growth trends
  `;
  
  const practiceEmail = process.env.PRACTICE_EMAIL || "celiadunsmore@outlook.com";
  
  await sendEmail({
    to: practiceEmail,
    from: process.env.SENDGRID_FROM_EMAIL || "noreply@celiadunsmore.com",
    subject,
    text,
    html
  });
}

export function registerWebhookRoutes(app: Express) {
  // Railway webhook endpoint
  app.post('/webhooks/railway', async (req, res) => {
    const startTime = Date.now();
    
    try {
      // Get the raw body for signature validation
      const rawBody = JSON.stringify(req.body);
      const signature = req.headers['x-railway-signature'] as string;
      const webhookSecret = process.env.RAILWAY_WEBHOOK_SECRET;
      
      // Validate webhook signature if secret is configured
      if (webhookSecret && signature) {
        const isValid = validateWebhookSignature(rawBody, signature, webhookSecret);
        if (!isValid) {
          logger.warn('Invalid Railway webhook signature', 'WEBHOOK', { 
            signature: signature.substring(0, 10) + '...' 
          });
          return res.status(401).json({ error: 'Invalid signature' });
        }
      }
      
      // Parse and validate the webhook event
      let event: RailwayWebhookEvent;
      
      try {
        // Try deployment event first
        event = railwayDeploymentSchema.parse(req.body);
        logger.info(`Railway deployment webhook received: ${event.data.deployment.status}`, 'WEBHOOK', {
          deploymentId: event.data.deployment.id,
          projectName: event.data.project.name,
          status: event.data.deployment.status
        });
        
        // Send notification for deployment events
        await sendDeploymentNotification(event);
        
      } catch (deploymentError) {
        try {
          // Try volume alert event
          event = railwayVolumeAlertSchema.parse(req.body);
          logger.info(`Railway volume alert webhook received: ${event.data.volume.usagePercent}%`, 'WEBHOOK', {
            volumeName: event.data.volume.name,
            projectName: event.data.project.name,
            usagePercent: event.data.volume.usagePercent
          });
          
          // Send notification for volume alerts
          await sendVolumeAlertNotification(event);
          
        } catch (volumeError) {
          logger.error('Invalid Railway webhook payload', 'WEBHOOK', { 
            error: volumeError instanceof Error ? volumeError.message : 'Unknown error',
            payload: req.body 
          });
          return res.status(400).json({ error: 'Invalid webhook payload' });
        }
      }
      
      const duration = Date.now() - startTime;
      logger.performance('railway_webhook_processing', duration);
      
      res.status(200).json({ 
        success: true, 
        message: 'Webhook processed successfully',
        eventType: event.type 
      });
      
    } catch (error) {
      const duration = Date.now() - startTime;
      logger.error('Railway webhook processing error', 'WEBHOOK', { 
        error: error instanceof Error ? error.message : 'Unknown error',
        duration 
      });
      logger.performance('railway_webhook_processing', duration);
      
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Health check endpoint for webhook monitoring
  app.get('/webhooks/health', (req, res) => {
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      webhooks: {
        railway: 'active'
      }
    });
  });
  
  // Test endpoint for webhook validation
  app.post('/webhooks/test', (req, res) => {
    logger.info('Webhook test endpoint called', 'WEBHOOK', { payload: req.body });
    res.status(200).json({ 
      success: true, 
      message: 'Test webhook received',
      timestamp: new Date().toISOString(),
      payload: req.body 
    });
  });
}