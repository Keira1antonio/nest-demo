import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from '../orders/Order.entity';
import { Product } from '../products/products.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'order_details' })
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'The unique identifier of the order detail',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty({
    description: 'The price of the product in the order detail',
    example: 19.99,
  })
  price: number;

  @Column()
  quantity: number;
  @ApiProperty({
    description: 'The quantity of the product in the order detail',
    example: 2,
  })
  @ManyToOne(() => Order, (order) => order.orderDetail, { onDelete: 'CASCADE' })
  @ApiProperty({
    description: 'The associated order for this order detail',
    type: () => Order, // Esto indica que la propiedad "order" es un objeto de la entidad Order
  })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderDetails, {
    onDelete: 'CASCADE',
  })
  @ApiProperty({
    description: 'The associated product for this order detail',
    type: () => Product, // Esto indica que la propiedad "product" es un objeto de la entidad Product
  })
  products: Product[];
}
