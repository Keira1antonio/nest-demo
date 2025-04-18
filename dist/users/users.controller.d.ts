import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
export declare class UsersController {
    private readonly usersService;
    private readonly userDbService;
    private readonly authService;
    constructor(usersService: UsersService, userDbService: UsersService, authService: AuthService);
    getUsers(name?: string, page?: number, limit?: number): Promise<User | {
        status: number;
        data: User[];
        total: number;
    } | null>;
    getAdmin(): string;
    getUserById(id: string, request: Request & {
        user: any;
    }): Promise<{
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
        confirmPassword: string;
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
