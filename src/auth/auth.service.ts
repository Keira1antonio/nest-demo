import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { LogInUserDto } from '@/dtos/LoginUserDto';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getAuth() {
    return `Get Auth`;
  }

  async signin(loginUserDto: LogInUserDto) {
    const { email, password } = loginUserDto;

    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.usersRepository.findByEmail(email);

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Email or password are incorrect');
    }

    return { status: 200, message: 'Login successful' };
  }
}
