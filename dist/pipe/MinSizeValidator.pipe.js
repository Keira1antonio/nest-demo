"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinSizeValidator = void 0;
const common_1 = require("@nestjs/common");
let MinSizeValidator = class MinSizeValidator {
    transform(value, metadata) {
        const maxSize = 200 * 1024;
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!value) {
            throw new common_1.BadRequestException('No se recibio ningun archivo');
        }
        if (value.size > maxSize) {
            throw new common_1.BadRequestException(`El archivo de la imagen no debe ser mayor a ${maxSize} bytes (200KB)`);
        }
        if (!allowedTypes.includes(value.mimetype)) {
            throw new common_1.BadRequestException(`Tipo de archivo no permitido ${allowedTypes.join(',')}`);
        }
        return value;
    }
};
exports.MinSizeValidator = MinSizeValidator;
exports.MinSizeValidator = MinSizeValidator = __decorate([
    (0, common_1.Injectable)()
], MinSizeValidator);
//# sourceMappingURL=MinSizeValidator.pipe.js.map