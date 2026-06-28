import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateFoundingPartnerDto {
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  companyName!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(200)
  fullName!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  country!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  city!: string;

  @IsString()
  @MinLength(5)
  @MaxLength(30)
  phone!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  website?: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  businessType!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  industry!: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  products?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  message?: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  preferredLanguage!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  communicationMethod!: string;
}
