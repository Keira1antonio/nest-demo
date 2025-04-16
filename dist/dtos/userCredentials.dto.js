"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCredentialsDto = void 0;
const CreateUserDto_1 = require("./CreateUserDto");
const swagger_1 = require("@nestjs/swagger");
class UserCredentialsDto extends (0, swagger_1.PickType)(CreateUserDto_1.CreateUserDto, [
    'email',
    'password',
]) {
}
exports.UserCredentialsDto = UserCredentialsDto;
//# sourceMappingURL=userCredentials.dto.js.map