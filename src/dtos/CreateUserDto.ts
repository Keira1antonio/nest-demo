import {
  IsString,
  IsNotEmpty,
  IsEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  IsDate,
  Matches,
  IsNumber,
  Validate,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({
    description: 'The name of the user',
    example: 'Van Rossen',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'The email of the user',
    example: 'Van@Rossen.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  /*@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/, {
    message: 'Password too weak',
  })*/
  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @ApiProperty({
    description: 'The confirm password of the user',
    example: 'password',
  })
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({
    description: 'The address of the user',
    example: 'Calle 123',
  })
  address: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'The phone of the user',
    example: '1234567890',
  })
  phone: number;
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @ApiProperty({
    description: 'The country of the user',
    example: 'Netherlands',
  })
  country: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @ApiProperty({
    description: 'The city of the user',
    example: 'Amsterdam',
  })
  city: string;

  @IsEmpty()
  @ApiProperty({
    description:
      'Asignada por default al momento de crear el usuario, pero no debe ser incluida en el body',
    default: false,
  })
  isAdmin: boolean;

  @ApiProperty({
    description: 'The orders of the user',
    type: [Object],
    readOnly: true,
    required: false,
  })
  orders?: any[];
}
