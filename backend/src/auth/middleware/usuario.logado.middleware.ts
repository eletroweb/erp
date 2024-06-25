import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsuareioLogado } from '../usuarios/usuario.logado';

@Injectable()
export class UsuarioLogadoMiddleware implements NestMiddleware {
  use(
    req: Request & { usuarioLogado?: UsuareioLogado },
    res: Response,
    next: NextFunction,
  ) {
    if (req.user) {
      req.user;
    }
    next();
  }
}
