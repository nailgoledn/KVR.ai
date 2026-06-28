import { Injectable } from '@nestjs/common';
import { IntentEngineService } from './v2/intent-engine.service';

@Injectable()
export class SystemBrainService {

  constructor(
    private readonly intentEngine: IntentEngineService,
  ) {}

  // =========================
  // MAIN PROCESS
  // =========================
  async process(input: string) {

    // 1. Detect Intent
    const intent = this.intentEngine.detect(input);

    // 2. Route based on intent
    const blueprint = this.routeIntent(intent, input);

    return {
      ok: true,
      input,
      intent,
      blueprint,
      generated: true,
      timestamp: new Date().toISOString(),
    };
  }

  // =========================
  // ROUTER (NEW ARCHITECTURE)
  // =========================
  private routeIntent(intent: any, input: string) {

    switch (intent.type) {

      case 'ecommerce':
        return this.buildEcommerceBlueprint();

      case 'system':
        return this.buildSystemBlueprint();

      default:
        return this.buildGenericBlueprint();
    }
  }

  // =========================
  // BLUEPRINTS
  // =========================

  private buildEcommerceBlueprint() {
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

  private buildSystemBlueprint() {
    return {
      type: 'system',

      modules: [
        'core',
        'auth',
        'permissions',
        'logging',
      ],

      database: [
        'users',
        'roles',
        'permissions',
        'logs',
      ],

      api: [
        'POST /auth/login',
        'POST /auth/register',
        'GET /system/health',
      ],

      roadmap: [
        'Setup Core System',
        'Implement Auth',
        'Add RBAC',
        'Enable Logging',
      ],
    };
  }

  private buildGenericBlueprint() {
    return {
      type: 'generic',
      modules: ['core'],
      database: ['memory'],
      api: [],
      roadmap: ['Handle request'],
    };
  }
}