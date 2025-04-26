import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
//import { Order } from 'src/orders/Order.entity';
import { Order } from '../orders/Order.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @Column({ length: 50, unique: true })
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  email: string;

  @Column({ length: 50 })
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  name: string;

  @Column({ length: 60, nullable: false })
  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  password: string;

  @Column('text')
  @ApiProperty({
    description: 'The address of the user',
    example: '123 Main St, City, Country',
  })
  address: string;

  @Column('bigint')
  @ApiProperty({
    description: 'The phone number of the user',
    example: '1234567890',
  })
  phone: number;

  @Column({ length: 50 })
  @ApiProperty({
    description: 'The country of the user',
    example: 'USA',
  })
  country: string;

  @Column({ length: 50 })
  @ApiProperty({
    description: 'The city of the user',
    example: 'New York',
  })
  city: string;

  @Column({ default: false })
  @ApiProperty({
    description: 'Indicates whether the user is an admin',
    example: false,
  })
  isAdmin: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: 'The creation date of the user account',
    example: '2025-01-01T00:00:00Z',
  })
  createdAt: Date;

  @OneToMany(() => Order, (order) => order.user)
  @ApiProperty({
    description: 'The orders associated with the user',
    type: () => Order,
    isArray: true,
  })
  orders: Order[];
  length: number;
  @ApiProperty({
    description: 'The confirmation password of the user (not stored in DB)',
    example: 'password123',
    required: false,
  })
  confirmPassword: string;
}
