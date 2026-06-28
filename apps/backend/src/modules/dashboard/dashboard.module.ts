import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { BrainModule } from '../ai-manager/brain/brain.module';

@Module({
  imports: [BrainModule],
  controllers: [DashboardController],
})
export class DashboardModule {}
