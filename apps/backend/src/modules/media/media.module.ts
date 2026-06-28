import { Module } from '@nestjs/common';
import { ImageController } from './image/image.controller';
import { VideoController } from './video/video.controller';
import { ImageService } from './image/image.service';
import { VideoService } from './video/video.service';

@Module({
  controllers: [ImageController, VideoController],
  providers: [ImageService, VideoService]
})
export class MediaModule {}
