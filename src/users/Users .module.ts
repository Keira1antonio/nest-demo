import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { UsersDbService } from './usersDb.service';
//import { CloudinaryConfig } from '@/config/cloudinary';
//import { CloudinaryService } from '../Cloudinary/cloudinary.service';
// import { LoggerGlobal } from 'src/middleware/Logger';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersDbService, UsersRepository],
  controllers: [UsersController],
  exports: [UsersService, UsersDbService, TypeOrmModule, UsersRepository],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerGlobal).forRoutes('users')
  }
}
