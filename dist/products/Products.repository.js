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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const products_entity_1 = require("./products.entity");
const Category_entity_1 = require("../categories/Category.entity");
let ProductsRepository = class ProductsRepository {
    productRepo;
    categoryRepo;
    constructor(productRepo, categoryRepo) {
        this.productRepo = productRepo;
        this.categoryRepo = categoryRepo;
    }
    async getProducts(page, limit) {
        const skip = (page - 1) * limit;
        return await this.productRepo.find({
            relations: ['category'],
            skip,
            take: limit,
        });
    }
    async getProductsById(id) {
        const product = await this.productRepo.findOne({
            where: { id },
            relations: ['category'],
        });
        if (!product)
            throw new common_1.BadRequestException('Product not found');
        return product;
    }
    async createProduct(product) {
        const existing = await this.productRepo.findOne({
            where: { name: product.name },
        });
        if (existing)
            return existing;
        const category = typeof product.category === 'string'
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
    async updateProduct(id, updated) {
        const product = await this.productRepo.findOne({
            where: { id },
            relations: ['category'],
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
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
    async deleteProduct(id) {
        const product = await this.productRepo.findOne({
            where: { id },
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        await this.productRepo.delete(product.id);
        return { message: 'Product deleted' };
    }
    async addProducts(data) {
        const names = data.map((item) => item.name);
        const existingProducts = await this.productRepo.find({
            where: { name: (0, typeorm_2.In)(names) },
        });
        const existingNames = existingProducts.map((p) => p.name);
        const productsToInsert = [];
        const categories = await this.categoryRepo.find();
        const categoriesMap = new Map(categories.map((cat) => [cat.name, cat]));
        for (const item of data) {
            if (existingNames.includes(item.name))
                continue;
            const category = item.category
                ? categoriesMap.get(typeof item.category === 'string'
                    ? item.category
                    : item.category.name)
                : undefined;
            const newProduct = this.productRepo.create({
                ...item,
                ...(category && { category }),
            });
            productsToInsert.push(newProduct);
        }
        if (!productsToInsert.length)
            return existingProducts;
        const savedProducts = await this.productRepo.save(productsToInsert);
        return [...existingProducts, ...savedProducts];
    }
};
exports.ProductsRepository = ProductsRepository;
exports.ProductsRepository = ProductsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(products_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(Category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductsRepository);
//# sourceMappingURL=Products.repository.js.map