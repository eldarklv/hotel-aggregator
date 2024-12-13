import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsEnum,
  IsPhoneNumber,
} from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['client', 'admin', 'manager'])
  @ApiProperty()
  role: string;

  @IsString()
  @IsPhoneNumber()
  @ApiProperty()
  contactPhone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  passwordHash: string;
}
