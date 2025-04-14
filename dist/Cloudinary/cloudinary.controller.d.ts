import { CloudinaryService } from './cloudinary.service';
import { ProductsService } from '@/ products/products.service';
export declare class CloudinaryController {
    private readonly cloudinaryService;
    private readonly productsService;
    constructor(cloudinaryService: CloudinaryService, productsService: ProductsService);
    getUserImage(file: Express.Multer.File): Promise<{
        status: string;
        message: string;
        data: import("cloudinary").UploadApiResponse;
    }>;
    uploadProductImage(id: string, file: Express.Multer.File): Promise<{
        status: string;
        message: string;
        data: import("../ products/products.entity").Product;
    }>;
}
