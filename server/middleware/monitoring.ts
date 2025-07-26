import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

interface PerformanceMetrics {
  requestCount: number;
  totalResponseTime: number;
  averageResponseTime: number;
  errorCount: number;
  lastReset: Date;
}

interface EndpointMetrics {
  [endpoint: string]: PerformanceMetrics;
}

export class MonitoringService {
  private static instance: MonitoringService;
  private metrics: EndpointMetrics = {};
  private systemMetrics = {
    startTime: new Date(),
    totalRequests: 0,
    totalErrors: 0,
    totalResponseTime: 0
  };

  static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  private getEndpointKey(method: string, path: string): string {
    // Normalize path to group similar endpoints
    const normalizedPath = path
      .replace(/\/\d+/g, '/:id') // Replace numeric IDs
      .replace(/\/api\/v\d+/g, '/api/v*') // Version numbers
      .split('?')[0]; // Remove query parameters
    
    return `${method} ${normalizedPath}`;
  }

  recordRequest(method: string, path: string, statusCode: number, responseTime: number): void {
    const endpointKey = this.getEndpointKey(method, path);
    
    // Initialize metrics if not exists
    if (!this.metrics[endpointKey]) {
      this.metrics[endpointKey] = {
        requestCount: 0,
        totalResponseTime: 0,
        averageResponseTime: 0,
        errorCount: 0,
        lastReset: new Date()
      };
    }

    const endpoint = this.metrics[endpointKey];
    
    // Update endpoint metrics
    endpoint.requestCount++;
    endpoint.totalResponseTime += responseTime;
    endpoint.averageResponseTime = endpoint.totalResponseTime / endpoint.requestCount;
    
    if (statusCode >= 400) {
      endpoint.errorCount++;
    }

    // Update system metrics
    this.systemMetrics.totalRequests++;
    this.systemMetrics.totalResponseTime += responseTime;
    
    if (statusCode >= 400) {
      this.systemMetrics.totalErrors++;
    }

    // Log slow requests
    if (responseTime > 2000) {
      logger.warn(`Slow request detected: ${method} ${path} took ${responseTime}ms`, 'PERFORMANCE', {
        method,
        path,
        responseTime,
        statusCode
      });
    }

    // Log errors
    if (statusCode >= 500) {
      logger.error(`Server error: ${method} ${path} returned ${statusCode}`, 'ERROR', {
        method,
        path,
        statusCode,
        responseTime
      });
    }
  }

  getMetrics(): { endpoints: EndpointMetrics; system: typeof this.systemMetrics & { averageResponseTime: number; errorRate: number; uptime: number } } {
    const now = new Date();
    const uptime = Math.floor((now.getTime() - this.systemMetrics.startTime.getTime()) / 1000);
    
    return {
      endpoints: this.metrics,
      system: {
        ...this.systemMetrics,
        averageResponseTime: this.systemMetrics.totalRequests > 0 
          ? this.systemMetrics.totalResponseTime / this.systemMetrics.totalRequests 
          : 0,
        errorRate: this.systemMetrics.totalRequests > 0 
          ? (this.systemMetrics.totalErrors / this.systemMetrics.totalRequests) * 100 
          : 0,
        uptime
      }
    };
  }

  resetMetrics(): void {
    this.metrics = {};
    this.systemMetrics = {
      startTime: new Date(),
      totalRequests: 0,
      totalErrors: 0,
      totalResponseTime: 0
    };
    logger.info('Performance metrics reset', 'MONITORING');
  }

  getHealthStatus(): { status: 'healthy' | 'degraded' | 'unhealthy'; checks: any } {
    const metrics = this.getMetrics();
    const checks = {
      responseTime: metrics.system.averageResponseTime < 1000,
      errorRate: metrics.system.errorRate < 5,
      uptime: metrics.system.uptime > 60 // At least 1 minute uptime
    };

    const healthyChecks = Object.values(checks).filter(Boolean).length;
    const totalChecks = Object.keys(checks).length;

    let status: 'healthy' | 'degraded' | 'unhealthy';
    if (healthyChecks === totalChecks) {
      status = 'healthy';
    } else if (healthyChecks >= totalChecks / 2) {
      status = 'degraded';
    } else {
      status = 'unhealthy';
    }

    return { status, checks };
  }
}

const monitoring = MonitoringService.getInstance();

// Middleware to track request metrics
export function requestMonitoring(req: Request, res: Response, next: NextFunction): void {
  const startTime = Date.now();

  // Add performance headers before response
  const originalSend = res.send;
  res.send = function(data) {
    const responseTime = Date.now() - startTime;
    this.setHeader('X-Response-Time', `${responseTime}ms`);
    return originalSend.call(this, data);
  };

  // Track response when it finishes
  res.on('finish', () => {
    const responseTime = Date.now() - startTime;
    monitoring.recordRequest(req.method, req.path, res.statusCode, responseTime);
  });

  next();
}

// Health check endpoint handler
export function healthCheck(req: Request, res: Response): void {
  const health = monitoring.getHealthStatus();
  const metrics = monitoring.getMetrics();

  const response = {
    status: health.status,
    timestamp: new Date().toISOString(),
    uptime: metrics.system.uptime,
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    checks: {
      database: true, // TODO: Add actual database health check
      email: !!process.env.SENDGRID_API_KEY,
      ...health.checks
    },
    metrics: {
      requests: {
        total: metrics.system.totalRequests,
        errors: metrics.system.totalErrors,
        errorRate: `${metrics.system.errorRate.toFixed(2)}%`
      },
      performance: {
        averageResponseTime: `${metrics.system.averageResponseTime.toFixed(2)}ms`,
        uptime: `${metrics.system.uptime}s`
      }
    }
  };

  const statusCode = health.status === 'healthy' ? 200 : 
                    health.status === 'degraded' ? 200 : 503;

  res.status(statusCode).json(response);
}

// Metrics endpoint handler (for admin/monitoring tools)
export function metricsEndpoint(req: Request, res: Response): void {
  const metrics = monitoring.getMetrics();
  res.json(metrics);
}

// Reset metrics endpoint (for admin)
export function resetMetrics(req: Request, res: Response): void {
  monitoring.resetMetrics();
  res.json({ success: true, message: 'Metrics reset successfully' });
}

export { monitoring };