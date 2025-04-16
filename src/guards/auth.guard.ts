import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlYmYwZjcxNS02MzBhLTRmNzYtODA5OC0wOWJkNGExZWYxNzciLCJpZCI6ImViZjBmNzE1LTYzMGEtNGY3Ni04MDk4LTA5YmQ0YTFlZjE3NyIsImVtYWlsIjoianVzdERvaUBleGFtcGxlLmNvbSIsImlhdCI6MTc0NDgzMDE3OSwiZXhwIjoxNzQ1MDAyOTc5fQ.QzPY8hF0ZD3IT7xxQFKeLjis_tjxlTu6rjD65QI8yBE
    const token = request.headers['authorization']?.split(' ')[1] ?? '';
    console.log(token);
    if (!token) {
      throw new UnauthorizedException('Bearer token not found');
    }
    try {
      const secret = process.env.JWT_SECRET;
      const payload = this.jwtService.verify(token, { secret });
      payload.roles = ['admin'];
      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
