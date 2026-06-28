import { Injectable } from '@nestjs/common';

export interface ArchitectureResult {
  frontend: string;
  backend: string;
  database: string;
  cache: string;
  storage: string;
  deployment: string;
  patterns: string[];
  notes: string[];
}

@Injectable()
export class ArchitectureEngineService {

  async generateArchitecture(intent: any, blueprint: any): Promise<ArchitectureResult> {

    const businessType = intent?.businessType || 'general';
    const complexity = intent?.complexityScore || 5;

    return {
      frontend: this.pickFrontend(businessType, complexity),
      backend: this.pickBackend(businessType, complexity),
      database: this.pickDatabase(businessType, complexity),
      cache: complexity > 6 ? 'Redis' : 'none',
      storage: complexity > 7 ? 'S3-compatible' : 'local',
      deployment: complexity > 6 ? 'Docker + CI/CD' : 'single-server',
      patterns: this.pickPatterns(businessType, complexity),
      notes: [
        'Architecture Engine v1',
        `Business: ${businessType}`,
        `Complexity: ${complexity}`,
      ],
    };
  }

  private pickFrontend(type: string, complexity: number): string {
    if (type === 'ecommerce') return 'Next.js';
    if (type === 'dashboard') return 'Next.js + Tailwind';
    if (complexity > 7) return 'Next.js Micro Frontend';
    return 'React';
  }

  private pickBackend(type: string, complexity: number): string {
    if (type === 'ai') return 'NestJS + Python Bridge';
    if (type === 'ecommerce') return 'NestJS';
    if (complexity > 8) return 'NestJS Microservices';
    return 'NestJS';
  }

  private pickDatabase(type: string, complexity: number): string {
    if (type === 'analytics') return 'ClickHouse';
    if (type === 'ecommerce') return 'PostgreSQL';
    if (complexity > 7) return 'PostgreSQL + MongoDB';
    return 'PostgreSQL';
  }

  private pickPatterns(type: string, complexity: number): string[] {
    const patterns = ['Modular Architecture'];

    if (complexity > 6) {
      patterns.push('Event Driven');
      patterns.push('CQRS');
    }

    if (complexity > 8) {
      patterns.push('Microservices');
      patterns.push('Message Queue');
    }

    return patterns;
  }
}