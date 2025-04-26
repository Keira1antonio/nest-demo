import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { OrderDetail } from '../entitys/OrderDetail.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'The unique identifier of the order',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: 'The date and time when the order was created',
    example: '2025-04-25T15:30:00Z',
  })
  date: Date;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  @ApiProperty({
    description: 'The user who created the order',
    type: () => User, // El tipo es un objeto User
  })
  user: User;

  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
  @JoinColumn()
  @ApiProperty({
    description: 'The order details associated with the order',
    type: () => OrderDetail, // El tipo es un objeto OrderDetail
  })
  orderDetail: OrderDetail;
}
