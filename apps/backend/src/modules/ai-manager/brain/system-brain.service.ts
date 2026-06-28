import { Injectable } from '@nestjs/common';

@Injectable()
export class SystemBrainService {
  constructor() {}

  // =========================
  // MAIN PROCESS
  // =========================
  async process(input: string) {
    const blueprint = this.generateSystemBlueprint(input);

    return {
      ok: true,
      input,
      blueprint,
      generated: true,
      timestamp: new Date().toISOString(),
    };
  }

  // =========================
  // BLUEPRINT ENGINE
  // =========================
  private generateSystemBlueprint(input: string) {
    const t = input.toLowerCase();

    if (
      t.includes('متجر') ||
      t.includes('كفرات') ||
      t.includes('tires') ||
      t.includes('shop') ||
      t.includes('store')
    ) {
      return {
        type: 'e-commerce',

        modules: [
          'auth',
          'users',
          'products',
          'categories',
          'brands',
          'cart',
          'orders',
          'payments',
          'shipping',
          'inventory',
          'reviews',
        ],

        database: [
          'users',
          'products',
          'categories',
          'brands',
          'carts',
          'cart_items',
          'orders',
          'order_items',
          'payments',
          'reviews',
          'inventory',
        ],

        api: [
          'POST /auth/register',
          'POST /auth/login',

          'GET /products',
          'GET /products/:id',
          'POST /products',

          'POST /cart/add',
          'GET /cart',

          'POST /orders',
          'GET /orders',

          'POST /payments/checkout',
        ],

        roadmap: [
          'Setup Auth System',
          'Create Product Module',
          'Create Cart System',
          'Create Orders Flow',
          'Integrate Payments',
          'Build Admin Dashboard',
        ],
      };
    }

    return {
      type: 'generic',
      modules: ['core'],
      database: ['memory'],
      api: [],
      roadmap: ['Handle request'],
    };
  }
}