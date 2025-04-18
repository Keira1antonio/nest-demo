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
exports.CloudinaryController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const cloudinary_service_1 = require("./cloudinary.service");
const products_service_1 = require("../products/products.service");
const multer_1 = require("multer");
const MinSizeValidator_pipe_1 = require("../pipe/MinSizeValidator.pipe");
const auth_guard_1 = require("../guards/auth.guard");
let CloudinaryController = class CloudinaryController {
    cloudinaryService;
    productsService;
    constructor(cloudinaryService, productsService) {
        this.cloudinaryService = cloudinaryService;
        this.productsService = productsService;
    }
    async getUserImage(file) {
        try {
            if (!file) {
                throw new common_1.BadRequestException('No se proporcionó ningún archivo');
            }
            const result = await this.cloudinaryService.uploadFile(file);
            return {
                status: 'success',
                message: 'Archivo subido exitosamente',
                data: result,
            };
        }
        catch (error) {
            console.error('Error al subir el archivo:', error.message);
            throw new common_1.BadRequestException('No se pudo subir el archivo');
        }
    }
    async uploadProductImage(id, file) {
        try {
            if (!file) {
                throw new common_1.BadRequestException('No se proporcionó ningún archivo');
            }
            const uploadedImage = await this.cloudinaryService.uploadFile(file);
            if (!uploadedImage || !uploadedImage.secure_url) {
                throw new common_1.BadRequestException('Error al subir la imagen a Cloudinary');
            }
            const updatedProduct = await this.productsService.updateProductImage(id, uploadedImage.secure_url);
            if (!updatedProduct) {
                throw new common_1.NotFoundException('Producto no encontrado');
            }
            return {
                status: 'success',
                message: 'Imagen actualizada correctamente',
                data: updatedProduct,
            };
            console.log('Archivo recibido:', file);
        }
        catch (error) {
            console.error('Error al actualizar la imagen del producto:', error.message);
            throw new common_1.BadRequestException('No se pudo actualizar la imagen del producto');
        }
    }
};
exports.CloudinaryController = CloudinaryController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', { storage: (0, multer_1.memoryStorage)() })),
    __param(0, (0, common_1.UploadedFile)(MinSizeValidator_pipe_1.MinSizeValidator)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CloudinaryController.prototype, "getUserImage", null);
__decorate([
    (0, common_1.Put)('uploadImage/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: (0, multer_1.memoryStorage)() })),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CloudinaryController.prototype, "uploadProductImage", null);
exports.CloudinaryController = CloudinaryController = __decorate([
    (0, common_1.Controller)('cloudinary'),
    __metadata("design:paramtypes", [cloudinary_service_1.CloudinaryService,
        products_service_1.ProductsService])
], CloudinaryController);
//# sourceMappingURL=cloudinary.controller.js.map