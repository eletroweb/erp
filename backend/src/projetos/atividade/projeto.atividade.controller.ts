import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ProjetoAtividadeService } from './projeto.atividade.service';
import { ProjetoAtividadeRequestDto } from './projeto.atividade.request';
import { BaseEntity } from 'src/app/base.entity';
import { ProjetoAtividadesResponseDto } from './projeto.atividade.response';
import { Roles } from 'nest-keycloak-connect';

@Controller('projetos-atividades')
export class ProjetoAtividadeController {
  constructor(private readonly service: ProjetoAtividadeService) { }

  @Get()
  @Roles({ roles: ["MASTER","ATIVIDADE_PROJETO_LISTAR"] })
  async findAll(): Promise<BaseEntity[]> {
    return await this.service.findAll();
  }
  
  @Post()
  @Roles({ roles: ["MASTER","ATIVIDADE_PROJETO_CADASTRAR"] })
  async create(@Body() request: ProjetoAtividadeRequestDto): Promise<string> {
    const response = await this.service.create(request);
    return JSON.stringify(response);
  }

  @Get(':uuid')
  @Roles({ roles: ["MASTER","ATIVIDADE_PROJETO_EXIBIR"] })
  async findOne(@Param('uuid') uuid: string): Promise<ProjetoAtividadesResponseDto> {
    const response = await this.service.findOneByUuid(uuid);
    if (!response)
      throw new NotFoundException('Atividade não localizada');
    
    return response.toDto();
  }

  @Put(':uuid')
  @Roles({ roles: ["MASTER","ATIVIDADE_PROJETO_EDITAR"] })
  async update(@Param('uuid') uuid: string, @Body() request: ProjetoAtividadeRequestDto): Promise<string> {
    const response = await this.service.update(uuid, request);
    return JSON.stringify(response);
  }

  @Delete(':uuid')
  @Roles({ roles: ["MASTER","ATIVIDADE_PROJETO_DELETAR"] })
  async delete(@Param('uuid') uuid: string): Promise<string> {
    const response = await this.service.delete(uuid);
    return JSON.stringify(response);
  }
}
