import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { CreateUserDto } from '@/dtos/CreateUserDto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: UsersRepository);
    getUsers(page: number, limit: number): Promise<{
        status: number;
        data: User[];
        total: number;
    }>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findByEmail(email: string): void;
    getUserById(id: string): Promise<{
        status: number;
        data?: undefined;
    } | {
        status: number;
        data: {
            orders: {
                id: string;
                date: Date;
            }[];
            id: string;
            email: string;
            name: string;
            password: string;
            address: string;
            phone: number;
            country: string;
            city: string;
            isAdmin: boolean;
            createdAt: Date;
            length: number;
            confirmPassword: string;
        };
    }>;
    getUserByName(name: string): Promise<User | null>;
    updateUser(id: string, userData: Partial<User>): Promise<{
        status: number;
    }>;
    deleteUser(id: string): Promise<{
        status: number;
        message?: undefined;
    } | {
        status: number;
        message: string;
    }>;
}
