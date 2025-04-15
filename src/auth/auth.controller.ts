import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInUserDto } from '@/dtos/LoginUserDto';
import { CreateUserDto } from '@/dtos/CreateUserDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async getAuth() {
    try {
      const authData = await this.authService.getAuth();
      if (!authData) throw new NotFoundException('Auth data not found');
      return authData;
    } catch (error) {
      throw new BadRequestException('Error fetching auth data');
    }
  }

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  async signUp(@Body() signUpDto: CreateUserDto & { confirmPassword: string }) {
    try {
      const user = await this.authService.singUp(signUpDto);
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      if (error.message.includes('User already exists')) {
        throw new BadRequestException('User already exists');
      }
      throw new BadRequestException('Error signing in');
    }
  }
}
