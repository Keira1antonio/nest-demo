import { Repository } from 'typeorm';
import { Order } from './Order.entity';
import { OrderDetail } from '../entitys/OrderDetail.entity';
import { Product } from '../ products/products.entity';
import { User } from '../users/user.entity';
export declare class OrderRepository {
    private readonly orderRepo;
    private readonly orderDetailRepo;
    private readonly productRepo;
    private readonly userRepo;
    constructor(orderRepo: Repository<Order>, orderDetailRepo: Repository<OrderDetail>, productRepo: Repository<Product>, userRepo: Repository<User>);
    addOrder(data: {
        userId: string;
        products: {
            id: string;
        }[];
    }): Promise<Order>;
    getOrder(id: string): Promise<Order>;
    getUserOrders(userId: string): Promise<User>;
}
