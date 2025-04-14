"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const Users__module_1 = require("./users/Users .module");
const Products_module_1 = require("./ products/Products.module");
const category_module_1 = require("./categories/category.module");
const Auth_module_1 = require("./auth/Auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const order_module_1 = require("./orders/order.module");
const Cloudinary_module_1 = require("./Cloudinary/Cloudinary.module");
const typeorm_2 = require("./config/typeorm");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, load: [typeorm_2.default] }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (ConfigService) => {
                    const typeOrmConfig = ConfigService.get('typeorm');
                    return typeOrmConfig || {};
                },
            }),
            Users__module_1.UsersModule,
            Products_module_1.ProductsModule,
            Auth_module_1.AuthModule,
            category_module_1.CategoryModule,
            order_module_1.OrderModule,
            Cloudinary_module_1.CloudinaryModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map