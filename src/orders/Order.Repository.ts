import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, MoreThan, FindOptionsWhere } from 'typeorm';

import { Order } from './Order.entity';
import { OrderDetail } from '../entitys/OrderDetail.entity';
import { Product } from '../ products/products.entity';
import { User } from '../users/user.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(OrderDetail)
    private readonly orderDetailRepo: Repository<OrderDetail>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async addOrder(data: {
    userId: string;
    products: { id: string }[];
  }): Promise<Order> {
    const user = await this.userRepo.findOne({ where: { id: data.userId } });

    if (!user) throw new NotFoundException('User not found');

    const productIds = data.products.map((p) => p.id);

    const products = await this.productRepo.find({
      where: {
        id: In(productIds),
        stock: MoreThan(0),
      },
    });

    if (products.length !== productIds.length) {
      throw new BadRequestException('Some products not found or without stock');
    }

    // Calcular total price
    const totalPrice = products.reduce((sum, p) => sum + Number(p.price), 0);

    // Restar stock
    for (const product of products) {
      product.stock -= 1;
      await this.productRepo.save(product);
    }

    // Crear detalle
    const orderDetail = this.orderDetailRepo.create({
      price: totalPrice,
      quantity: products.length,
      products: products,
    });
    await this.orderDetailRepo.save(orderDetail);

    // Crear order
    const order = this.orderRepo.create({
      user: { id: user.id },

      orderDetail,
    });
    await this.orderRepo.save(order);

    return order;
  }

  async getOrder(id: string): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['user', 'orderDetail', 'orderDetail.products'],
    });

    if (!order) throw new NotFoundException('Order not found');

    return order;
  }

  async getUserOrders(userId: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['orders'], // Traemos las órdenes relacionadas con el usuario
    });

    if (!user) throw new NotFoundException('User not found');

    const orders = user.orders.map((order) => {
      const partialOrder = new Order();
      partialOrder.id = order.id;
      partialOrder.date = order.date;
      partialOrder.user = order.user;
      partialOrder.orderDetail = order.orderDetail;

      return partialOrder;
    });

    return {
      ...user,
      orders: orders,
    };
  }
}
