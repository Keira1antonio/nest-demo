import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(page: number = 1, limit: number = 5) {
    const [users, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['orders'],
    });

    return { status: 200, data: users, total };
  }

  async createUser(userData: Partial<User>) {
    const user = this.userRepository.create(userData);
    await this.userRepository.save(user);
    return { status: 201, id: user.id };
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['orders'],
    });

    if (!user) return { status: 404 };

    return {
      status: 200,
      data: {
        ...user,
        orders: user.orders.map((order) => ({
          id: order.id,
          date: order.date,
        })),
      },
    };
  }

  async getByName(name: string) {
    return await this.userRepository.findOneBy({ name });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async updateUser(id: string, userData: Partial<User>) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) return { status: 404 };

    await this.userRepository.update(id, userData);
    return { status: 200 };
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) return { status: 404 };

    await this.userRepository.remove(user);
    return { status: 200, message: 'User deleted successfully' };
  }
}
