import { Injectable } from '@nestjs/common';

@Injectable()
export class CtoAgentService {

  analyze(idea: string) {
    return {
      role: 'cto',
      score: 0.85,
      output: `CTO Agent → analyzes system architecture for: ${idea}`,
      insights: [
        'Scalability risks',
        'System design',
        'Tech stack suitability'
      ]
    };
  }
}