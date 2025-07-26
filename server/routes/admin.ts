import { Request, Response, Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { validateQuery } from '../middleware/validation';
import { ipWhitelist } from '../middleware/security';
import { rateLimiters } from '../middleware/rateLimit';
import { healthCheck, metricsEndpoint, resetMetrics } from '../middleware/monitoring';
import { backupService } from '../services/backupService';
import { logger } from '../utils/logger';
import { z } from 'zod';

const router = Router();

// Apply IP whitelist to all admin routes
router.use(ipWhitelist(['127.0.0.1', '::1'])); // Add your admin IPs here
router.use(rateLimiters.general);

// Health check endpoint
router.get('/health', healthCheck);

// Metrics endpoint
router.get('/metrics', metricsEndpoint);

// Reset metrics (admin only)
router.post('/metrics/reset', asyncHandler(async (req: Request, res: Response) => {
  resetMetrics(req, res);
}));

// Backup management endpoints
router.post('/backup/create', asyncHandler(async (req: Request, res: Response) => {
  logger.info('Manual backup requested', 'ADMIN', { ip: req.ip });
  
  const filename = await backupService.createBackup();
  
  res.json({
    success: true,
    message: 'Backup created successfully',
    filename,
    timestamp: new Date().toISOString()
  });
}));

router.get('/backup/list', asyncHandler(async (req: Request, res: Response) => {
  const backups = await backupService.listBackups();
  const stats = await backupService.getBackupStats();
  
  res.json({
    success: true,
    backups,
    stats
  });
}));

router.get('/backup/download/:filename', 
  validateQuery(z.object({
    filename: z.string().regex(/^backup-.*\.json$/, 'Invalid filename format')
  })),
  asyncHandler(async (req: Request, res: Response) => {
    const { filename } = req.params;
    
    const backup = await backupService.getBackup(filename);
    
    if (!backup) {
      return res.status(404).json({
        success: false,
        error: 'Backup not found'
      });
    }

    logger.info('Backup downloaded', 'ADMIN', { filename, ip: req.ip });

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.json(backup);
  })
);

router.delete('/backup/:filename',
  asyncHandler(async (req: Request, res: Response) => {
    const { filename } = req.params;
    
    const success = await backupService.deleteBackup(filename);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Backup not found or could not be deleted'
      });
    }

    logger.info('Backup deleted', 'ADMIN', { filename, ip: req.ip });

    res.json({
      success: true,
      message: 'Backup deleted successfully'
    });
  })
);

router.post('/backup/cleanup',
  validateQuery(z.object({
    maxAge: z.string().transform(val => parseInt(val, 10)).pipe(z.number().min(1).max(365)).optional()
  })),
  asyncHandler(async (req: Request, res: Response) => {
    const maxAge = req.query.maxAge as number || 30;
    
    const deletedCount = await backupService.cleanupOldBackups(maxAge);
    
    logger.info('Backup cleanup completed', 'ADMIN', { deletedCount, maxAge, ip: req.ip });

    res.json({
      success: true,
      message: `Cleanup completed. ${deletedCount} old backups deleted.`,
      deletedCount
    });
  })
);

// Logs endpoint
router.get('/logs',
  validateQuery(z.object({
    limit: z.string().transform(val => parseInt(val, 10)).pipe(z.number().min(1).max(1000)).optional(),
    level: z.enum(['ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE']).optional()
  })),
  asyncHandler(async (req: Request, res: Response) => {
    const limit = req.query.limit as number || 100;
    const level = req.query.level as string;
    
    const logs = logger.getRecentLogs(limit, level ? parseInt(level) : undefined);
    
    res.json({
      success: true,
      logs,
      total: logs.length,
      limit
    });
  })
);

router.delete('/logs', asyncHandler(async (req: Request, res: Response) => {
  logger.clearLogs();
  
  res.json({
    success: true,
    message: 'Logs cleared successfully'
  });
}));

// System information endpoint
router.get('/system', asyncHandler(async (req: Request, res: Response) => {
  const memoryUsage = process.memoryUsage();
  const cpuUsage = process.cpuUsage();
  
  const systemInfo = {
    node: {
      version: process.version,
      platform: process.platform,
      arch: process.arch,
      uptime: process.uptime()
    },
    memory: {
      rss: Math.round(memoryUsage.rss / 1024 / 1024), // MB
      heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024), // MB
      heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024), // MB
      external: Math.round(memoryUsage.external / 1024 / 1024) // MB
    },
    cpu: {
      user: cpuUsage.user,
      system: cpuUsage.system
    },
    environment: {
      nodeEnv: process.env.NODE_ENV,
      port: process.env.PORT,
      hasDatabase: !!process.env.DATABASE_URL,
      hasEmailService: !!process.env.SENDGRID_API_KEY,
      hasGoogleAuth: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
    }
  };

  res.json({
    success: true,
    system: systemInfo,
    timestamp: new Date().toISOString()
  });
}));

// Configuration endpoint
router.get('/config', asyncHandler(async (req: Request, res: Response) => {
  const config = {
    logging: {
      level: logger.getLogLevel(),
      maxEntries: 1000
    },
    backup: {
      enabled: true,
      directory: 'backups',
      automaticCleanup: true,
      maxAge: 30
    },
    monitoring: {
      enabled: true,
      healthChecks: true,
      performanceTracking: true
    },
    security: {
      rateLimiting: true,
      cors: true,
      helmet: true,
      ipWhitelist: true
    }
  };

  res.json({
    success: true,
    config
  });
}));

export default router;