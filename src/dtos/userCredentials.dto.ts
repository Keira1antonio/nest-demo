import { CreateUserDto } from './CreateUserDto';
import { PickType } from '@nestjs/swagger';

export class UserCredentialsDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
