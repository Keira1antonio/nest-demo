import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@/dtos/CreateUserDto';
export declare class UsersDbService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    getUserByEmail(email: string): Promise<User | null>;
    createAndSaveUser(userData: Omit<CreateUserDto, 'confirmPassword'> & {
        password: string;
    }): Promise<User>;
    saveUser(user: User): Promise<User>;
    getUsers(page?: number, limit?: number): Promise<{
        status: number;
        data: User[];
        total: number;
    }>;
}
