import { UsersService } from './users.service';
import { CreateUserDto } from '@/dtos/CreateUserDto';
import { UserCredentialsDto } from '@/dtos/userCredentials.dto';
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
    getUserById(id: string, request: Request & {
        user: any;
    }): Promise<{
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
    createUser(user: CreateUserDto, request: Request & {
        now: string;
    }): Promise<User>;
    singIn(user: UserCredentialsDto): Promise<{
        success: string;
        token: string;
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
