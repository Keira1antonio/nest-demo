import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductsRepository } from './Products.repository';
import { Product } from './products.entity';
import { preload } from '@/data/ArchivoActividad3';
import { isUUID } from 'class-validator';
import { CloudinaryService } from '@/Cloudinary/cloudinary.service';

@Injectable()
export class ProductsService {
  constructor(
    private productsRepository: ProductsRepository,
    private cloudinaryService: CloudinaryService,
  ) {}

  getProducts(pageNumber: number, limitNumber: number) {
    return this.productsRepository.getProducts(pageNumber, limitNumber);
  }

  async getProductsById(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return await this.productsRepository.getProductsById(id);
  }

  async createProduct(product: Product): Promise<Product> {
    return this.productsRepository.createProduct(product);
  }

  async updateProduct(id: string, product: Product): Promise<Product> {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');
    return this.productsRepository.updateProduct(id, product);
  }

  async updateProductImage(id: string, secure_url: string): Promise<Product> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const product = await this.productsRepository.getProductsById(id);
    if (!product) {
      throw new BadRequestException('Product not found');
    }

    product.imgUrl = secure_url; // Asume que la entidad Product tiene una propiedad `imageUrl`
    return this.productsRepository.updateProduct(id, product);
  }

  async preloadProducts(): Promise<Product[]> {
    const productsFromFile: Partial<Product>[] = preload.map((item) => ({
      name: item.name,
      price: item.price,
      stock: item.stock,
      description: item.description,

      categoryName: item.category,
    }));
    return await this.productsRepository.addProducts(productsFromFile);
  }

  async deleteProduct(id: string): Promise<{ message: string }> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const product = await this.productsRepository.getProductsById(id);
    if (!product) {
      throw new BadRequestException('Product not found');
    }

    return await this.productsRepository.deleteProduct(id);
  }
}
