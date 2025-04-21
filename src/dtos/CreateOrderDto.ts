import {
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  @ApiProperty({
    description: 'ID del producto',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  userId: string;
  @IsNotEmpty()
  @ArrayMinSize(1)
  @IsArray()
  @ApiProperty({
    description: 'Lista de IDs de productos en el pedido',
  })
  products: Array<{ id: string }>;
}
