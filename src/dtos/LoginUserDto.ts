import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class LogInUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
