import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductBrainService {

  analyze(idea: string) {
    return {
      type: 'product',
      analysis: `Product analysis for: ${idea}`,
    };
  }
}