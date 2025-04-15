import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/Users.module';
import { UsersDbService } from '@/users/usersDb.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
@Module({
  imports: [forwardRef(() => UsersModule)],
  controllers: [AuthController],
  providers: [AuthService, UsersDbService],
  exports: [AuthService],
})
export class AuthModule {}
