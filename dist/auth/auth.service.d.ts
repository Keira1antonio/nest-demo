import { UsersRepository } from '../users/users.repository';
import { LogInUserDto } from '@/dtos/LoginUserDto';
export declare class AuthService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    getAuth(): string;
    signin(loginUserDto: LogInUserDto): Promise<{
        status: number;
        message: string;
    }>;
}
