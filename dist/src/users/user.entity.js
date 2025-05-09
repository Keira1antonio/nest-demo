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
exports.User = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const Order_entity_1 = require("../orders/Order.entity");
const swagger_1 = require("@nestjs/swagger");
let User = class User {
    id;
    email;
    name;
    password;
    address;
    phone;
    country;
    city;
    isAdmin;
    createdAt;
    orders;
    length;
    confirmPassword;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, email: { required: true, type: () => String }, name: { required: true, type: () => String }, password: { required: true, type: () => String }, address: { required: true, type: () => String }, phone: { required: true, type: () => Number }, country: { required: true, type: () => String }, city: { required: true, type: () => String }, isAdmin: { required: true, type: () => Boolean }, createdAt: { required: true, type: () => Date }, orders: { required: true, type: () => [require("../orders/Order.entity").Order] }, length: { required: true, type: () => Number }, confirmPassword: { required: true, type: () => String } };
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({
        description: 'The unique identifier of the user',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, unique: true }),
    (0, swagger_1.ApiProperty)({
        description: 'The email of the user',
        example: 'user@example.com',
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    (0, swagger_1.ApiProperty)({
        description: 'The name of the user',
        example: 'John Doe',
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 60, nullable: false }),
    (0, swagger_1.ApiProperty)({
        description: 'The password of the user',
        example: 'password123',
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    (0, swagger_1.ApiProperty)({
        description: 'The address of the user',
        example: '123 Main St, City, Country',
    }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint'),
    (0, swagger_1.ApiProperty)({
        description: 'The phone number of the user',
        example: '1234567890',
    }),
    __metadata("design:type", Number)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    (0, swagger_1.ApiProperty)({
        description: 'The country of the user',
        example: 'USA',
    }),
    __metadata("design:type", String)
], User.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    (0, swagger_1.ApiProperty)({
        description: 'The city of the user',
        example: 'New York',
    }),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, swagger_1.ApiProperty)({
        description: 'Indicates whether the user is an admin',
        example: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isAdmin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    (0, swagger_1.ApiProperty)({
        description: 'The creation date of the user account',
        example: '2025-01-01T00:00:00Z',
    }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Order_entity_1.Order, (order) => order.user),
    (0, swagger_1.ApiProperty)({
        description: 'The orders associated with the user',
        type: () => Order_entity_1.Order,
        isArray: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "orders", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The confirmation password of the user (not stored in DB)',
        example: 'password123',
        required: false,
    }),
    __metadata("design:type", String)
], User.prototype, "confirmPassword", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' })
], User);
//# sourceMappingURL=user.entity.js.map