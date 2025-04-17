import {
  Controller,
  Post,
  Body,
  Req,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@/dtos/CreateUserDto';
import { UserCredentialsDto } from '@/dtos/userCredentials.dto';
import { DateAdderInterceptor } from '@/interceptors/date-adder.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UseInterceptors(DateAdderInterceptor)
  async signup(
    @Body() user: CreateUserDto,
    @Req() req: Request & { now: string },
  ) {
    try {
      return await this.authService.singUp({
        ...user,
        createdAt: req.now,
      } as any);
    } catch (error) {
      throw new BadRequestException('Error signing up');
    }
  }

  @Post('signin')
  async signin(@Body() user: UserCredentialsDto) {
    try {
      return await this.authService.sinIn(user.email, user.password);
    } catch (error) {
      throw new BadRequestException('Error signing in');
    }
  }
}
