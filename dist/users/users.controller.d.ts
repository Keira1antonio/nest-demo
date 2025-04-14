import { UsersService } from './users.service';
import { CreateUserDto } from '@/dtos/CreateUserDto';
import { User } from './user.entity';
export declare class UsersController {
    private readonly usersService;
    private readonly userDbService;
    constructor(usersService: UsersService, userDbService: UsersService);
    getUsers(name?: string, page?: number, limit?: number): Promise<User | {
        status: number;
        data: User[];
        total: number;
    } | null>;
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
            length: number;
        };
    }>;
    createUser(createUserDto: CreateUserDto): Promise<{
        status: number;
        id: string;
    }>;
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
