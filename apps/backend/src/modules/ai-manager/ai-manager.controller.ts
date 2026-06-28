import { Controller, Post, Body, Get } from '@nestjs/common';
import { AiManagerService } from './ai-manager.service';
import { ImageGeneratorService } from './brain/image-generator.service';

@Controller('ai')
export class AiManagerController {
  constructor(
    private readonly aiManager: AiManagerService,
    private readonly imageGenerator: ImageGeneratorService,
  ) {}

  @Post('chat')
  async chat(@Body() body: { message?: string; input?: string }) {
    const message = body.message ?? body.input ?? '';
    return this.aiManager.process(message);
  }

  @Post('generate')
  async generate(@Body() body: { message?: string; input?: string }) {
    const message = body.message ?? body.input ?? '';
    return this.aiManager.process(message);
  }

  @Post('image/generate')
  async generateImage(@Body() body: { prompt: string }) {
    return this.imageGenerator.generate(body.prompt);
  }

  @Get('status')
  status() {
    return {
      ok: true,
      app: 'KVRAT.ai',
      engine: 'K.V.R',
    };
  }
}
