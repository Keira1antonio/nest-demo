"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Order_Controller_1 = require("./Order.Controller");
const Order_Service_1 = require("./Order.Service");
const Order_Repository_1 = require("./Order.Repository");
const Order_entity_1 = require("./Order.entity");
const OrderDetail_entity_1 = require("../entitys/OrderDetail.entity");
const products_entity_1 = require("../ products/products.entity");
const user_entity_1 = require("../users/user.entity");
let OrderModule = class OrderModule {
};
exports.OrderModule = OrderModule;
exports.OrderModule = OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Order_entity_1.Order, OrderDetail_entity_1.OrderDetail, products_entity_1.Product, user_entity_1.User])],
        controllers: [Order_Controller_1.OrderController],
        providers: [Order_Service_1.OrderService, Order_Repository_1.OrderRepository],
    })
], OrderModule);
//# sourceMappingURL=order.module.js.map