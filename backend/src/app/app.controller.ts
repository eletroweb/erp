import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Render, Req, Res, Session, UnauthorizedException } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { PublicPath } from 'src/keycloak/src/decorators/public-path.decorator';
import { KeycloakService } from 'src/keycloak/src/keycloak.service';
import { KeycloakedRequest } from 'src/keycloak/src/keycloaked-request';
import { LoginRequestDto } from './login.request.dto';
import { GrantType } from 'keycloak-connect';
import { Roles } from 'nest-keycloak-connect';
import { AppService } from './app.service';
import { EnderecoResponse } from './endereco.response';

@Controller()
export class AppController {
  constructor(
    private keycloakService: KeycloakService,
    private readonly appService: AppService
  ) { }

  @PublicPath()
  @Get('login')
  @Render('login.hbs')
  login(@Res() resp: FastifyReply<any>, req: KeycloakedRequest<FastifyRequest>) {
    if (req != undefined && req.grant) {
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
      const statusCode = e.statusCode
      switch (statusCode) {
        case HttpStatus.UNAUTHORIZED:
          throw new UnauthorizedException();
        default:
          throw new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: e.message,
          }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Get('/findAddressByCep/:cep')
  @Roles({ roles: ['MASTER', 'CLIENTE_EXIBIR', 'FORNECEDOR_EXIBIR'] })
  async findAddressCep(@Param('cep') cep: string): Promise<EnderecoResponse> {
    return await this.appService.findAddressByCep(cep);
  }
}