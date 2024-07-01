import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { SignupRequestDto } from './signup.request.dto';

@Injectable()
export class AuthService {
  constructor(
    private service: UsuarioService,
    private jwtService: JwtService
  ) { }

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

  async signup(request: SignupRequestDto) {
    return await this.service.signup(request);
  }
}
