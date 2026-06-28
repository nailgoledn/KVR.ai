import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

const MEMORY_FILE = path.join(
  process.cwd(),
  'ai-memory.json',
);

type MemoryRecord = {
  action: string;
  result: string;
  meta?: any;
  time: string;
};

@Injectable()
export class AiMemoryService {
  private load(): MemoryRecord[] {
    if (!fs.existsSync(MEMORY_FILE)) {
      return [];
    }

    try {
      return JSON.parse(
        fs.readFileSync(
          MEMORY_FILE,
          'utf8',
        ),
      );
    } catch {
      return [];
    }
  }

  private save(
    data: MemoryRecord[],
  ): void {
    fs.writeFileSync(
      MEMORY_FILE,
      JSON.stringify(
        data,
        null,
        2,
      ),
    );
  }

  log(
    action: string,
    result: string,
    meta: any = {},
  ): void {
    const memory = this.load();

    memory.push({
      action,
      result,
      meta,
      time: new Date().toISOString(),
    });

    this.save(memory);
  }

  getInsights() {
    const memory = this.load();

    return {
      total: memory.length,

      success: memory.filter(
        (
          m: MemoryRecord,
        ) => m.result === 'success',
      ).length,

      failed: memory.filter(
        (
          m: MemoryRecord,
        ) => m.result === 'failed',
      ).length,
    };
  }

  suggestNextAction(): string {
    const memory = this.load();

    const last = memory.slice(-5);

    const failures = last.filter(
      (
        m: MemoryRecord,
      ) => m.result === 'failed',
    );

    if (failures.length > 2) {
      return '⚠️ System unstable → slow down auto actions';
    }

    return '✅ System stable → auto mode ON';
  }
}