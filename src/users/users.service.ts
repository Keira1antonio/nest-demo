import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.entity'; // Importa de Entity

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  getUsers(page: number, limit: number) {
    return this.usersRepository.getUsers(page, limit);
  }

  async createUser(userData: Partial<User>) {
    return await this.usersRepository.createUser(userData);
  }

  async getUserById(id: string) {
    return await this.usersRepository.getUserById(id);
  }

  async getUserByName(name: string) {
    return await this.usersRepository.getByName(name);
  }

  async updateUser(id: string, userData: Partial<User>) {
    return await this.usersRepository.updateUser(id, userData);
  }

  async deleteUser(id: string) {
    return await this.usersRepository.deleteUser(id);
  }
}
