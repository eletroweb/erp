import { Controller, Get, Param, ParseUUIDPipe, Post, Body, Put, Delete, Res, NotFoundException, Query } from '@nestjs/common';
import { ServicoService } from './servico.service';
import { ServicoEntity } from './servico.entity';
import { ServicoResponseDto } from './servico.response.dto';
import { ServicoRequestDto } from './servico.request.dto';
import { Roles } from 'nest-keycloak-connect';

@Controller('servicos')
export class ServicoController {
  constructor(private readonly servicoService: ServicoService) { }

  @Get()
  @Roles({ roles: ["MASTER","SERVICO_LISTAR"] })
  async findAll(
    @Query('descricao') descricao?: string,
    @Query('situacao') situacao?: string,
  ): Promise<ServicoResponseDto[]> {
    const servicos = await this.servicoService.findAll(descricao, situacao);
    const servicosDto: ServicoResponseDto[] = servicos.map(servico => servico.toDto());
    return servicosDto;
  }  

  @Get(':uuid')
  @Roles({ roles: ["MASTER","SERVICO_EXIBIR"] })
  async findOne(@Param('uuid') uuid: string): Promise<ServicoResponseDto> {
    const servico = await this.servicoService.findOneByUuid(uuid);
    if (!servico)
      throw new NotFoundException('Serviço não localizado');
    
    return servico.toDto();
  }

  @Post()
  @Roles({ roles: ["MASTER","SERVICO_CADASTRAR"] })
  async create(@Body() request: ServicoRequestDto): Promise<string> {
    const createdServico = await this.servicoService.create(request);
    return JSON.stringify(createdServico);
  }

  @Put(':uuid')
  @Roles({ roles: ["MASTER","SERVICO_EDITAR"] })
  async update(@Param('uuid') uuid: string, @Body() request: ServicoRequestDto): Promise<string> {
    const updatedServico = await this.servicoService.update(uuid, request);
    return JSON.stringify(updatedServico);
  }

  @Delete(':uuid')
  @Roles({ roles: ["MASTER","SERVICO_EXCLUIR"] })
  async remove(@Param('uuid') uuid: string): Promise<string> {
    const deletedServico = await this.servicoService.remove(uuid);
    return JSON.stringify(deletedServico);
  }
}
