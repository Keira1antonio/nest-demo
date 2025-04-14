import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is required');
    }

    const parts = authHeader.split(' '); // Separar "Basic" y credenciales
    if (parts.length !== 2 || parts[0] !== 'Basic') {
      throw new UnauthorizedException('Invalid Authorization format');
    }

    const credentials = parts[1].split(':');
    if (credentials.length !== 2) {
      throw new UnauthorizedException('Invalid credentials format');
    }

    return true; // ✅ Permitir acceso si el formato es válido
  }
}
