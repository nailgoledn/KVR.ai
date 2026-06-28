import { Injectable } from '@nestjs/common';

export type IntentType = 'build' | 'idea' | 'plan' | 'chat';

export interface IntentResult {
  intent: IntentType;
  confidence: number;
  keywords: string[];
}

@Injectable()
export class IntentEngineService {

  // =========================
  // MAIN DETECTION ENGINE
  // =========================
  detect(text: string): IntentResult {

    const t = text.toLowerCase();

    const keywords: string[] = [];

    const score = {
      build: 0,
      idea: 0,
      plan: 0,
      chat: 0.3, // default baseline
    };

    // =========================
    // BUILD INTENT
    // =========================
    if (
      t.includes('ابني') ||
      t.includes('build') ||
      t.includes('متجر') ||
      t.includes('مشروع') ||
      t.includes('تطبيق') ||
      t.includes('system')
    ) {
      score.build += 0.7;
      keywords.push('build');
    }

    // =========================
    // IDEA INTENT
    // =========================
    if (
      t.includes('فكرة') ||
      t.includes('idea') ||
      t.includes('اقتراح')
    ) {
      score.idea += 0.7;
      keywords.push('idea');
    }

    // =========================
    // PLAN INTENT
    // =========================
    if (
      t.includes('خطة') ||
      t.includes('plan') ||
      t.includes('ازاي') ||
      t.includes('how')
    ) {
      score.plan += 0.7;
      keywords.push('plan');
    }

    // =========================
    // CHAT BOOST
    // =========================
    if (
      t.includes('مرحبا') ||
      t.includes('hello') ||
      t.includes('hi')
    ) {
      score.chat += 0.4;
      keywords.push('chat');
    }

    // =========================
    // FIND BEST INTENT
    // =========================
    const bestIntent = this.getBestIntent(score);

    return {
      intent: bestIntent,
      confidence: this.normalize(score[bestIntent]),
      keywords,
    };
  }

  // =========================
  // HELPERS
  // =========================
  private getBestIntent(score: Record<IntentType, number>): IntentType {
    return (Object.keys(score) as IntentType[]).reduce((a, b) =>
      score[a] > score[b] ? a : b
    );
  }

  private normalize(value: number): number {
    if (value >= 1) return 0.99;
    return Math.round(value * 100) / 100;
  }
}