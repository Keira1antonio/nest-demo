import { ProductsService } from './products.service';
import { Product } from './products.entity';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getProducts(page?: number, limit?: number): Promise<Product[]>;
    getProductById(id: string): Promise<Product>;
    createProduct(body: any): Promise<Product>;
    updateProduct(id: string, product: Product): Promise<Product>;
    deleteProduct(id: string): Promise<{
        message: string;
    }>;
    preloadProducts(): Promise<Product[]>;
}
