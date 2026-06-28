import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';

@Injectable()
export class DevManagerService {

  // 🔍 معرفة العمليات على بورت
  getPortProcess(port: number) {
    try {
      const result = execSync(`netstat -ano | findstr :${port}`).toString();
      return result || 'FREE';
    } catch {
      return 'FREE';
    }
  }

  // 💀 قتل process
  killPid(pid: number) {
    try {
      execSync(`taskkill /PID ${pid} /F`);
      return { success: true, pid };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  // 🧹 تنظيف بورت كامل
  cleanPort(port: number) {
    const output = this.getPortProcess(port);

    if (output === 'FREE') {
      return { message: 'Port already free' };
    }

    const lines = output.split('\n');

    const killed: number[] = [];

    for (const line of lines) {
      const parts = line.trim().split(/\s+/);
      const pid = parts[parts.length - 1];

      if (!isNaN(Number(pid))) {
        this.killPid(Number(pid));
        killed.push(Number(pid));
      }
    }

    return {
      port,
      killed,
      message: 'Port cleaned successfully'
    };
  }

  // 🚀 تشغيل مشروع
  startCommand(command: string) {
    execSync(`start cmd /k "${command}"`);
    return { running: command };
  }

  // 📊 system health
  systemHealth() {
    return {
      status: 'ok',
      time: new Date().toISOString(),
      memory: process.memoryUsage()
    };
  }
}