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
exports.Product = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const Category_entity_1 = require("../categories/Category.entity");
const OrderDetail_entity_1 = require("../entitys/OrderDetail.entity");
const swagger_1 = require("@nestjs/swagger");
let Product = class Product {
    id;
    name;
    description;
    price;
    stock;
    imgUrl;
    category;
    orderDetails;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, price: { required: true, type: () => Number }, stock: { required: true, type: () => Number }, imgUrl: { required: true, type: () => String }, category: { required: true, type: () => require("../categories/Category.entity").Category }, orderDetails: { required: true, type: () => [require("../entitys/OrderDetail.entity").OrderDetail] } };
    }
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({
        description: 'The unique identifier of the product',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    (0, swagger_1.ApiProperty)({
        description: 'The name of the product',
        example: 'Laptop',
    }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { default: 'Producto sin descripción' }),
    (0, swagger_1.ApiProperty)({
        description: 'The description of the product',
        example: 'A high-performance laptop with a sleek design.',
    }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    (0, swagger_1.ApiProperty)({
        description: 'The price of the product',
        example: 999.99,
    }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: false }),
    (0, swagger_1.ApiProperty)({
        description: 'The stock quantity of the product',
        example: 50,
    }),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'https://example.com/default-image.jpg' }),
    (0, swagger_1.ApiProperty)({
        description: 'The image URL of the product',
        example: 'https://example.com/product-image.jpg',
    }),
    __metadata("design:type", String)
], Product.prototype, "imgUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category_entity_1.Category, (category) => category.products),
    (0, swagger_1.ApiProperty)({
        description: 'The category to which the product belongs',
        type: () => Category_entity_1.Category,
    }),
    __metadata("design:type", Category_entity_1.Category)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => OrderDetail_entity_1.OrderDetail, (OrderDetail) => OrderDetail.products, {
        onDelete: 'CASCADE',
    }),
    (0, swagger_1.ApiProperty)({
        description: 'The order details associated with the product',
        type: () => OrderDetail_entity_1.OrderDetail,
        isArray: true,
    }),
    __metadata("design:type", Array)
], Product.prototype, "orderDetails", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)({ name: 'products' })
], Product);
//# sourceMappingURL=products.entity.js.map