import { Injectable } from '@nestjs/common';

import { MemoryService } from '../memory/memory.service';

@Injectable()
export class BrainOrchestratorService {
  constructor(
    private readonly memory: MemoryService,
  ) {}

  async handleMessage(message: string) {
    const memoryId = this.memory.save({
      input: message,
      agentsUsed: ['system'],
      createdAt: Date.now(),
    });

    const response = {
      type: 'system-brain',
      result: `Processed: ${message}`,
    };

    this.memory.save({
      parentId: memoryId,
      input: message,
      response,
      agentsUsed: ['system'],
      createdAt: Date.now(),
    });

    return {
      success: true,
      brain: 'system-brain',
      response,
    };
  }
}