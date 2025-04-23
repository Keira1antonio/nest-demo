import {
  Controller,
  UseGuards,
  Post,
  Get,
  Param,
  Body,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { OrderService } from './Order.Service';
import { Order } from './Order.entity';
import { User } from '../users/user.entity';
import { CreateOrderDto } from '@/dtos/CreateOrderDto';
import { ParseUUIDPipe } from '@nestjs/common';
import { AuthGuard } from '@/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Crear orden
  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  async createOrder(@Body() data: CreateOrderDto) {
    try {
      return await this.orderService.createOrder(data);
    } catch (error) {
      throw new BadRequestException('Error creatin order');
    }
  }

  // Obtener orden por id
  @Get(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async getOrderById(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
    const order = await this.orderService.getOrderById(id);
    if (!order) throw new BadRequestException('Order not found');
    return order;
  }

  @Get('user/:userId')
  @HttpCode(200)
  async getUserOrders(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<User> {
    const orders = await this.orderService.getUserOrders(userId);
    if (!orders || orders.length === 0)
      throw new BadRequestException('Orders not found');
    return orders;
  }
}
