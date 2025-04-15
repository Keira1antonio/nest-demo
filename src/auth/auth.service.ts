import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { LogInUserDto } from '@/dtos/LoginUserDto';
import { CreateUserDto } from '@/dtos/CreateUserDto';
import { UsersDbService } from '@/users/usersDb.service';
import { User } from '@/users/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersDbService: UsersDbService,
  ) {}

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

  async singUp(user: CreateUserDto): Promise<User> {
    // Verificar si el usuario ya existe
    const userExists = await this.usersDbService.getUserByEmail(user.email);

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(user.password, 10);

    if (!hashedPassword) {
      throw new BadRequestException('Error hashing password');
    }

    // Crear y guardar el usuario
    const userEntity = this.usersDbService.createUser({
      ...user,
      password: hashedPassword,
    });

    return await this.usersDbService.saveUser(userEntity);
  }
}
