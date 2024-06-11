/* eslint-disable prettier/prettier */
import { Controller, Get, Param, ParseUUIDPipe, Post, Body, Put, Delete, NotFoundException } from '@nestjs/common';
import { OrdemServicoService } from './ordemServico.service';
import { OrdemServicoRequestDto } from './ordemServico.request.dto';
import { OrdemServicoResponseDto } from './ordemServico.response.dto';
import { Roles } from 'src/config/roles.decorator';

@Controller('os')
export class OrdemServicoController {
  constructor(private readonly ordemServicoService: OrdemServicoService) { }

  @Get()
  @Roles({ roles: ['MASTER', 'ORDEM_SERVICO_LISTAR'] })
  async findAll(): Promise<OrdemServicoResponseDto[]> {
    const ordemServicos = await this.ordemServicoService.findAll();
    const ordemServicosDto: OrdemServicoResponseDto[] = ordemServicos.map(ordemServico => ordemServico.toDto());
    return ordemServicosDto;
  }

  @Get(':uuid')
  @Roles({ roles: ['MASTER', 'ORDEM_SERVICO_EXIBIR'] })
  async findOne(@Param('uuid') uuid: string): Promise<OrdemServicoResponseDto> {
    const ordemServico = await this.ordemServicoService.findOneByUuid(uuid);
    if (!ordemServico)
      throw new NotFoundException('Ordem de Serviço não localizado');

    return ordemServico.toDto();
  }

  @Post()
  @Roles({ roles: ['MASTER', 'ORDEM_SERVICO_CADASTRAR'] })
  async create(@Body() request: OrdemServicoRequestDto): Promise<string> {
    const createdOrdemServico = await this.ordemServicoService.create(request);
    return JSON.stringify(createdOrdemServico);
  }

  @Put(':uuid')
  @Roles({ roles: ['MASTER', 'ORDEM_SERVICO_EDITAR'] })
  async update(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string, @Body() request: OrdemServicoRequestDto): Promise<string> {
    const updatedOrdemServico = await this.ordemServicoService.update(uuid, request);
    return JSON.stringify(updatedOrdemServico);
  }

  @Delete(':uuid')
  @Roles({ roles: ['MASTER', 'ORDEM_SERVICO_EXCLUIR'] })
  async remove(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string): Promise<string> {
    const deletedOrdemServico = await this.ordemServicoService.remove(uuid);
    return JSON.stringify(deletedOrdemServico);
  }
}
