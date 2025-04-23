import { Module } from '@nestjs/common';
import { UsersModule } from './users/Users.module';
import { ProductsModule } from './products/Products.module';
import { CategoryModule } from './categories/category.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrderModule } from './orders/order.module';
import { CloudinaryModule } from './Cloudinary/Cloudinary.module';
import typeOrmConfig from './config/typeorm';
import { JwtModule } from '@nestjs/jwt';

//console.log('Crypto test:', crypto.randomUUID());

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
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET || 'secret',
    }),

    UsersModule,
    ProductsModule,

    CategoryModule,
    OrderModule,
    CloudinaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
