import { OrderService } from './Order.Service';
import { Order } from './Order.entity';
import { User } from '../users/user.entity';
import { CreateOrderDto } from '@/dtos/CreateOrderDto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(data: CreateOrderDto): Promise<Order>;
    getOrderById(id: string): Promise<Order>;
    getUserOrders(userId: string): Promise<User>;
}
