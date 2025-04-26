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
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const auth_service_1 = require("./auth.service");
const auth_guard_1 = require("../guards/auth.guard");
const roles_unum_1 = require("../roles.unum");
const roles_decorator_1 = require("../decorator/roles.decorator");
const roles_guard_1 = require("../guards/roles.guard");
const swagger_1 = require("@nestjs/swagger");
let UsersController = class UsersController {
    usersService;
    userDbService;
    authService;
    constructor(usersService, userDbService, authService) {
        this.usersService = usersService;
        this.userDbService = userDbService;
        this.authService = authService;
    }
    async getUsers(name, page = 1, limit = 5) {
        try {
            if (name) {
                return await this.usersService.getUserByName(name);
            }
            return await this.usersService.getUsers(page, limit);
        }
        catch (error) {
            throw new common_1.BadRequestException('Error getting users');
        }
    }
    getAdmin() {
        return 'Ruta protegida';
    }
    async getUserById(id, request) {
        try {
            const user = await this.usersService.getUserById(id);
            if (!user)
                throw new common_1.NotFoundException('User not found');
            if (user.data) {
                const { isAdmin, ...userWithoutAdmin } = user.data;
                return userWithoutAdmin;
            }
            else {
                throw new common_1.BadRequestException('Invalid user data');
            }
            console.log(request.user);
        }
        catch (error) {
            throw new common_1.BadRequestException('Error getting user');
        }
    }
    async updateUser(id, userData) {
        try {
            const updatedUser = await this.usersService.updateUser(id, userData);
            if (!updatedUser)
                throw new common_1.NotFoundException('User not found');
            return updatedUser;
        }
        catch (error) {
            throw new common_1.BadRequestException('Error updating user');
        }
    }
    async deleteUser(id) {
        try {
            const deleteUser = await this.usersService.deleteUser(id);
            if (!deleteUser)
                throw new common_1.NotFoundException('User not found');
            return deleteUser;
        }
        catch (error) {
            throw new common_1.BadRequestException('Error deleting user');
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(roles_unum_1.Role.Admin),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.HttpCode)(200),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Query)('name')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('admin'),
    (0, roles_decorator_1.Roles)(roles_unum_1.Role.Admin),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    openapi.ApiResponse({ status: 200, type: String }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAdmin", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(200),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(200),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(200),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        users_service_1.UsersService,
        auth_service_1.AuthService])
], UsersController);
//# sourceMappingURL=users.controller.js.map