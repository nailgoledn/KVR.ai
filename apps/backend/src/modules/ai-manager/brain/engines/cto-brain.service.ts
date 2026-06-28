import { Injectable } from '@nestjs/common';

@Injectable()
export class CtoBrainService {

  analyze(idea: string) {
    return {
      type: 'cto',
      analysis: `CTO analysis for: ${idea}`,
    };
  }
}