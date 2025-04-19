import { OrderRepository } from './Order.Repository';
import { Order } from './Order.entity';
export declare class OrderService {
    private readonly orderRepository;
    constructor(orderRepository: OrderRepository);
    createOrder(data: {
        userId: string;
        products: {
            id: string;
        }[];
    }): Promise<Order>;
    getOrderById(id: string): Promise<Order>;
    getUserOrders(userId: string): Promise<import("../users/user.entity").User>;
}
