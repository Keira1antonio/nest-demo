import { Repository } from 'typeorm';
import { Product } from './products.entity';
import { Category } from '@/categories/Category.entity';
export declare class ProductsRepository {
    private readonly productRepo;
    private readonly categoryRepo;
    constructor(productRepo: Repository<Product>, categoryRepo: Repository<Category>);
    getProducts(page: number, limit: number): Promise<Product[]>;
    getProductsById(id: string): Promise<Product>;
    createProduct(product: Product): Promise<Product>;
    updateProduct(id: string, updated: Product): Promise<Product>;
    deleteProduct(id: string): Promise<{
        message: string;
    }>;
    addProducts(data: Array<Partial<Product>>): Promise<Product[]>;
}
