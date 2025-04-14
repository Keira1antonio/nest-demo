"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const Products_repository_1 = require("./Products.repository");
const ArchivoActividad3_1 = require("../data/ArchivoActividad3");
const class_validator_1 = require("class-validator");
const cloudinary_service_1 = require("../Cloudinary/cloudinary.service");
let ProductsService = class ProductsService {
    productsRepository;
    cloudinaryService;
    constructor(productsRepository, cloudinaryService) {
        this.productsRepository = productsRepository;
        this.cloudinaryService = cloudinaryService;
    }
    getProducts(pageNumber, limitNumber) {
        return this.productsRepository.getProducts(pageNumber, limitNumber);
    }
    async getProductsById(id) {
        if (!(0, class_validator_1.isUUID)(id)) {
            throw new common_1.BadRequestException('Invalid UUID');
        }
        return await this.productsRepository.getProductsById(id);
    }
    async createProduct(product) {
        return this.productsRepository.createProduct(product);
    }
    async updateProduct(id, product) {
        if (!(0, class_validator_1.isUUID)(id))
            throw new common_1.BadRequestException('Invalid UUID');
        return this.productsRepository.updateProduct(id, product);
    }
    async updateProductImage(id, secure_url) {
        if (!(0, class_validator_1.isUUID)(id)) {
            throw new common_1.BadRequestException('Invalid UUID');
        }
        const product = await this.productsRepository.getProductsById(id);
        if (!product) {
            throw new common_1.BadRequestException('Product not found');
        }
        product.imgUrl = secure_url;
        return this.productsRepository.updateProduct(id, product);
    }
    async preloadProducts() {
        const productsFromFile = ArchivoActividad3_1.preload.map((item) => ({
            name: item.name,
            price: item.price,
            stock: item.stock,
            description: item.description,
            categoryName: item.category,
        }));
        return await this.productsRepository.addProducts(productsFromFile);
    }
    async deleteProduct(id) {
        if (!(0, class_validator_1.isUUID)(id)) {
            throw new common_1.BadRequestException('Invalid UUID');
        }
        const product = await this.productsRepository.getProductsById(id);
        if (!product) {
            throw new common_1.BadRequestException('Product not found');
        }
        return await this.productsRepository.deleteProduct(id);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Products_repository_1.ProductsRepository,
        cloudinary_service_1.CloudinaryService])
], ProductsService);
//# sourceMappingURL=products.service.js.map