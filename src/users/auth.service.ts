import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersDbService } from './usersDb.service';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersDbService: UsersDbService,
    private readonly jwtService: JwtService,
  ) {}

  async singUp(user: User) {
    const dbUser = await this.usersDbService.getUserByEmail(user.email);

    if (dbUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    if (!hashedPassword) {
      throw new BadRequestException('password not hashed');
    }
    //this.usersDbService.createUser({ ...user, password: hashedPassword });
    const newUser = { ...user, password: hashedPassword };
    await this.usersDbService.createUser(newUser);
    return this.usersDbService.saveUser(newUser);
  }

  async sinIn(email: string, password: string) {
    const dbUser = await this.usersDbService.getUserByEmail(email);
    if (!dbUser) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, dbUser.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Password Invalid');
    }

    const userPayload = {
      sub: dbUser.id,
      id: dbUser.id,
      email: dbUser.email,
    };

    const token = this.jwtService.sign(userPayload);

    return { success: 'User logged in successfully', token };
  }
}
