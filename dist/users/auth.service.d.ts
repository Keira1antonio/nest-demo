import { UsersDbService } from './usersDb.service';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersDbService;
    private readonly jwtService;
    constructor(usersDbService: UsersDbService, jwtService: JwtService);
    singUp(user: User): Promise<User>;
    sinIn(email: string, password: string): Promise<{
        success: string;
        token: string;
    }>;
}
