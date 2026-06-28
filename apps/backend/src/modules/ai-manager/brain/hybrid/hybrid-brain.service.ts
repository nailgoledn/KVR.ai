import { Injectable } from '@nestjs/common';

export interface BrainInput {
  idea: string;
  context?: Record<string, any>;
}

export interface BrainOutput {
  type: 'product' | 'cto' | 'strategy' | 'unknown';
  confidence: number;
  data: any;
}

@Injectable()
export class HybridBrainService {

  async process(input: BrainInput): Promise<BrainOutput> {

    const type = this.classify(input.idea);

    return {
      type,
      confidence: 0.75,
      data: {
        idea: input.idea,
        status: 'processed by hybrid brain'
      }
    };
  }

  private classify(idea: string): BrainOutput['type'] {
    const text = idea.toLowerCase();

    if (text.includes('app') || text.includes('saas')) return 'product';
    if (text.includes('system') || text.includes('architecture')) return 'cto';
    if (text.includes('market') || text.includes('growth')) return 'strategy';

    return 'product';
  }
}