import { Module } from '@nestjs/common';
import { UsersModule } from './users/Users.module';
import { ProductsModule } from './products/Products.module';
import { CategoryModule } from './categories/category.module';
import { AuthModule } from './auth/Auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrderModule } from './orders/order.module';
import { CloudinaryModule } from './Cloudinary/Cloudinary.module';

import typeOrmConfig from './config/typeorm';
//import { APP_GUARD } from '@nestjs/core';
//import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [typeOrmConfig] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => {
        const typeOrmConfig = ConfigService.get('typeorm');
        return typeOrmConfig || {};
      },
    }),

    UsersModule,
    ProductsModule,
    AuthModule,
    CategoryModule,
    OrderModule,
    CloudinaryModule,
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class AppModule {}
