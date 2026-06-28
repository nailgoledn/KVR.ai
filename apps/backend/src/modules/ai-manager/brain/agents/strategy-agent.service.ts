import { Injectable } from '@nestjs/common';

@Injectable()
export class StrategyAgentService {

  analyze(idea: string) {
    return {
      role: 'strategy',
      score: 0.8,
      output: `Strategy Agent → analyzes market and growth for: ${idea}`,
      insights: [
        'Market demand',
        'Competition',
        'Business model viability'
      ]
    };
  }
}