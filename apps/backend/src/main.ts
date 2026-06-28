import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';

import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  // =========================
  // SECURITY
  // =========================
  app.use(helmet());

  app.use(
    rateLimit({
      windowMs: 10 * 60 * 1000,
      max: 80,
      message: '⛔ Too many requests',
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  app.use(cookieParser());

  // =========================
  // GLOBAL VALIDATION PIPE
  // =========================
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // =========================
  // GLOBAL ERROR HANDLER
  // =========================
  app.useGlobalFilters(new AllExceptionsFilter());

  // =========================
  // CORS (Flutter + Web + Mobile)
  // =========================
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // =========================
  // START SERVER (MOBILE ACCESS)
  // =========================
  const port = Number(config.get('PORT')) || 4000;

  await app.listen(port, '0.0.0.0');

  console.log('🛡️ KVRAT.ai ENGINE ONLINE');
  console.log(`🌍 http://localhost:${port}`);
}

bootstrap();