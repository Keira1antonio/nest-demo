import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from './products.entity';
import { Category } from '@/categories/Category.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>, // <-- ESTA ES LA QUE FALTABA
  ) {}

  async getProducts(page: number, limit: number): Promise<Product[]> {
    const skip = (page - 1) * limit;
    return await this.productRepo.find({
      relations: ['category'],
      skip,
      take: limit,
    });
  }

  async getProductsById(id: string): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!product) throw new BadRequestException('Product not found');
    return product;
  }

  async createProduct(product: Product): Promise<Product> {
    const existing = await this.productRepo.findOne({
      where: { name: product.name },
    });
    // if (existing) return existing;

    const category =
      typeof product.category === 'string'
        ? await this.categoryRepo.findOne({ where: { name: product.category } })
        : await this.categoryRepo.findOne({
            where: { name: product.category?.name },
          });

    const newProduct = this.productRepo.create({
      ...product,
      ...(category ? { category } : {}),
    });
    return await this.productRepo.save(newProduct);
  }

  // Versión CORRECTA para actualizar:
  async updateProduct(id: string, updated: Product): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!product) throw new NotFoundException('Product not found');

    const mergedProduct = this.productRepo.merge(product, {
      name: updated.name,
      description: updated.description,
      price: updated.price,
      stock: updated.stock,
      imgUrl: updated.imgUrl,
      category: updated.category,
    });

    return await this.productRepo.save(mergedProduct);
  }

  async deleteProduct(id: string): Promise<{ message: string }> {
    const product = await this.productRepo.findOne({
      where: { id },
    });
    if (!product) throw new NotFoundException('Product not found');

    await this.productRepo.delete(product.id);
    return { message: 'Product deleted' };
  }

  async addProducts(data: Array<Partial<Product>>): Promise<Product[]> {
    const names = data.map((item) => item.name!);

    const existingProducts = await this.productRepo.find({
      where: { name: In(names) },
    });

    const existingNames = existingProducts.map((p) => p.name);

    const productsToInsert: Product[] = [];

    // Traemos todas las categorías de una sola consulta
    const categories = await this.categoryRepo.find();
    const categoriesMap = new Map(categories.map((cat) => [cat.name, cat]));

    for (const item of data) {
      if (existingNames.includes(item.name!)) continue;

      const category = item.category
        ? categoriesMap.get(
            typeof item.category === 'string'
              ? item.category
              : item.category.name,
          )
        : undefined;

      const newProduct = this.productRepo.create({
        ...item,
        ...(category && { category }),
      });

      productsToInsert.push(newProduct);
    }

    if (!productsToInsert.length) return existingProducts;

    const savedProducts = await this.productRepo.save(productsToInsert);

    return [...existingProducts, ...savedProducts];
  }
}
