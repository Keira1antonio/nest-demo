import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `Estas ejecutando un middleware ${req.method} en la ruta ${req.url}`,
    );
    next();
  }
}

export function LoggerGlobal(req: Request, res: Response, next: NextFunction) {
  console.log(
    `Estas ejecutando un middleware ${req.method} en la ruta ${req.url}`,
  );
  next();
}
