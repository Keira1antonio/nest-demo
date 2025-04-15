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
exports.UsersDbService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
let UsersDbService = class UsersDbService {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    getUserByEmail(email) {
        return this.usersRepository.findOne({ where: { email } });
    }
    createUser(userData) {
        return this.usersRepository.create(userData);
    }
    async saveUser(user) {
        return await this.usersRepository.save(user);
    }
    async getUsers(page = 1, limit = 5) {
        const [users, total] = await this.usersRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });
        return { status: 200, data: users, total };
    }
};
exports.UsersDbService = UsersDbService;
exports.UsersDbService = UsersDbService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersDbService);
//# sourceMappingURL=usersDb.service.js.map