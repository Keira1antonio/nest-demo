import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersRepository {
    private readonly userRepository;
    save: any;
    create: any;
    constructor(userRepository: Repository<User>);
    getUsers(page?: number, limit?: number): Promise<{
        status: number;
        data: User[];
        total: number;
    }>;
    createUser(userData: Partial<User>): Promise<{
        status: number;
        id: string;
    }>;
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
            length: number;
            confirmPassword: string;
        };
    }>;
    getByName(name: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
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
