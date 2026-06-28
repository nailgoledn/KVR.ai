import { Injectable } from '@nestjs/common';

@Injectable()
export class StrategyBrainService {

  analyze(idea: string) {
    return {
      type: 'strategy',
      analysis: `Strategy analysis for: ${idea}`,
    };
  }
}