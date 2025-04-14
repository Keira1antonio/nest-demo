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

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() loginUserDto: LogInUserDto) {
    try {
      return await this.authService.signin(loginUserDto);
    } catch (error) {
      throw new BadRequestException('Error signing in');
    }
  }
}
