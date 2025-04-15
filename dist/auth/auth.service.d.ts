import { UsersRepository } from '../users/users.repository';
import { LogInUserDto } from '@/dtos/LoginUserDto';
import { CreateUserDto } from '@/dtos/CreateUserDto';
import { UsersDbService } from '@/users/usersDb.service';
import { User } from '@/users/user.entity';
export declare class AuthService {
    private readonly usersRepository;
    private readonly usersDbService;
    constructor(usersRepository: UsersRepository, usersDbService: UsersDbService);
    getAuth(): string;
    signin(loginUserDto: LogInUserDto): Promise<{
        status: number;
        message: string;
    }>;
    singUp(user: CreateUserDto): Promise<User>;
}
