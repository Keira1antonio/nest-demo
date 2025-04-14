import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerGlobal } from './middleware/Logger';
import { ValidationPipe } from '@nestjs/common';
//import { AuthGuard } from './guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(LoggerGlobal);
  //app.useGlobalGuards(new AuthGuard());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
function useGlobalPipes(arg0: ValidationPipe): any {
  throw new Error('Function not implemented.');
}
