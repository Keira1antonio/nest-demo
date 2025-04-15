import { AuthService } from './auth.service';
import { CreateUserDto } from '@/dtos/CreateUserDto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getAuth(): Promise<string>;
    signUp(signUpDto: CreateUserDto & {
        confirmPassword: string;
    }): Promise<{
        id: string;
        email: string;
        name: string;
        address: string;
        phone: number;
        country: string;
        city: string;
        orders: import("../orders/Order.entity").Order[];
        length: number;
    }>;
}
