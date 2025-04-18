import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
//import { Order } from 'src/orders/Order.entity';
import { Order } from '../orders/Order.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 60, nullable: false })
  password: string;

  @Column('text')
  address: string;

  @Column('bigint')
  phone: number;

  @Column({ length: 50 })
  country: string;

  @Column({ length: 50 })
  city: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
  length: number;
  confirmPassword: string;
}
