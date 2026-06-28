import { Injectable } from '@nestjs/common';

@Injectable()
export class BrainRouter {
  route(message: string): string {
    const msg = message.toLowerCase();

    if (msg.includes('product')) {
      return 'product-brain';
    }

    if (msg.includes('price')) {
      return 'product-brain';
    }

    return 'general-brain';
  }
}