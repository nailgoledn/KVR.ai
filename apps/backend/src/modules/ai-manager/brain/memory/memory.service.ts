import { Injectable } from '@nestjs/common';

type AgentType = 'product' | 'cto' | 'strategy';

@Injectable()
export class MemoryService {

  private store: any[] = [];

  // =========================
  // AGENT CACHE (TYPE SAFE)
  // =========================
  private agentCache: Record<AgentType, number> = {
    product: 0.5,
    cto: 0.5,
    strategy: 0.5,
  };

  // =========================
  // SAVE MEMORY EVENT
  // =========================
  save(record: any) {
    const item = {
      id: crypto.randomUUID(),
      ...record,
      outcomeScore: null,
      feedback: null,
      improved: false,
    };

    this.store.push(item);
    return item.id;
  }

  // =========================
  // FIND SIMILAR IDEAS
  // =========================
  findSimilar(idea: string) {
    const lower = idea.toLowerCase();

    return this.store
      .filter(item =>
        item.input?.toLowerCase().includes(lower) ||
        lower.includes(item.input?.toLowerCase())
      )
      .slice(-10);
  }

  // =========================
  // UPDATE OUTCOME (LEARNING LOOP)
  // =========================
  updateOutcome(id: string, outcomeScore: number, feedback?: string) {
    const item = this.store.find(x => x.id === id);
    if (!item) return;

    item.outcomeScore = this.clamp(outcomeScore);
    item.feedback = feedback || null;
    item.improved = true;

    this.updateAgentCache();
  }

  // =========================
  // AGENT PERFORMANCE
  // =========================
  getAgentPerformance(agent: AgentType) {
    const items = this.store.filter(r =>
      r.agentsUsed?.includes(agent) &&
      typeof r.outcomeScore === 'number'
    );

    if (!items.length) return 0.5;

    const sum = items.reduce((acc, r) => acc + r.outcomeScore, 0);

    return this.clamp(sum / items.length);
  }

  // =========================
  // ADAPTIVE WEIGHT (USED IN BRAIN)
  // =========================
  getAdaptiveWeight(agent: AgentType) {
    return this.agentCache[agent] ?? 0.5;
  }

  // =========================
  // AUTO LEARNING ENGINE
  // =========================
  private updateAgentCache() {
    const agents: AgentType[] = ['product', 'cto', 'strategy'];

    for (const agent of agents) {
      const items = this.store.filter(r =>
        r.agentsUsed?.includes(agent) &&
        r.outcomeScore !== null
      );

      if (!items.length) continue;

      const avg =
        items.reduce((s, r) => s + r.outcomeScore, 0) / items.length;

      this.agentCache[agent] = this.clamp(
        (this.agentCache[agent] * 0.7) + (avg * 0.3)
      );
    }
  }

  // =========================
  // CLAMP UTILITY
  // =========================
  private clamp(value: number) {
    if (value < 0) return 0;
    if (value > 1) return 1;
    return value;
  }

  // =========================
  // DEBUG
  // =========================
  getAll() {
    return this.store;
  }

  clear() {
    this.store = [];
  }

  getCache() {
    return this.agentCache;
  }
}