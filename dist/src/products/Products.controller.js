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
exports.ProductsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const common_2 = require("@nestjs/common");
const products_entity_1 = require("./products.entity");
const auth_guard_1 = require("../guards/auth.guard");
const roles_guard_1 = require("../guards/roles.guard");
const roles_decorator_1 = require("../decorator/roles.decorator");
const roles_unum_1 = require("../roles.unum");
const swagger_1 = require("@nestjs/swagger");
let ProductsController = class ProductsController {
    productsService;
    constructor(productsService) {
        this.productsService = productsService;
    }
    async getProducts(page, limit) {
        try {
            const pageNumber = Number(page) || 1;
            const limitNumber = Number(limit) || 5;
            return await this.productsService.getProducts(pageNumber, limitNumber);
        }
        catch (error) {
            throw new common_1.BadRequestException('Error getting products');
        }
    }
    async getProductById(id) {
        const product = await this.productsService.getProductsById(id);
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return product;
    }
    async createProduct(product) {
        try {
            return await this.productsService.createProduct(product);
        }
        catch (error) {
            throw new common_1.BadRequestException('Error creating product');
        }
    }
    async updateProduct(id, product) {
        const updated = await this.productsService.updateProduct(id, product);
        if (!updated)
            throw new common_1.NotFoundException('Product not found');
        return updated;
    }
    async deleteProduct(id) {
        const deleted = await this.productsService.deleteProduct(id);
        if (!deleted)
            throw new common_1.NotFoundException('Product not found');
        return deleted;
    }
    async preloadProducts() {
        try {
            return await this.productsService.preloadProducts();
        }
        catch (error) {
            throw new common_1.BadRequestException('Error preloading products');
        }
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(200),
    openapi.ApiResponse({ status: 200, type: [require("./products.entity").Product] }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(200),
    openapi.ApiResponse({ status: 200, type: require("./products.entity").Product }),
    __param(0, (0, common_1.Param)('id', common_2.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProductById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(201),
    openapi.ApiResponse({ status: 201, type: require("./products.entity").Product }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [products_entity_1.Product]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(200),
    (0, roles_decorator_1.Roles)(roles_unum_1.Role.Admin),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    openapi.ApiResponse({ status: 200, type: require("./products.entity").Product }),
    __param(0, (0, common_1.Param)('id', common_2.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, products_entity_1.Product]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(200),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', common_2.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.Get)('seeder'),
    (0, common_1.HttpCode)(200),
    openapi.ApiResponse({ status: 200, type: [require("./products.entity").Product] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "preloadProducts", null);
exports.ProductsController = ProductsController = __decorate([
    (0, swagger_1.ApiTags)('Products'),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=Products.controller.js.map