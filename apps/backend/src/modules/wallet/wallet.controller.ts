import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { WalletService } from './wallet.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';

@Controller('wallet')
@UseGuards(JwtAuthGuard)
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('transfer')
  transfer(
    @Body() body: { fromId?: number; toId?: number; amount?: number },
    @Request() req: ExpressRequest,
  ) {
    const { fromId, toId, amount } = body;
    if (!fromId || !toId || !amount) {
      throw new BadRequestException('fromId, toId, and amount are required');
    }
    return this.walletService.transfer(fromId, toId, amount, req.user);
  }

  @Post('withdraw')
  withdraw(
    @Body() body: { walletId?: number; amount?: number },
    @Request() req: ExpressRequest,
  ) {
    const { walletId, amount } = body;
    if (!walletId || !amount) {
      throw new BadRequestException('walletId and amount are required');
    }
    return this.walletService.withdraw(walletId, amount, req.user);
  }

  @Post('deposit')
  deposit(@Body() body: { walletId?: number; amount?: number }) {
    const { walletId, amount } = body;
    if (!walletId || !amount) {
      throw new BadRequestException('walletId and amount are required');
    }
    return this.walletService.deposit(walletId, amount);
  }
}
