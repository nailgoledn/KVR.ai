import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

import { HybridBrainService } from './brain/hybrid/hybrid-brain.service';
import { BrainOrchestratorService } from './brain/orchestrator/brain-orchestrator.service';
import { IntentEngineService } from './brain/v2/intent-engine.service';

@Injectable()
export class AiManagerService {

  private openai: OpenAI | null = null;

  constructor(
    private readonly hybridBrain: HybridBrainService,
    private readonly orchestrator: BrainOrchestratorService,
    private readonly intentEngine: IntentEngineService,
  ) {
    const key = process.env.OPENAI_API_KEY;
    if (key) {
      this.openai = new OpenAI({ apiKey: key });
    }
  }

  // =========================
  // MAIN ENTRY (PRODUCTION)
  // =========================
  async process(message: string) {

    // 1. Intent detection
    const intent = this.intentEngine.detect(message);

    // 2. Orchestrator execution (IMPORTANT: await fix)
    const orchestrated = await this.orchestrator.handleMessage(message);

    // 3. AI decision layer
    const shouldUseOpenAI =
      intent.confidence > 0.6 &&
      (intent.intent === 'build' || intent.intent === 'plan');

    let openaiResult: string | null = null;

    // 4. OpenAI enhancement layer
    if (shouldUseOpenAI && this.openai) {
      try {
        const response = await this.openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'KVRAT.ai Engine (K.V.R) - Production Mode',
            },
            {
              role: 'user',
              content: message,
            },
          ],
        });

        openaiResult = response.choices?.[0]?.message?.content ?? null;

      } catch (error) {
        openaiResult = null;
      }
    }

    // 5. Final response (single stable contract)
    return {
      ok: true,
      app: 'KVRAT.ai',
      engine: 'K.V.R',

      input: message,

      intent: intent.intent,
      confidence: intent.confidence,

      orchestrator: orchestrated,

      openai: openaiResult,

      decision: shouldUseOpenAI ? 'ai-enhanced' : 'hybrid-only',
    };
  }
}