import { Controller, Get } from '@nestjs/common';
import { MemoryService } from '../ai-manager/brain/memory/memory.service';

@Controller('dashboard')
export class DashboardController {

  constructor(
    private readonly memoryService: MemoryService,
  ) {}

  @Get()
  getDashboard() {

    const all = this.memoryService.getAll();

    const agentStats = {
      product: 0,
      cto: 0,
      strategy: 0,
    };

    let lastDecision = null;

    let totalScore = 0;
    let validScores = 0;

    for (const record of all) {

      const route = record.route as keyof typeof agentStats;

      agentStats[route] = (agentStats[route] || 0) + 1;

      lastDecision = record;

      if (record.result?.score) {
        totalScore += record.result.score;
        validScores++;
      }
    }

    const mostUsedAgent =
      Object.entries(agentStats)
        .sort((a, b) => b[1] - a[1])[0]?.[0] || 'none';

    const avgDecisionScore =
      validScores === 0 ? 0 : totalScore / validScores;

    const systemIntelligence =
      Math.min(100, Math.round(avgDecisionScore * 10));

    return {
      status: 'active',
      service: 'KVRAT Startup OS',

      runtime: {
        mode: 'startup-os-v1',
        memory: 'enabled',
        dashboard: 'separated-module',
      },

      metrics: {
        totalIdeas: all.length,
        agentUsage: agentStats,
        mostUsedAgent,
        lastDecision,

        intelligence: {
          averageDecisionScore: avgDecisionScore,
          systemIntelligenceScore: systemIntelligence,
        },
      },
    };
  }
}