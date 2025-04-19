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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("./users.repository");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    getUsers(page, limit) {
        return this.usersRepository.getUsers(page, limit);
    }
    async createUser(createUserDto) {
        const existingUser = await this.usersRepository.findByEmail(createUserDto.email);
        if (existingUser !== null) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const newUser = this.usersRepository.createUser({
            ...createUserDto,
            password: hashedPassword,
            isAdmin: false,
            createdAt: new Date(),
        });
        return await this.usersRepository.save(newUser);
    }
    findByEmail(email) {
        throw new Error('Method not implemented.');
    }
    async getUserById(id) {
        return await this.usersRepository.getUserById(id);
    }
    async getUserByName(name) {
        return await this.usersRepository.getByName(name);
    }
    async updateUser(id, userData) {
        return await this.usersRepository.updateUser(id, userData);
    }
    async deleteUser(id) {
        return await this.usersRepository.deleteUser(id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], UsersService);
//# sourceMappingURL=users.service.js.map