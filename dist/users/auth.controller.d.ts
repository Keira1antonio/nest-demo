import { AuthService } from './auth.service';
import { CreateUserDto } from '@/dtos/CreateUserDto';
import { UserCredentialsDto } from '@/dtos/userCredentials.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(user: CreateUserDto, req: Request & {
        now: string;
    }): Promise<Omit<import("./user.entity").User, "password" | "confirmPassword">>;
    signin(user: UserCredentialsDto): Promise<{
        success: string;
        token: string;
    }>;
}
