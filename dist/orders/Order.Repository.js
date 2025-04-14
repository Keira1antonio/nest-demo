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
exports.OrderRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Order_entity_1 = require("./Order.entity");
const OrderDetail_entity_1 = require("../entitys/OrderDetail.entity");
const products_entity_1 = require("../ products/products.entity");
const user_entity_1 = require("../users/user.entity");
let OrderRepository = class OrderRepository {
    orderRepo;
    orderDetailRepo;
    productRepo;
    userRepo;
    constructor(orderRepo, orderDetailRepo, productRepo, userRepo) {
        this.orderRepo = orderRepo;
        this.orderDetailRepo = orderDetailRepo;
        this.productRepo = productRepo;
        this.userRepo = userRepo;
    }
    async addOrder(data) {
        const user = await this.userRepo.findOne({ where: { id: data.userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const productIds = data.products.map((p) => p.id);
        const products = await this.productRepo.find({
            where: {
                id: (0, typeorm_2.In)(productIds),
                stock: (0, typeorm_2.MoreThan)(0),
            },
        });
        if (products.length !== productIds.length) {
            throw new common_1.BadRequestException('Some products not found or without stock');
        }
        const totalPrice = products.reduce((sum, p) => sum + Number(p.price), 0);
        for (const product of products) {
            product.stock -= 1;
            await this.productRepo.save(product);
        }
        const orderDetail = this.orderDetailRepo.create({
            price: totalPrice,
            quantity: products.length,
            products: products,
        });
        await this.orderDetailRepo.save(orderDetail);
        const order = this.orderRepo.create({
            user: { id: user.id },
            orderDetail,
        });
        await this.orderRepo.save(order);
        return order;
    }
    async getOrder(id) {
        const order = await this.orderRepo.findOne({
            where: { id },
            relations: ['user', 'orderDetail', 'orderDetail.products'],
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
    async getUserOrders(userId) {
        const user = await this.userRepo.findOne({
            where: { id: userId },
            relations: ['orders'],
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const orders = user.orders.map((order) => {
            const partialOrder = new Order_entity_1.Order();
            partialOrder.id = order.id;
            partialOrder.date = order.date;
            partialOrder.user = order.user;
            partialOrder.orderDetail = order.orderDetail;
            return partialOrder;
        });
        return {
            ...user,
            orders: orders,
        };
    }
};
exports.OrderRepository = OrderRepository;
exports.OrderRepository = OrderRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(OrderDetail_entity_1.OrderDetail)),
    __param(2, (0, typeorm_1.InjectRepository)(products_entity_1.Product)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrderRepository);
//# sourceMappingURL=Order.Repository.js.map