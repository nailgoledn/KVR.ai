import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class BackupService {
  private readonly usbPath = 'E:\\KVRAT_BACKUPS';

  private ensureBackupFolder(): void {
    if (!fs.existsSync(this.usbPath)) {
      fs.mkdirSync(this.usbPath, {
        recursive: true,
      });
    }
  }

  async createBackup() {
    this.ensureBackupFolder();

    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, '-');

    const backupFile = path.join(
      this.usbPath,
      `auto-backup-${timestamp}.json`,
    );

    fs.writeFileSync(
      backupFile,
      JSON.stringify(
        {
          createdAt: new Date().toISOString(),
          project: 'KVRAT',
          type: 'auto',
        },
        null,
        2,
      ),
    );

    return {
      success: true,
      type: 'auto',
      path: backupFile,
      timestamp,
    };
  }

  async exportBackup(password: string) {
    this.ensureBackupFolder();

    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, '-');

    const backupFile = path.join(
      this.usbPath,
      `portable-backup-${timestamp}.json`,
    );

    fs.writeFileSync(
      backupFile,
      JSON.stringify(
        {
          createdAt: new Date().toISOString(),
          project: 'KVRAT',
          type: 'portable',
          password,
        },
        null,
        2,
      ),
    );

    return {
      success: true,
      type: 'portable',
      path: backupFile,
      timestamp,
      passwordProtected: false,
      note: 'Backup exported successfully',
    };
  }
}