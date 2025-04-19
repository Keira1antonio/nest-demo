import { Category } from '../categories/Category.entity';
import { OrderDetail } from '../entitys/OrderDetail.entity';
export declare class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imgUrl: string;
    category: Category;
    orderDetails: OrderDetail[];
}
