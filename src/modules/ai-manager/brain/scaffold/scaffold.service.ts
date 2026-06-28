import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ScaffoldService {

  generate(projectName: string, blueprint: any) {

    const basePath = path.join(process.cwd(), 'src/generated', projectName);

    this.ensureDir(basePath);

    blueprint.modules.forEach((m: string) => {
      const modulePath = path.join(basePath, m);
      this.ensureDir(modulePath);

      fs.writeFileSync(
        path.join(modulePath, `${m}.service.ts`),
        `export class ${this.cap(m)}Service {}`
      );

      fs.writeFileSync(
        path.join(modulePath, `${m}.controller.ts`),
        `export class ${this.cap(m)}Controller {}`
      );
    });

    return { ok: true, path: basePath };
  }

  private ensureDir(dir: string) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  private cap(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}