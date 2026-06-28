import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { UploadService } from './upload.service';
  import { extname } from 'path';
  
  @Controller('upload')
  export class UploadController {
    constructor(private readonly uploadService: UploadService) {}
  
    @Post('file')
    @UseInterceptors(
      FileInterceptor('file', {
        limits: {
          fileSize: 2 * 1024 * 1024, // 2MB max
          files: 1,
        },
        fileFilter: (req, file, cb) => {
          const allowed = [
            'image/jpeg',
            'image/png',
            'application/pdf',
          ];
  
          if (!allowed.includes(file.mimetype)) {
            return cb(
              new BadRequestException('Invalid file type'),
              false,
            );
          }
  
          cb(null, true);
        },
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const unique =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
  
            cb(null, unique + extname(file.originalname));
          },
        }),
      }),
    )
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
      if (!file) throw new BadRequestException('No file uploaded');
  
      return this.uploadService.process(file);
    }
  }