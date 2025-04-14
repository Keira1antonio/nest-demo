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
@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column('text', { default: 'Producto sin descripción' })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('int', { nullable: false })
  stock: number;

  @Column({ default: 'https://example.com/default-image.jpg' })
  imgUrl: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => OrderDetail, (OrderDetail) => OrderDetail.products, {
    onDelete: 'CASCADE',
  })
  orderDetails: OrderDetail[];
}
