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
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    usersDbService;
    jwtService;
    constructor(usersDbService, jwtService) {
        this.usersDbService = usersDbService;
        this.jwtService = jwtService;
    }
    async singUp(user) {
        const dbUser = await this.usersDbService.getUserByEmail(user.email);
        if (dbUser) {
            throw new common_1.BadRequestException('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        if (!hashedPassword) {
            throw new common_1.BadRequestException('password not hashed');
        }
        const newUser = { ...user, password: hashedPassword };
        await this.usersDbService.createUser(newUser);
        return this.usersDbService.saveUser(newUser);
    }
    async sinIn(email, password) {
        const dbUser = await this.usersDbService.getUserByEmail(email);
        if (!dbUser) {
            throw new common_1.BadRequestException('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, dbUser.password);
        if (!isPasswordValid) {
            throw new common_1.BadRequestException('Password Invalid');
        }
        const userPayload = {
            sub: dbUser.id,
            id: dbUser.id,
            email: dbUser.email,
        };
        const token = this.jwtService.sign(userPayload);
        return { success: 'User logged in successfully', token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usersDb_service_1.UsersDbService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map