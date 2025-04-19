import { Order } from '../orders/Order.entity';
export declare class User {
    id: string;
    email: string;
    name: string;
    password: string;
    address: string;
    phone: number;
    country: string;
    city: string;
    isAdmin: boolean;
    createdAt: Date;
    orders: Order[];
    length: number;
    confirmPassword: string;
}
