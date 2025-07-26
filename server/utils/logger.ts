export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
  TRACE = 4
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  category: string;
  data?: any;
  requestId?: string;
  userId?: string;
  ip?: string;
}

export class Logger {
  private static instance: Logger;
  private logLevel: LogLevel;
  private logEntries: LogEntry[] = [];
  private maxEntries: number = 1000; // Keep last 1000 entries in memory

  private constructor() {
    this.logLevel = process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG;
  }

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private shouldLog(level: LogLevel): boolean {
    return level <= this.logLevel;
  }

  private createEntry(level: LogLevel, message: string, category: string, data?: any): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      category,
      data,
    };
  }

  private writeLog(entry: LogEntry): void {
    // Add to memory store
    this.logEntries.push(entry);
    
    // Keep only the last maxEntries
    if (this.logEntries.length > this.maxEntries) {
      this.logEntries = this.logEntries.slice(-this.maxEntries);
    }

    // Format for console output
    const levelName = LogLevel[entry.level].padEnd(5);
    const timestamp = entry.timestamp.replace('T', ' ').slice(0, 19);
    const categoryFormatted = `[${entry.category}]`.padEnd(12);
    
    const baseMessage = `${timestamp} ${levelName} ${categoryFormatted} ${entry.message}`;
    const fullMessage = entry.data ? `${baseMessage} ${JSON.stringify(entry.data)}` : baseMessage;

    // Output to appropriate console method
    switch (entry.level) {
      case LogLevel.ERROR:
        console.error(fullMessage);
        break;
      case LogLevel.WARN:
        console.warn(fullMessage);
        break;
      case LogLevel.INFO:
        console.info(fullMessage);
        break;
      case LogLevel.DEBUG:
      case LogLevel.TRACE:
        console.log(fullMessage);
        break;
    }
  }

  error(message: string, category: string = 'APP', data?: any): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      this.writeLog(this.createEntry(LogLevel.ERROR, message, category, data));
    }
  }

  warn(message: string, category: string = 'APP', data?: any): void {
    if (this.shouldLog(LogLevel.WARN)) {
      this.writeLog(this.createEntry(LogLevel.WARN, message, category, data));
    }
  }

  info(message: string, category: string = 'APP', data?: any): void {
    if (this.shouldLog(LogLevel.INFO)) {
      this.writeLog(this.createEntry(LogLevel.INFO, message, category, data));
    }
  }

  debug(message: string, category: string = 'APP', data?: any): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      this.writeLog(this.createEntry(LogLevel.DEBUG, message, category, data));
    }
  }

  trace(message: string, category: string = 'APP', data?: any): void {
    if (this.shouldLog(LogLevel.TRACE)) {
      this.writeLog(this.createEntry(LogLevel.TRACE, message, category, data));
    }
  }

  // Specific logging methods for common use cases
  request(method: string, url: string, statusCode: number, responseTime: number, ip?: string): void {
    this.info(`${method} ${url} ${statusCode} ${responseTime}ms`, 'REQUEST', {
      method,
      url,
      statusCode,
      responseTime,
      ip
    });
  }

  database(operation: string, table: string, duration: number, success: boolean = true): void {
    const level = success ? LogLevel.INFO : LogLevel.ERROR;
    const message = `${operation} on ${table} ${success ? 'completed' : 'failed'} in ${duration}ms`;
    
    if (this.shouldLog(level)) {
      this.writeLog(this.createEntry(level, message, 'DATABASE', {
        operation,
        table,
        duration,
        success
      }));
    }
  }

  email(to: string, subject: string, success: boolean, error?: string): void {
    const level = success ? LogLevel.INFO : LogLevel.ERROR;
    const message = `Email ${success ? 'sent' : 'failed'} to ${to}: ${subject}`;
    
    if (this.shouldLog(level)) {
      this.writeLog(this.createEntry(level, message, 'EMAIL', {
        to,
        subject,
        success,
        error
      }));
    }
  }

  auth(action: string, userId?: string, ip?: string, success: boolean = true): void {
    const level = success ? LogLevel.INFO : LogLevel.WARN;
    const message = `Authentication ${action} ${success ? 'successful' : 'failed'}`;
    
    if (this.shouldLog(level)) {
      this.writeLog(this.createEntry(level, message, 'AUTH', {
        action,
        userId,
        ip,
        success
      }));
    }
  }

  security(event: string, ip?: string, details?: any): void {
    this.warn(`Security event: ${event}`, 'SECURITY', {
      event,
      ip,
      details
    });
  }

  performance(operation: string, duration: number, threshold: number = 1000): void {
    const level = duration > threshold ? LogLevel.WARN : LogLevel.DEBUG;
    const message = `Performance: ${operation} took ${duration}ms${duration > threshold ? ' (slow)' : ''}`;
    
    if (this.shouldLog(level)) {
      this.writeLog(this.createEntry(level, message, 'PERF', {
        operation,
        duration,
        threshold,
        slow: duration > threshold
      }));
    }
  }

  // Get recent log entries (for admin dashboard)
  getRecentLogs(limit: number = 100, level?: LogLevel): LogEntry[] {
    let filteredLogs = this.logEntries;
    
    if (level !== undefined) {
      filteredLogs = this.logEntries.filter(entry => entry.level <= level);
    }
    
    return filteredLogs.slice(-limit);
  }

  // Clear logs (for maintenance)
  clearLogs(): void {
    this.logEntries = [];
    this.info('Log entries cleared', 'SYSTEM');
  }

  // Set log level dynamically
  setLogLevel(level: LogLevel): void {
    const oldLevel = this.logLevel;
    this.logLevel = level;
    this.info(`Log level changed from ${LogLevel[oldLevel]} to ${LogLevel[level]}`, 'SYSTEM');
  }

  // Get current log level
  getLogLevel(): LogLevel {
    return this.logLevel;
  }

  // Export logs as JSON (for backup/analysis)
  exportLogs(): string {
    return JSON.stringify(this.logEntries, null, 2);
  }
}

// Create a default logger instance
export const logger = Logger.getInstance();

// Helper functions for common logging patterns
export const logApiCall = (method: string, url: string, statusCode: number, duration: number, ip?: string) => {
  logger.request(method, url, statusCode, duration, ip);
};

export const logError = (error: Error, category: string = 'ERROR', context?: any) => {
  logger.error(error.message, category, {
    stack: error.stack,
    name: error.name,
    context
  });
};

export const logPerformance = (operation: string, startTime: number, threshold?: number) => {
  const duration = Date.now() - startTime;
  logger.performance(operation, duration, threshold);
};

// Performance timing decorator
export function measurePerformance(operation: string, threshold?: number) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const startTime = Date.now();
      try {
        const result = await method.apply(this, args);
        logPerformance(`${operation}.${propertyName}`, startTime, threshold);
        return result;
      } catch (error) {
        logPerformance(`${operation}.${propertyName}`, startTime, threshold);
        throw error;
      }
    };

    return descriptor;
  };
}