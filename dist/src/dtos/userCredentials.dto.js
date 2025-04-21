"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCredentialsDto = void 0;
const openapi = require("@nestjs/swagger");
const CreateUserDto_1 = require("./CreateUserDto");
const swagger_1 = require("@nestjs/swagger");
class UserCredentialsDto extends (0, swagger_1.PickType)(CreateUserDto_1.CreateUserDto, [
    'email',
    'password',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UserCredentialsDto = UserCredentialsDto;
//# sourceMappingURL=userCredentials.dto.js.map