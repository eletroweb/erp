import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as KeycloakConnect from 'keycloak-connect';
import { KEYCLOAK_INSTANCE } from '../constants';
import { Reflector } from '@nestjs/core';
import { KeycloakedRequest } from '../keycloaked-request';

declare module 'keycloak-connect' {
  interface GrantType {
    access_token?: KeycloakConnect.Token
    refresh_token?: string
    id_token?: string
    expires_in?: string
    token_type?: string
  }
}
/**
 * An authentication guard. Will return a 401 unauthorized when it is unable to
 * verify the JWT token or Bearer header is missing.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(KEYCLOAK_INSTANCE)
    private keycloak: KeycloakConnect.Keycloak,
    private reflector: Reflector
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: KeycloakedRequest = context.switchToHttp().getRequest();
    const isPublic = !!this.reflector.get<string>("public-path", context.getHandler());
    const roles = this.reflector.get<(string | string[])[]>("roles", context.getHandler());

    const jwt = this.extractJwt(request.headers);
    let grant: KeycloakConnect.Grant | undefined;
    let user;

    if (isPublic) {
      return true;
    }

    if (jwt) {
      grant = await this.keycloak.grantManager.createGrant({
        "access_token": jwt
      });
    } else {
      throw new UnauthorizedException();
    }

    if (grant) {
      request.grant = (grant as any) as KeycloakConnect.GrantType;

      if (!grant.isExpired()) {
        user = grant?.access_token && await this.keycloak.grantManager.userInfo(grant.access_token);
      }

      request.user = user;
      return this.hasAutrhorizedRole(request, roles);
    }
    return false;
  }

  private hasAutrhorizedRole(request: KeycloakedRequest, roles: (string | string[])[]): boolean {
    if (roles && request.grant) {
      if ("roles" in roles) {
        const rolesArray = roles.roles as string[];
        const hasPermission = rolesArray.some(role =>
          Array.isArray(role)
            ? role.every(innerRole => request.grant?.access_token?.content?.realm_access?.roles.includes(innerRole))
            : request.grant?.access_token?.content?.realm_access?.roles.includes(role)
        );

        return hasPermission;
      }
    }

    return false
  }

  extractJwt(headers: Headers) {
    const auth = headers['authorization']?.split(' ');

    if (auth && auth[0] && auth[0].toLowerCase() === 'bearer') {
      return auth[1]
    }

    return null;
  }
}
