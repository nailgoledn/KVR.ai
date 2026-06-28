import { Module } from '@nestjs/common';

import { AiManagerController } from './ai-manager.controller';
import { AiManagerService } from './ai-manager.service';
import { ImageGeneratorService } from './brain/image-generator.service';

import { BrainModule } from './brain/brain.module';

@Module({
  imports: [BrainModule],

  controllers: [AiManagerController],

  providers: [AiManagerService, ImageGeneratorService],

  exports: [AiManagerService],
})
export class AiManagerModule {}
