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
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
let UsersRepository = class UsersRepository {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getUsers(page = 1, limit = 5) {
        const [users, total] = await this.userRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            relations: ['orders'],
        });
        return { status: 200, data: users, total };
    }
    async createUser(userData) {
        const user = this.userRepository.create(userData);
        await this.userRepository.save(user);
        return { status: 201, id: user.id };
    }
    async getUserById(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['orders'],
        });
        if (!user)
            return { status: 404 };
        return {
            status: 200,
            data: {
                ...user,
                orders: user.orders.map((order) => ({
                    id: order.id,
                    date: order.date,
                })),
            },
        };
    }
    async getByName(name) {
        return await this.userRepository.findOneBy({ name });
    }
    async findByEmail(email) {
        return await this.userRepository.findOneBy({ email });
    }
    async updateUser(id, userData) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user)
            return { status: 404 };
        await this.userRepository.update(id, userData);
        return { status: 200 };
    }
    async deleteUser(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user)
            return { status: 404 };
        await this.userRepository.remove(user);
        return { status: 200, message: 'User deleted successfully' };
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersRepository);
//# sourceMappingURL=users.repository.js.map