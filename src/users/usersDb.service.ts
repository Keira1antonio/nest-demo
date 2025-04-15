import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Order } from '@/orders/Order.entity';

@Injectable()
export class UsersDbService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  getUserByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  createUser(userData: Partial<User>): User {
    return this.usersRepository.create(userData);
  }

  async saveUser(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async getUsers(page: number = 1, limit: number = 5) {
    const [users, total] = await this.usersRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { status: 200, data: users, total };
  }
}
