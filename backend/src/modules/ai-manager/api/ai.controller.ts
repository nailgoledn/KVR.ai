import { Body, Controller, Post } from '@nestjs/common';
import { BrainOrchestratorService } from '../orchestrator/brain-orchestrator.service';

@Controller('ai')
export class AiController {
  constructor(
    private readonly orchestrator: BrainOrchestratorService,
  ) {}

  @Post('chat')
  async chat(
    @Body() body: { message: string },
  ) {
    return this.orchestrator.handleMessage(
      body.message,
    );
  }
}