import { Injectable } from '@nestjs/common';

import { ProductBrainService } from '../brains/product/product-brain.service';

@Injectable()
export class BrainExecutor {
  constructor(
    private readonly productBrain: ProductBrainService,
  ) {}

  async execute(
    brain: string,
    message: string,
  ) {
    switch (brain) {
      case 'product-brain':
        return this.productBrain.run(message);

      default:
        return {
          type: 'general-brain',
          response: `AI Response: ${message}`,
        };
    }
  }
}