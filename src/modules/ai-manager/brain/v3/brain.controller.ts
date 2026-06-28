import { Controller, Post, Body } from '@nestjs/common';
import { BrainOrchestratorService } from './orchestrator/brain-orchestrator.service';

@Controller('ai')
export class BrainController {

  constructor(
    private readonly brain: BrainOrchestratorService,
  ) {}

  @Post('generate')
  async generate(@Body() body: { input: string }) {
    return this.brain.runPipeline(body.input);
  }
}