import { Injectable } from '@nestjs/common';
import { OrderRepository } from './Order.Repository';
import { Order } from './Order.entity';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async createOrder(data: {
    userId: string;
    products: { id: string }[];
  }): Promise<Order> {
    return await this.orderRepository.addOrder(data);
  }

  async getOrderById(id: string): Promise<Order> {
    return await this.orderRepository.getOrder(id);
  }

  async getUserOrders(userId: string) {
    return await this.orderRepository.getUserOrders(userId);
  }
}
