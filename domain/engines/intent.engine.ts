import { Injectable } from '@nestjs/common';

@Injectable()
export class IntentEngine {

  analyze(input: string) {
    return {
      raw: input,
      businessType: input.includes('كفرات') ? 'ecommerce' : 'general',
      complexity: input.length > 30 ? 'high' : 'low',
    };
  }
}