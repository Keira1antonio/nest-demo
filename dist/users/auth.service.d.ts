import { CreateUserDto } from '@/dtos/CreateUserDto';
import { UsersDbService } from './usersDb.service';
export declare class AuthService {
    private readonly usersDbService;
    constructor(usersDbService: UsersDbService);
    singUp(user: CreateUserDto): Promise<void>;
}
