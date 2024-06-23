/* eslint-disable prettier/prettier */
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public-strategy';
import { ROLES_KEY } from 'src/auth/decorator/roles.decorator';
import { UsuarioService } from 'src/auth/usuarios/usuario.service';
import { UsuarioRoleService } from './usuarios/roles/usuario.role.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private usuarioService: UsuarioService,
    private readonly usuarioRoleService: UsuarioRoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request['user'] = payload;

      const requiredRoles = this.reflector.get<string[]>(
        ROLES_KEY,
        context.getHandler(),
      );
      if (requiredRoles) {
        const usuario = await this.usuarioService.findOneByUuid(payload.sub);
        const roles = usuario.roles.map((role) => role.roles.nome) as string[];
        const hasRequiredRole = requiredRoles.some((role) =>
          roles.includes(role),
        );

        if (!hasRequiredRole) throw new ForbiddenException('Acesso negado');
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
