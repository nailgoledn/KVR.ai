import { Controller, Post, Body } from '@nestjs/common';
import { BackupService } from './backup.service';

@Controller('backup')
export class BackupController {
  constructor(private readonly backupService: BackupService) {}

  // Auto backup (USB)
  @Post('create')
  async create() {
    const result = await this.backupService.createBackup();

    return {
      success: true,
      type: 'auto',
      data: result,
    };
  }

  // Portable backup (password)
  @Post('export')
  async export(@Body() body: { password: string }) {
    const result = await this.backupService.exportBackup(body.password);

    return {
      success: true,
      type: 'portable',
      data: result,
    };
  }
}