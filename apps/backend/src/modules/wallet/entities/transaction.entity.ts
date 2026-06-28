import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { Wallet } from './wallet.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: 'deposit' | 'withdraw' | 'transfer';

  @Column()
  amount!: number;

  @Column()
  balanceBefore!: number;

  @Column()
  balanceAfter!: number;

  @Column()
  reference!: string;

  @Column()
  createdAt!: Date;

  @ManyToOne(() => Wallet, (wallet) => wallet.transactions)
  wallet!: Wallet;
}