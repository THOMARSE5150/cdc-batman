import { storage } from '../storage';
import { logger } from '../utils/logger';
import fs from 'fs';
import path from 'path';

export interface BackupData {
  timestamp: string;
  version: string;
  data: {
    bookings: any[];
    contacts: any[];
    practiceLocations: any[];
    availability: any[];
  };
  metadata: {
    totalRecords: number;
    backupSize: number;
    environment: string;
  };
}

export class BackupService {
  private static instance: BackupService;
  private backupDir: string;

  private constructor() {
    this.backupDir = path.join(process.cwd(), 'backups');
    this.ensureBackupDirectory();
  }

  static getInstance(): BackupService {
    if (!BackupService.instance) {
      BackupService.instance = new BackupService();
    }
    return BackupService.instance;
  }

  private ensureBackupDirectory(): void {
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
      logger.info('Created backup directory', 'BACKUP', { path: this.backupDir });
    }
  }

  async createBackup(): Promise<string> {
    logger.info('Starting backup process', 'BACKUP');
    const startTime = Date.now();

    try {
      // Collect all data
      const [bookings, contacts, practiceLocations] = await Promise.all([
        storage.getAllBookings(),
        storage.getAllContacts(),
        storage.getAllPracticeLocations()
      ]);

      const backupData: BackupData = {
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        data: {
          bookings,
          contacts,
          practiceLocations,
          availability: [] // TODO: Add when availability methods are implemented
        },
        metadata: {
          totalRecords: bookings.length + contacts.length + practiceLocations.length,
          backupSize: 0, // Will be calculated after serialization
          environment: process.env.NODE_ENV || 'development'
        }
      };

      // Serialize and calculate size
      const backupJson = JSON.stringify(backupData, null, 2);
      backupData.metadata.backupSize = Buffer.byteLength(backupJson, 'utf8');

      // Generate filename
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `backup-${timestamp}.json`;
      const filePath = path.join(this.backupDir, filename);

      // Write backup file
      fs.writeFileSync(filePath, backupJson, 'utf8');

      const duration = Date.now() - startTime;
      logger.info('Backup completed successfully', 'BACKUP', {
        filename,
        size: backupData.metadata.backupSize,
        totalRecords: backupData.metadata.totalRecords,
        duration
      });

      return filename;
    } catch (error) {
      const duration = Date.now() - startTime;
      logger.error('Backup failed', 'BACKUP', { error: error instanceof Error ? error.message : error, duration });
      throw error;
    }
  }

  async listBackups(): Promise<Array<{ filename: string; size: number; created: Date; age: string }>> {
    try {
      const files = fs.readdirSync(this.backupDir)
        .filter(file => file.startsWith('backup-') && file.endsWith('.json'))
        .map(filename => {
          const filePath = path.join(this.backupDir, filename);
          const stats = fs.statSync(filePath);
          const now = new Date();
          const ageMs = now.getTime() - stats.mtime.getTime();
          const ageDays = Math.floor(ageMs / (1000 * 60 * 60 * 24));
          const ageHours = Math.floor((ageMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          
          let ageString;
          if (ageDays > 0) {
            ageString = `${ageDays} day${ageDays === 1 ? '' : 's'} ago`;
          } else if (ageHours > 0) {
            ageString = `${ageHours} hour${ageHours === 1 ? '' : 's'} ago`;
          } else {
            ageString = 'Less than 1 hour ago';
          }

          return {
            filename,
            size: stats.size,
            created: stats.mtime,
            age: ageString
          };
        })
        .sort((a, b) => b.created.getTime() - a.created.getTime()); // Sort by newest first

      return files;
    } catch (error) {
      logger.error('Failed to list backups', 'BACKUP', { error: error instanceof Error ? error.message : error });
      return [];
    }
  }

  async getBackup(filename: string): Promise<BackupData | null> {
    try {
      const filePath = path.join(this.backupDir, filename);
      
      if (!fs.existsSync(filePath)) {
        logger.warn('Backup file not found', 'BACKUP', { filename });
        return null;
      }

      const backupJson = fs.readFileSync(filePath, 'utf8');
      const backupData = JSON.parse(backupJson) as BackupData;

      logger.info('Backup retrieved successfully', 'BACKUP', { filename });
      return backupData;
    } catch (error) {
      logger.error('Failed to retrieve backup', 'BACKUP', { 
        filename, 
        error: error instanceof Error ? error.message : error 
      });
      return null;
    }
  }

  async deleteBackup(filename: string): Promise<boolean> {
    try {
      const filePath = path.join(this.backupDir, filename);
      
      if (!fs.existsSync(filePath)) {
        logger.warn('Backup file not found for deletion', 'BACKUP', { filename });
        return false;
      }

      fs.unlinkSync(filePath);
      logger.info('Backup deleted successfully', 'BACKUP', { filename });
      return true;
    } catch (error) {
      logger.error('Failed to delete backup', 'BACKUP', { 
        filename, 
        error: error instanceof Error ? error.message : error 
      });
      return false;
    }
  }

  async cleanupOldBackups(maxAge: number = 30): Promise<number> {
    logger.info('Starting backup cleanup', 'BACKUP', { maxAgeDays: maxAge });
    
    try {
      const backups = await this.listBackups();
      const cutoffDate = new Date(Date.now() - (maxAge * 24 * 60 * 60 * 1000));
      
      const oldBackups = backups.filter(backup => backup.created < cutoffDate);
      let deletedCount = 0;

      for (const backup of oldBackups) {
        if (await this.deleteBackup(backup.filename)) {
          deletedCount++;
        }
      }

      logger.info('Backup cleanup completed', 'BACKUP', { 
        deletedCount, 
        totalBackups: backups.length,
        remainingBackups: backups.length - deletedCount
      });

      return deletedCount;
    } catch (error) {
      logger.error('Backup cleanup failed', 'BACKUP', { 
        error: error instanceof Error ? error.message : error 
      });
      return 0;
    }
  }

  async getBackupStats(): Promise<{
    totalBackups: number;
    totalSize: number;
    oldestBackup?: Date;
    newestBackup?: Date;
    averageSize: number;
  }> {
    const backups = await this.listBackups();
    
    if (backups.length === 0) {
      return {
        totalBackups: 0,
        totalSize: 0,
        averageSize: 0
      };
    }

    const totalSize = backups.reduce((sum, backup) => sum + backup.size, 0);
    const oldestBackup = backups[backups.length - 1]?.created;
    const newestBackup = backups[0]?.created;
    const averageSize = totalSize / backups.length;

    return {
      totalBackups: backups.length,
      totalSize,
      oldestBackup,
      newestBackup,
      averageSize
    };
  }

  // Schedule automatic backups (call this from your server startup)
  startAutomaticBackups(intervalHours: number = 24): void {
    const intervalMs = intervalHours * 60 * 60 * 1000;
    
    setInterval(async () => {
      try {
        await this.createBackup();
        // Also cleanup old backups
        await this.cleanupOldBackups();
      } catch (error) {
        logger.error('Automatic backup failed', 'BACKUP', { 
          error: error instanceof Error ? error.message : error 
        });
      }
    }, intervalMs);

    logger.info('Automatic backup scheduled', 'BACKUP', { intervalHours });
  }
}

export const backupService = BackupService.getInstance();