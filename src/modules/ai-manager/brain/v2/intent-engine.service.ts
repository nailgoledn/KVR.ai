import { Injectable } from '@nestjs/common';

export type IntentType = 'build' | 'idea' | 'plan' | 'chat';

@Injectable()
export class IntentEngineService {

  detect(text: string): { intent: IntentType; confidence: number } {
    const t = text.toLowerCase();

    // =========================
    // BUILD (مشاريع)
    // =========================
    if (
      t.includes('ابني') ||
      t.includes('build') ||
      t.includes('مشروع') ||
      t.includes('متجر') ||
      t.includes('نظام') ||
      t.includes('تطبيق')
    ) {
      return { intent: 'build', confidence: 0.95 };
    }

    // =========================
    // IDEA
    // =========================
    if (
      t.includes('فكرة') ||
      t.includes('idea') ||
      t.includes('اقتراح')
    ) {
      return { intent: 'idea', confidence: 0.9 };
    }

    // =========================
    // PLAN
    // =========================
    if (
      t.includes('خطة') ||
      t.includes('plan') ||
      t.includes('خطوات') ||
      t.includes('ازاي')
    ) {
      return { intent: 'plan', confidence: 0.85 };
    }

    // =========================
    // DEFAULT CHAT
    // =========================
    return { intent: 'chat', confidence: 0.5 };
  }
}