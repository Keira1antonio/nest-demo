"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const Logger_1 = require("./middleware/Logger");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(Logger_1.LoggerGlobal);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
function useGlobalPipes(arg0) {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=main.js.map