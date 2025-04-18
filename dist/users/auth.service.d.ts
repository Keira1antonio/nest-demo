import { UsersDbService } from './usersDb.service';
import { CreateUserDto } from '@/dtos/CreateUserDto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersDbService;
    private readonly jwtService;
    constructor(usersDbService: UsersDbService, jwtService: JwtService);
    singUp(userData: CreateUserDto): Promise<Omit<User, 'password' | 'confirmPassword'>>;
    sinIn(email: string, password: string): Promise<{
        success: string;
        token: string;
    }>;
}
