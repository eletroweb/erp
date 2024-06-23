import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { EmpresaEntity } from './empresa.entity';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { GetCurrentUser } from 'src/auth/decorator/user.decorator';
import { UsuareioLogado } from 'src/auth/usuarios/usuario.logado';
import { EmpresaResponseDto } from './empresa.response.dto';

@Controller('empresa')
export class EmpresaController {
  constructor(private empresaService: EmpresaService) {}

  @Post()
  @Roles({ roles: ['MASTER'] })
  async create(
    @GetCurrentUser() usuarioLogado: UsuareioLogado,
    @Body() request: EmpresaEntity,
  ): Promise<string> {
    await this.empresaService.create(request, usuarioLogado);
    return JSON.stringify('Operação realizada com sucesso');
  }

  @Get()
  @Roles({ roles: ['MASTER'] })
  async findOne(@Param('uuid') uuid: string): Promise<EmpresaResponseDto> {
    return await this.empresaService.findOne(uuid);
  }
}
