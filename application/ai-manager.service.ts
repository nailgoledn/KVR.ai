import { Injectable } from '@nestjs/common';
import { BrainService } from '../domain/brain.service';

@Injectable()
export class AiManagerService {

  constructor(
    private readonly brain: BrainService,
  ) {}

  async chat(input: string) {
    return this.brain.runPipeline(input);
  }
}