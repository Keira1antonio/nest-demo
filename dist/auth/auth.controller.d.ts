import { AuthService } from './auth.service';
import { LogInUserDto } from '@/dtos/LoginUserDto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getAuth(): Promise<string>;
    signin(loginUserDto: LogInUserDto): Promise<{
        status: number;
        message: string;
    }>;
}
