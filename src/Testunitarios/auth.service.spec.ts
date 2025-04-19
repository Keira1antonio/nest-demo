import { Test } from '@nestjs/testing';
import { AuthService } from '../users/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersDbService } from '../users/usersDb.service';
import { CreateUserDto } from '@/dtos/CreateUserDto';
import { User } from '../users/user.entity';

describe('AuthService', () => {
  let authService: AuthService;

  const mockUser: Partial<User> = {
    name: 'Van Rossen',
    country: 'Netherlands',
    city: 'Amsterdam',
    email: 'Van@Rossen.com',
    isAdmin: false,
    password: 'password',
    confirmPassword: 'password',
    orders: [],
    id: '123fs-234sd-24sdf-34sdf',
    length: 0,
  };

  beforeEach(async () => {
    const mockUsersService: Partial<UsersDbService> = {
      getUserByEmail: (email: string) => Promise.resolve(null),
      createAndSaveUser: (user: Omit<CreateUserDto, 'confirmPassword'>) =>
        Promise.resolve({
          ...user,
          password: 'hashedPassword',
          confirmPassword: 'hashedPassword',
          orders: [],
          isAdmin: false,
          id: '123fs-234sd-24sdf-34sdf',
          length: 0,
        } as unknown as User),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: UsersDbService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('Create an instance', async () => {
    expect(authService).toBeDefined();
  });

  it('should create a user', async () => {
    const user = await authService.singUp(mockUser as any);
    expect(user).toBeDefined();
    expect(user.email).toBe(mockUser.email);
    expect(user.name).toBe(mockUser.name);
    expect(user.country).toBe(mockUser.country);
  });
});
