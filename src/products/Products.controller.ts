import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  Query,
  UseGuards,
  BadRequestException,
  NotFoundException,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { Product } from './products.entity'; // Usamos Product desde el entity ya que es lo que parece correcto
import { AuthGuard } from '@/guards/auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Roles } from '@/decorator/roles.decorator';
import { Role } from '@/roles.unum';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    try {
      const pageNumber = Number(page) || 1;
      const limitNumber = Number(limit) || 5;
      return await this.productsService.getProducts(pageNumber, limitNumber);
    } catch (error) {
      throw new BadRequestException('Error getting products');
    }
  }

  @Get(':id')
  async getProductById(@Param('id', ParseUUIDPipe) id: string) {
    const product = await this.productsService.getProductsById(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  @Post()
  async createProduct(@Body() product: Product) {
    try {
      return await this.productsService.createProduct(product);
    } catch (error) {
      throw new BadRequestException('Error creating product');
    }
  }

  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: Product,
  ) {
    const updated = await this.productsService.updateProduct(id, product);
    if (!updated) throw new NotFoundException('Product not found');
    return updated;
  }

  @Delete(':id')
  async deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    const deleted = await this.productsService.deleteProduct(id);
    if (!deleted) throw new NotFoundException('Product not found');
    return deleted;
  }

  @Get('seeder')
  async preloadProducts() {
    try {
      return await this.productsService.preloadProducts();
    } catch (error) {
      throw new BadRequestException('Error preloading products');
    }
  }
}
