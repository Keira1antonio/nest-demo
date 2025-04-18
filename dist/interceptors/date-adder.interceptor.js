"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateAdderInterceptor = void 0;
const common_1 = require("@nestjs/common");
let DateAdderInterceptor = class DateAdderInterceptor {
    intercept(context, next) {
        const now = new Date();
        console.log(now);
        const format = now.toLocaleDateString('es-AR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
        const request = context.switchToHttp().getRequest();
        request.now = format;
        return next.handle();
    }
};
exports.DateAdderInterceptor = DateAdderInterceptor;
exports.DateAdderInterceptor = DateAdderInterceptor = __decorate([
    (0, common_1.Injectable)()
], DateAdderInterceptor);
//# sourceMappingURL=date-adder.interceptor.js.map