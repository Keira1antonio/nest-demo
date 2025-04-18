import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.entity'; // Importa de Entity
import { CreateUserDto } from '@/dtos/CreateUserDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  getUsers(page: number, limit: number) {
    return this.usersRepository.getUsers(page, limit);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // Verificar si el usuario ya existe
    const existingUser = await this.usersRepository.findByEmail(
      createUserDto.email,
    );
    if (existingUser !== null) {
      throw new Error('User already exists');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Crear nueva entidad de usuario
    const newUser = this.usersRepository.createUser({
      ...createUserDto,
      password: hashedPassword, // Sustituir la contraseña por la hasheada
      isAdmin: false,
    });

    // Guardar y retornar el nuevo usuario
    return await this.usersRepository.save(newUser);
  }
  findByEmail(email: string) {
    throw new Error('Method not implemented.');
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
