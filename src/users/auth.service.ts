import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from '@/dtos/CreateUserDto';
import { UsersDbService } from './usersDb.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersDbService: UsersDbService) {}

  async singUp(user: CreateUserDto) {
    const userExists = await this.usersDbService.getUserByEmail(user.email);

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    if (!hashedPassword) {
      throw new BadRequestException('Error hashing password');
    }
    const userEntity = this.usersDbService.createUser({
      ...user,
      password: hashedPassword,
    });
    await this.usersDbService.saveUser(userEntity);
  }

  // ********************
}
