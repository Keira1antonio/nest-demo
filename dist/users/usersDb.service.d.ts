import { User } from './user.entity';
import { Repository } from 'typeorm';
export declare class UsersDbService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    saveUser(user: User): Promise<User>;
}
