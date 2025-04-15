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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const usersDb_service_1 = require("./usersDb.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    usersDbService;
    constructor(usersDbService) {
        this.usersDbService = usersDbService;
    }
    async singUp(user) {
        const userExists = await this.usersDbService.getUserByEmail(user.email);
        if (userExists) {
            throw new common_1.BadRequestException('User already exists');
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        if (!hashedPassword) {
            throw new common_1.BadRequestException('Error hashing password');
        }
        const userEntity = this.usersDbService.createUser({
            ...user,
            password: hashedPassword,
        });
        await this.usersDbService.saveUser(userEntity);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usersDb_service_1.UsersDbService])
], AuthService);
//# sourceMappingURL=auth.service.js.map