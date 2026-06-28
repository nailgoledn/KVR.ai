import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Wallet } from './entities/wallet.entity';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepo: Repository<Wallet>,

    @InjectRepository(Transaction)
    private txRepo: Repository<Transaction>,
  ) {}

  // ================= FRAUD =================
  private async checkFraud(walletId: number, amount: number) {
    const recentTx = await this.txRepo.count({
      where: { wallet: { id: walletId } },
    });

    if (amount > 5000) {
      throw new BadRequestException('High amount blocked');
    }

    if (recentTx > 10) {
      throw new BadRequestException('Too many operations');
    }

    if (amount > 10000) {
      await this.walletRepo.update(walletId, { isLocked: true });
      throw new BadRequestException('Wallet locked');
    }
  }

  // ================= CREATE WALLET =================
  async createWallet(userId: number) {
    const wallet = this.walletRepo.create({
      balance: 0,
      isLocked: false,
      user: { id: userId } as any,
    });

    const saved = await this.walletRepo.save(wallet);

    return {
      success: true,
      action: 'createWallet',
      walletId: saved.id,
      balance: saved.balance,
    };
  }

  // ================= DEPOSIT =================
  async deposit(walletId: number, amount: number) {
    let wallet = await this.walletRepo.findOne({
      where: { id: walletId },
    });

    if (!wallet) {
      wallet = this.walletRepo.create({
        balance: 0,
        isLocked: false,
        user: { id: 1 } as any,
      });
    }

    if (typeof amount !== 'number' || isNaN(amount)) {
      throw new BadRequestException('Invalid amount');
    }

    wallet.balance = Number(wallet.balance || 0) + Number(amount);

    const saved = await this.walletRepo.save(wallet);

    return {
      success: true,
      action: 'deposit',
      walletId: saved.id,
      balance: saved.balance,
    };
  }

  // ================= WITHDRAW =================
  async withdraw(walletId: number, amount: number, user: any) {
    const wallet = await this.walletRepo.findOne({
      where: { id: walletId },
      relations: { user: true },
    });

    if (!wallet) throw new NotFoundException('Wallet not found');

    if (wallet.isLocked) {
      throw new ForbiddenException('Wallet locked');
    }

    if (wallet.balance < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    wallet.balance -= amount;

    return this.walletRepo.save(wallet);
  }

  // ================= TRANSFER =================
  async transfer(fromId: number, toId: number, amount: number, user: any) {
    await this.checkFraud(fromId, amount);

    const from = await this.walletRepo.findOne({
      where: { id: fromId },
      relations: { user: true },
    });

    const to = await this.walletRepo.findOne({
      where: { id: toId },
    });

    if (!from || !to) throw new NotFoundException('Wallet not found');

    if (from.isLocked) {
      throw new ForbiddenException('Wallet locked');
    }

    from.balance -= amount;
    to.balance += amount;

    await this.walletRepo.save(from);
    await this.walletRepo.save(to);

    return { message: 'Transfer OK' };
  }

  // ================= AI COMMAND =================
  async handleAICommand(input: string) {
    const text = input.toLowerCase();

    if (text.includes('create wallet')) {
      return this.createWallet(1);
    }

    if (text.includes('deposit')) {
      const amount = this.extractNumber(text);
      return this.deposit(1, amount);
    }

    if (text.includes('withdraw')) {
      const amount = this.extractNumber(text);
      return this.withdraw(1, amount, null);
    }

    if (text.includes('transfer')) {
      const amount = this.extractNumber(text);
      return this.transfer(1, 2, amount, null);
    }

    return {
      action: 'unknown',
      result: 'No wallet command detected',
    };
  }

  private extractNumber(text: string): number {
    const match = text.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }
}