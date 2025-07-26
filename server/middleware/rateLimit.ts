import { Request, Response, NextFunction } from 'express';

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  message?: string;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

class MemoryStore {
  private store: RateLimitStore = {};
  
  // Clean up expired entries every 5 minutes
  constructor() {
    setInterval(() => {
      const now = Date.now();
      Object.keys(this.store).forEach(key => {
        if (this.store[key].resetTime < now) {
          delete this.store[key];
        }
      });
    }, 5 * 60 * 1000);
  }

  get(key: string): { count: number; resetTime: number } | undefined {
    const entry = this.store[key];
    if (!entry) return undefined;
    
    // Check if window has expired
    if (entry.resetTime < Date.now()) {
      delete this.store[key];
      return undefined;
    }
    
    return entry;
  }

  increment(key: string, windowMs: number): { count: number; resetTime: number } {
    const now = Date.now();
    const resetTime = now + windowMs;
    
    const existing = this.get(key);
    if (existing) {
      existing.count++;
      return existing;
    }
    
    const newEntry = { count: 1, resetTime };
    this.store[key] = newEntry;
    return newEntry;
  }
}

const store = new MemoryStore();

export function createRateLimit(config: RateLimitConfig) {
  const {
    windowMs,
    maxRequests,
    message = 'Too many requests, please try again later.',
    skipSuccessfulRequests = false,
    skipFailedRequests = false
  } = config;

  return (req: Request, res: Response, next: NextFunction) => {
    // Generate key based on IP address
    const key = `rate_limit:${req.ip || req.connection.remoteAddress}`;
    
    // Get or create rate limit entry
    const entry = store.increment(key, windowMs);
    
    // Add rate limit headers
    res.set({
      'X-RateLimit-Limit': maxRequests.toString(),
      'X-RateLimit-Remaining': Math.max(0, maxRequests - entry.count).toString(),
      'X-RateLimit-Reset': new Date(entry.resetTime).toISOString()
    });

    // Check if limit exceeded
    if (entry.count > maxRequests) {
      console.warn(`Rate limit exceeded for IP: ${req.ip}, path: ${req.path}`);
      return res.status(429).json({
        success: false,
        error: {
          message,
          retryAfter: Math.ceil((entry.resetTime - Date.now()) / 1000)
        }
      });
    }

    // Handle response to potentially skip counting
    const originalSend = res.send;
    res.send = function(body) {
      const statusCode = res.statusCode;
      
      // Decrement counter if we should skip this request
      if (
        (skipSuccessfulRequests && statusCode < 400) ||
        (skipFailedRequests && statusCode >= 400)
      ) {
        const currentEntry = store.get(key);
        if (currentEntry && currentEntry.count > 0) {
          currentEntry.count--;
        }
      }
      
      return originalSend.call(this, body);
    };

    next();
  };
}

// Predefined rate limiters for different endpoints
export const rateLimiters = {
  // General API rate limit: 100 requests per 15 minutes
  general: createRateLimit({
    windowMs: 15 * 60 * 1000,
    maxRequests: 100,
    message: 'Too many API requests, please try again in 15 minutes.'
  }),
  
  // Contact form: 5 submissions per hour per IP
  contactForm: createRateLimit({
    windowMs: 60 * 60 * 1000,
    maxRequests: 5,
    message: 'Too many contact form submissions. Please wait an hour before submitting again.',
    skipSuccessfulRequests: false
  }),
  
  // Booking form: 3 bookings per hour per IP
  bookingForm: createRateLimit({
    windowMs: 60 * 60 * 1000,
    maxRequests: 3,
    message: 'Too many booking requests. Please wait an hour before submitting another booking.',
    skipSuccessfulRequests: false
  }),
  
  // Calendar availability: 30 requests per minute
  calendarAvailability: createRateLimit({
    windowMs: 60 * 1000,
    maxRequests: 30,
    message: 'Too many availability requests. Please wait a minute before checking again.'
  }),
  
  // Email sending: 10 emails per hour
  emailSending: createRateLimit({
    windowMs: 60 * 60 * 1000,
    maxRequests: 10,
    message: 'Email sending limit reached. Please try again later.'
  })
};