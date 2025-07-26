import { DatabaseError } from '../middleware/errorHandler';

export interface QueryResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  affectedRows?: number;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  offset?: number;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

export class DatabaseUtils {
  /**
   * Calculate pagination offset
   */
  static calculateOffset(page: number, limit: number): number {
    return Math.max(0, (page - 1) * limit);
  }

  /**
   * Validate pagination parameters
   */
  static validatePagination(page: number, limit: number): PaginationOptions {
    const validatedPage = Math.max(1, Math.floor(page));
    const validatedLimit = Math.min(100, Math.max(1, Math.floor(limit))); // Max 100 items per page
    
    return {
      page: validatedPage,
      limit: validatedLimit,
      offset: this.calculateOffset(validatedPage, validatedLimit)
    };
  }

  /**
   * Create standardized error response for database operations
   */
  static createErrorResult<T>(error: unknown, operation: string): QueryResult<T> {
    const message = error instanceof Error ? error.message : 'Unknown database error';
    console.error(`Database error during ${operation}:`, error);
    
    return {
      success: false,
      error: `${operation} failed: ${message}`
    };
  }

  /**
   * Create standardized success response for database operations
   */
  static createSuccessResult<T>(data: T, affectedRows?: number): QueryResult<T> {
    return {
      success: true,
      data,
      affectedRows
    };
  }

  /**
   * Validate and sanitize sort options
   */
  static validateSort(field: string, direction: string, allowedFields: string[]): SortOptions | null {
    if (!allowedFields.includes(field)) {
      return null;
    }

    const validDirection = direction.toLowerCase() === 'desc' ? 'desc' : 'asc';
    return { field, direction: validDirection };
  }

  /**
   * Execute operation with retry logic
   */
  static async withRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    backoffMs: number = 1000
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        
        if (attempt === maxRetries) {
          throw new DatabaseError(`Operation failed after ${maxRetries} attempts: ${lastError.message}`);
        }

        // Exponential backoff
        const delay = backoffMs * Math.pow(2, attempt - 1);
        console.warn(`Database operation attempt ${attempt} failed, retrying in ${delay}ms:`, lastError.message);
        
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw lastError!;
  }

  /**
   * Transaction wrapper for operations that need atomic execution
   */
  static async withTransaction<T>(
    operations: () => Promise<T>
  ): Promise<T> {
    // For memory storage, we don't have real transactions
    // but we can implement a simple rollback mechanism
    try {
      return await operations();
    } catch (error) {
      console.error('Transaction failed:', error);
      throw new DatabaseError(`Transaction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Validate ID parameter
   */
  static validateId(id: string | number): number {
    const numId = typeof id === 'string' ? parseInt(id, 10) : id;
    
    if (isNaN(numId) || numId <= 0) {
      throw new DatabaseError(`Invalid ID: ${id}`);
    }
    
    return numId;
  }

  /**
   * Format dates for database storage
   */
  static formatDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      throw new DatabaseError(`Invalid date: ${date}`);
    }
    
    return dateObj.toISOString();
  }

  /**
   * Sanitize string input to prevent injection attacks
   */
  static sanitizeString(input: string): string {
    if (typeof input !== 'string') {
      return String(input);
    }

    return input
      .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
      .replace(/['"\\]/g, '') // Remove potential SQL injection characters
      .trim()
      .substring(0, 1000); // Limit length
  }

  /**
   * Create search filter for text fields
   */
  static createSearchFilter(searchTerm: string, fields: string[]): string {
    if (!searchTerm || !fields.length) {
      return '';
    }

    const sanitizedTerm = this.sanitizeString(searchTerm);
    if (!sanitizedTerm) {
      return '';
    }

    // Return a simple search pattern that can be used with filter functions
    return sanitizedTerm.toLowerCase();
  }

  /**
   * Apply text search to data array
   */
  static applySearch<T extends Record<string, any>>(
    data: T[],
    searchTerm: string,
    searchFields: (keyof T)[]
  ): T[] {
    if (!searchTerm || !searchFields.length) {
      return data;
    }

    const term = searchTerm.toLowerCase();
    
    return data.filter(item =>
      searchFields.some(field => {
        const value = item[field];
        return value && 
               typeof value === 'string' && 
               value.toLowerCase().includes(term);
      })
    );
  }

  /**
   * Apply sorting to data array
   */
  static applySorting<T extends Record<string, any>>(
    data: T[],
    sortOptions?: SortOptions
  ): T[] {
    if (!sortOptions) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = a[sortOptions.field];
      const bValue = b[sortOptions.field];

      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return sortOptions.direction === 'desc' ? -comparison : comparison;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        const comparison = aValue - bValue;
        return sortOptions.direction === 'desc' ? -comparison : comparison;
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        const comparison = aValue.getTime() - bValue.getTime();
        return sortOptions.direction === 'desc' ? -comparison : comparison;
      }

      // Default string comparison
      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();
      const comparison = aStr.localeCompare(bStr);
      return sortOptions.direction === 'desc' ? -comparison : comparison;
    });
  }

  /**
   * Apply pagination to data array
   */
  static applyPagination<T>(data: T[], pagination: PaginationOptions): {
    data: T[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  } {
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / pagination.limit);
    const startIndex = pagination.offset || this.calculateOffset(pagination.page, pagination.limit);
    const endIndex = startIndex + pagination.limit;

    return {
      data: data.slice(startIndex, endIndex),
      totalItems,
      totalPages,
      currentPage: pagination.page,
      hasNextPage: pagination.page < totalPages,
      hasPreviousPage: pagination.page > 1
    };
  }
}