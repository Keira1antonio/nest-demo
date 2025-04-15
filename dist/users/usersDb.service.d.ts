import { User } from './user.entity';
import { Repository } from 'typeorm';
export declare class UsersDbService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    getUserByEmail(email: string): Promise<User | null>;
    createUser(userData: Partial<User>): User;
    saveUser(user: User): Promise<User>;
    getUsers(page?: number, limit?: number): Promise<{
        status: number;
        data: User[];
        total: number;
    }>;
}
