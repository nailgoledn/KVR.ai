import { Module } from '@nestjs/common';

import { BrainController } from './brain.controller';
import { BrainOrchestratorService } from './orchestrator/brain-orchestrator.service';
import { ArchitectureEngineModule } from './architecture-engine/architecture-engine.module';

@Module({
  imports: [
    ArchitectureEngineModule,
  ],
  controllers: [
    BrainController,
  ],
  providers: [
    BrainOrchestratorService,
  ],
  exports: [
    BrainOrchestratorService,
  ],
})
export class BrainV3Module {}