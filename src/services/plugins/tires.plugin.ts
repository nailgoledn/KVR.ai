import { ProjectPlugin } from './project.plugin';

export class TiresPlugin implements ProjectPlugin {
  match(input: string): boolean {
    return (
      input.includes('كفرات') ||
      input.includes('tire') ||
      input.includes('tires')
    );
  }

  generate() {
    return {
      modules: [
        'users',
        'products',
        'brands',
        'inventory',
        'cart',
        'orders',
        'payments',
      ],
      database: [
        'users',
        'products',
        'orders',
        'order_items',
        'payments',
      ],
      type: 'ecommerce-tires',
    };
  }
}