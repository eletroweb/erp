import { Body, Controller, Get, HttpException, HttpStatus, Post, Render, Req, Res, Session } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { PublicPath } from 'src/keycloak/src/decorators/public-path.decorator';
import { KeycloakService } from 'src/keycloak/src/keycloak.service';
import { KeycloakedRequest } from 'src/keycloak/src/keycloaked-request';
import { LoginRequestDto } from './login.request.dto';
import { GrantType } from 'keycloak-connect';

@Controller()
export class AppController {
  constructor(private keycloakService: KeycloakService) { }

  @PublicPath()
  @Get('login')
  @Render('login.hbs')
  login(@Res() resp: FastifyReply<any>, req: KeycloakedRequest<FastifyRequest>) {
    if (req.grant) {
      resp.status(302).redirect('/notifications/direct');
      return {}
    }

    return {};
  }

  @PublicPath()
  @Post('login')
  async auth(@Body() request: LoginRequestDto, @Session() session: Record<string, any>): Promise<GrantType> {
    try {
      const res = await this.keycloakService.login(request.username, request.password);
      if (res.access_token) {
        //session.auth = true;
        return res;
      }
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: e.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/me')
  @PublicPath()
  async me(): Promise<string> {
    return 'oi';
  }
}