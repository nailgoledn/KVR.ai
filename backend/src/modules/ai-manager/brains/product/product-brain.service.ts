import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductBrainService {
  async run(message: string) {
    return {
      type: 'product-brain',
      analysis: `Analyzing product request: ${message}`,
      suggestion:
        'This is a mock AI response for product brain',
    };
  }
}