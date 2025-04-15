import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './Products.controller';
import { ProductsRepository } from './Products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Category } from '@/categories/Category.entity';
import { CloudinaryModule } from '@/Cloudinary/Cloudinary.module';
@Module({
  imports: [TypeOrmModule.forFeature([Product, Category]), CloudinaryModule],
  providers: [ProductsService, ProductsRepository],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
