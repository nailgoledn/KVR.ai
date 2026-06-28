import { PartialType } from '@nestjs/mapped-types';
import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { CreateFoundingPartnerDto } from './create-founding-partner.dto';
import { FoundingPartnerStatus } from '../interfaces/founding-partner.interface';

export class UpdateFoundingPartnerDto extends PartialType(
  CreateFoundingPartnerDto,
) {
  @IsOptional()
  @IsEnum(FoundingPartnerStatus)
  status?: FoundingPartnerStatus;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  notes?: string;
}
