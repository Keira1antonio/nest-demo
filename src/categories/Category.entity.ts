import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Product } from '../products/products.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'The unique identifier of the category',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @Column({ length: 50 })
  @ApiProperty({
    description: 'The name of the category',
    example: 'Electronics',
  })
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  @ApiProperty({
    description: 'List of products associated with the category',
    type: () => [Product], // Esto indica que "products" es una lista de objetos Product
  })
  products: Product[];
}
