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
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const CreateUserDto_1 = require("../dtos/CreateUserDto");
const auth_guard_1 = require("../guards/auth.guard");
let UsersController = class UsersController {
    usersService;
    userDbService;
    constructor(usersService, userDbService) {
        this.usersService = usersService;
        this.userDbService = userDbService;
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
    async getUserById(id) {
        try {
            const user = await this.usersService.getUserById(id);
            if (!user)
                throw new common_1.NotFoundException('User not found');
            return user;
        }
        catch (error) {
            throw new common_1.BadRequestException('Error getting user');
        }
    }
    async createUser(createUserDto) {
        try {
            return await this.usersService.createUser(createUserDto);
        }
        catch (error) {
            throw new common_1.BadRequestException('Error creating user');
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
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Query)('name')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserDto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map