import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { randomUUID } from 'crypto';

@Injectable()
export class UploadService {
  private uploadPath = path.join(process.cwd(), 'uploads');

  constructor() {
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath);
    }
  }

  handleUpload(file: Express.Multer.File) {
    // =========================
    // 🛡️ ZERO TRUST VALIDATION
    // =========================

    const allowedMimeTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'application/pdf',
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('File type not allowed');
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new BadRequestException('File too large (max 5MB)');
    }

    const safeName = randomUUID() + path.extname(file.originalname);

    const fullPath = path.join(this.uploadPath, safeName);

    fs.writeFileSync(fullPath, file.buffer);

    return {
      message: 'File uploaded successfully',
      filename: safeName,
      path: fullPath,
    };
  }
}