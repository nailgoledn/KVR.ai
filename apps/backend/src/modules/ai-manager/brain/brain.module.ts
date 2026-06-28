import { Module } from '@nestjs/common';

import { HybridBrainService } from './hybrid/hybrid-brain.service';

import { ProductBrainService } from './engines/product-brain.service';
import { CtoBrainService } from './engines/cto-brain.service';
import { StrategyBrainService } from './engines/strategy-brain.service';

import { ProductAgentService } from './agents/product-agent.service';
import { CtoAgentService } from './agents/cto-agent.service';
import { StrategyAgentService } from './agents/strategy-agent.service';

import { BrainOrchestratorService } from './orchestrator/brain-orchestrator.service';
import { MemoryService } from './memory/memory.service';

import { SystemBrainService } from './system-brain.service';
import { IntentEngineService } from './v2/intent-engine.service';

@Module({
  providers: [
    MemoryService,

    HybridBrainService,
    SystemBrainService,
    IntentEngineService,

    ProductBrainService,
    CtoBrainService,
    StrategyBrainService,

    ProductAgentService,
    CtoAgentService,
    StrategyAgentService,

    BrainOrchestratorService,
  ],

  exports: [
    MemoryService,
    HybridBrainService,
    SystemBrainService,
    IntentEngineService,

    ProductBrainService,
    CtoBrainService,
    StrategyBrainService,

    ProductAgentService,
    CtoAgentService,
    StrategyAgentService,

    BrainOrchestratorService,
  ],
})
export class BrainModule {}