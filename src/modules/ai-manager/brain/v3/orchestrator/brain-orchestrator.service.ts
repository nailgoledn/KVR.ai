import { Injectable } from '@nestjs/common';
import { ArchitectureEngineService } from '../../../architecture-engine/architecture-engine.service';

@Injectable()
export class BrainOrchestratorService {

  constructor(
    private readonly architectureEngine: ArchitectureEngineService,
  ) {}

  async runPipeline(input: string) {

    const intent = this.analyzeIntent(input);
    const blueprint = this.generateBlueprint(intent);

    const architecture = await this.architectureEngine.generateArchitecture(
      intent,
      blueprint,
    );

    const database = this.generateDatabase(blueprint);
    const apis = this.generateApis(blueprint);

    return {
      success: true,
      data: {
        input,
        intent,
        blueprint,
        architecture,
        database,
        apis,
      }
    };
  }

  private analyzeIntent(input: string) {
    return {
      raw: input,
      businessType: input.includes('كفرات') ? 'ecommerce' : 'general',
      complexityScore: input.length > 30 ? 8 : 5,
    };
  }

  private generateBlueprint(intent: any) {
    return {
      modules: ['auth', 'core'],
      type: intent.businessType,
    };
  }

  private generateDatabase(blueprint: any) {
    const base = ['users', 'roles'];

    if (blueprint.type === 'ecommerce') {
      base.push('products', 'categories', 'orders');
    }

    return {
      engine: 'postgresql',
      tables: base,
      relations: [],
    };
  }

  private generateApis(blueprint: any) {
    const base = [
      'POST /auth/register',
      'POST /auth/login',
    ];

    if (blueprint.type === 'ecommerce') {
      base.push('GET /products', 'POST /orders');
    }

    return base;
  }
}