import { Order } from '../orders/Order.entity';
import { Product } from '../products/products.entity';
export declare class OrderDetail {
    id: string;
    price: number;
    quantity: number;
    order: Order;
    products: Product[];
}
