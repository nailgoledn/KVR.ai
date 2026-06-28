import { IsOptional, IsIn, IsNumberString } from 'class-validator';

export class TransactionFilterDto {
  @IsOptional()
  @IsIn(['deposit', 'transfer'])
  type?: 'deposit' | 'transfer';

  @IsOptional()
  @IsNumberString()
  walletId?: number;
}