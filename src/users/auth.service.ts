import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersDbService } from './usersDb.service';
import { CreateUserDto } from '@/dtos/CreateUserDto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from '@/roles.unum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersDbService: UsersDbService,
    private readonly jwtService: JwtService,
  ) {}

  async singUp(
    userData: CreateUserDto,
  ): Promise<Omit<User, 'password' | 'confirmPassword'>> {
    if (userData.password !== userData.confirmPassword) {
      throw new BadRequestException('Password does not match');
    }
    const dbUser = await this.usersDbService.getUserByEmail(userData.email);

    if (dbUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    if (!hashedPassword) {
      throw new BadRequestException('password not hashed');
    }
    //this.usersDbService.createUser({ ...user, password: hashedPassword });
    const savedUser = await this.usersDbService.createAndSaveUser({
      ...userData,
      password: hashedPassword,
      orders: userData.orders || [],
    });

    const { password, confirmPassword, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async sinIn(email: string, password: string) {
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const dbUser = await this.usersDbService.getUserByEmail(email);

    const isPasswordValid =
      dbUser && (await bcrypt.compare(password, dbUser.password));

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const userPayload = {
      sub: dbUser.id,
      id: dbUser.id,
      email: dbUser.email,
      //isAdmin: dbUser.isAdmin,
      //roles: [dbUser.isAdmin ? Role.Admin : Role.User],
    };

    const token = this.jwtService.sign(userPayload);

    return { success: 'User logged in successfully', token };
  }
}
