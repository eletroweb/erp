/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioRequestDto } from 'src/auth/usuarios/usuario.request.dto';
import { UsuarioService } from 'src/auth/usuarios/usuario.service';
import * as bcrypt from 'bcrypt';
import { UsuarioRoleService } from './usuarios/roles/usuario.role.service';

@Injectable()
export class AuthService {
  constructor(
    private service: UsuarioService,
    private jwtService: JwtService,
    private readonly usuarioRoleService: UsuarioRoleService,
  ) {}

  async login(email: string, pass: string): Promise<{ access_token: string }> {
    const usuario = await this.service.findOneByEmail(email);
    const roles = usuario.roles.map((role) => role.roles.nome) as string[];

    if (!usuario) throw new UnauthorizedException();

    const isMatch = await bcrypt.compare(pass, usuario.password);

    if (!isMatch) throw new UnauthorizedException();

    const payload = {
      sub: usuario.uuid,
      email: usuario.email,
      fullName: usuario.nome,
      roles,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async cadastro(request: UsuarioRequestDto) {
    return await this.service.create(request);
  }
}
