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
exports.OrderDetail = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const Order_entity_1 = require("../orders/Order.entity");
const products_entity_1 = require("../products/products.entity");
const swagger_1 = require("@nestjs/swagger");
let OrderDetail = class OrderDetail {
    id;
    price;
    quantity;
    order;
    products;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, price: { required: true, type: () => Number }, quantity: { required: true, type: () => Number }, order: { required: true, type: () => require("../orders/Order.entity").Order }, products: { required: true, type: () => [require("../products/products.entity").Product] } };
    }
};
exports.OrderDetail = OrderDetail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({
        description: 'The unique identifier of the order detail',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    __metadata("design:type", String)
], OrderDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    (0, swagger_1.ApiProperty)({
        description: 'The price of the product in the order detail',
        example: 19.99,
    }),
    __metadata("design:type", Number)
], OrderDetail.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderDetail.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The quantity of the product in the order detail',
        example: 2,
    }),
    (0, typeorm_1.ManyToOne)(() => Order_entity_1.Order, (order) => order.orderDetail, { onDelete: 'CASCADE' }),
    (0, swagger_1.ApiProperty)({
        description: 'The associated order for this order detail',
        type: () => Order_entity_1.Order,
    }),
    __metadata("design:type", Order_entity_1.Order)
], OrderDetail.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => products_entity_1.Product, (product) => product.orderDetails, {
        onDelete: 'CASCADE',
    }),
    (0, swagger_1.ApiProperty)({
        description: 'The associated product for this order detail',
        type: () => products_entity_1.Product,
    }),
    __metadata("design:type", Array)
], OrderDetail.prototype, "products", void 0);
exports.OrderDetail = OrderDetail = __decorate([
    (0, typeorm_1.Entity)({ name: 'order_details' })
], OrderDetail);
//# sourceMappingURL=OrderDetail.entity.js.map