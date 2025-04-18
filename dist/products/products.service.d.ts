import { ProductsRepository } from './Products.repository';
import { Product } from './products.entity';
import { CloudinaryService } from '@/Cloudinary/cloudinary.service';
export declare class ProductsService {
    private productsRepository;
    private cloudinaryService;
    constructor(productsRepository: ProductsRepository, cloudinaryService: CloudinaryService);
    getProducts(pageNumber: number, limitNumber: number): Promise<Product[]>;
    getProductsById(id: string): Promise<Product>;
    createProduct(product: Product): Promise<Product>;
    updateProduct(id: string, product: Product): Promise<Product>;
    updateProductImage(id: string, secure_url: string): Promise<Product>;
    preloadProducts(): Promise<Product[]>;
    deleteProduct(id: string): Promise<{
        message: string;
    }>;
}
