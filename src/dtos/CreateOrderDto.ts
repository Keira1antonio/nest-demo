import {
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  IsUUID,
} from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  userId: string;
  @IsNotEmpty()
  @ArrayMinSize(1)
  @IsArray()
  products: Array<{ id: string }>;
}
