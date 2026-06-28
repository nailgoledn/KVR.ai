import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Transaction } from './transaction.entity';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: 0 })
  balance!: number;

  @Column({ default: false })
  isLocked!: boolean;

  @ManyToOne(() => User, user => user.wallets)
  user!: User;

  @OneToMany(() => Transaction, (tx) => tx.wallet)
  transactions!: Transaction[];
}