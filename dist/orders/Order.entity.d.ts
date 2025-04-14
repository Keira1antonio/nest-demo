import { User } from '../users/user.entity';
import { OrderDetail } from '../entitys/OrderDetail.entity';
export declare class Order {
    id: string;
    date: Date;
    user: User;
    orderDetail: OrderDetail;
}
