import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './Order.Controller';
import { OrderService } from './Order.Service';
import { OrderRepository } from './Order.Repository';

import { Order } from './Order.entity';
import { OrderDetail } from '../entitys/OrderDetail.entity';
import { Product } from '@/products/products.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail, Product, User])],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
