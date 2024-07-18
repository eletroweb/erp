import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { AppService } from './app.service';
import { EnderecoResponse } from './endereco.response';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('findAddressByCep/:cep')
  @Roles({ roles: ['MASTER'] })
  async findOne(@Param('cep') cep: string): Promise<EnderecoResponse> {
    try {
      const response = await this.appService.findAddressByCep(cep);
      return response;
    } catch (error) {
      throw new NotFoundException('CEP não localizado.')
    }
  }
}
