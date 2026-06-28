import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductAgentService {

  analyze(idea: string) {
    return {
      role: 'product',
      score: 0.7,
      output: `Product Agent → analyzes user value and features for: ${idea}`,
      insights: [
        'MVP scope',
        'User pain points',
        'Feature prioritization'
      ]
    };
  }
}