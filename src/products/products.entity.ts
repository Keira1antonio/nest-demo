import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Category } from '../categories/Category.entity';
import { OrderDetail } from '../entitys/OrderDetail.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'The unique identifier of the product',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @Column({ length: 50 })
  @ApiProperty({
    description: 'The name of the product',
    example: 'Laptop',
  })
  name: string;

  @Column('text', { default: 'Producto sin descripción' })
  @ApiProperty({
    description: 'The description of the product',
    example: 'A high-performance laptop with a sleek design.',
  })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @ApiProperty({
    description: 'The price of the product',
    example: 999.99,
  })
  price: number;

  @Column('int', { nullable: false })
  @ApiProperty({
    description: 'The stock quantity of the product',
    example: 50,
  })
  stock: number;

  @Column({ default: 'https://example.com/default-image.jpg' })
  @ApiProperty({
    description: 'The image URL of the product',
    example: 'https://example.com/product-image.jpg',
  })
  imgUrl: string;

  @ManyToOne(() => Category, (category) => category.products)
  @ApiProperty({
    description: 'The category to which the product belongs',
    type: () => Category, // El tipo es un objeto Category
  })
  category: Category;

  @OneToMany(() => OrderDetail, (OrderDetail) => OrderDetail.products, {
    onDelete: 'CASCADE',
  })
  @ApiProperty({
    description: 'The order details associated with the product',
    type: () => OrderDetail, // El tipo es un objeto OrderDetail
    isArray: true, // Se indica que es un array de objetos OrderDetail
  })
  orderDetails: OrderDetail[];
}
