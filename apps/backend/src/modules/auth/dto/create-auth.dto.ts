import {
  IsString,
  IsEmail,
  MinLength,
} from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}