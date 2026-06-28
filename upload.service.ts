import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class UploadService {
  async process(file: Express.Multer.File) {
    // Security log
    console.log('UPLOAD:', {
      file: file.filename,
      size: file.size,
      type: file.mimetype,
    });

    // Optional: quarantine check hook
    const path = file.path;

    // ensure file exists
    if (!fs.existsSync(path)) {
      throw new Error('File storage error');
    }

    return {
      message: 'File uploaded securely',
      filename: file.filename,
      path: file.path,
    };
  }
}