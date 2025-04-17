import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersDbService } from './usersDb.service';
import { UsersRepository } from './users.repository';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
@Module({
  imports: [TypeOrmModule.forFeature([User])], // Reemplaza SomeModule con el módulo correcto
  providers: [UsersService, UsersDbService, AuthService, UsersRepository],
  controllers: [UsersController, AuthController],
  exports: [UsersService, UsersDbService, TypeOrmModule, UsersRepository],
})
export class UsersModule {}
