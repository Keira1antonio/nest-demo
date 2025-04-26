import {
  Controller,
  Post,
  Body,
  Req,
  UseInterceptors,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@/dtos/CreateUserDto';
import { UserCredentialsDto } from '@/dtos/userCredentials.dto';
import { DateAdderInterceptor } from '@/interceptors/date-adder.interceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  @UseInterceptors(DateAdderInterceptor)
  async signup(
    @Body() user: CreateUserDto,
    @Req() req: Request & { now: string },
  ) {
    try {
      return await this.authService.singUp({
        ...user,
      } as any);
    } catch (error) {
      throw new BadRequestException('Error signing up');
    }
  }
  @ApiBearerAuth()
  @Post('signin')
  @HttpCode(200)
  async signin(@Body() user: UserCredentialsDto) {
    try {
      return await this.authService.sinIn(user.email, user.password);
    } catch (error) {
      throw new BadRequestException('Error signing in');
    }
  }
}
