import { Controller, Get, Param, ParseUUIDPipe, Post, Body, Put, Delete, NotFoundException } from '@nestjs/common';
import { DespesaService } from './despesa.service';
import { DespesaResponseDto } from './despesa.response.dto';
import { Roles } from 'nest-keycloak-connect';
import { DespesaRequestDto } from './despesa.request.dto';

@Controller('despesas')
export class DespesaController {
  constructor(private readonly service: DespesaService) { }

  @Get()
  @Roles({ roles: ['MASTER','DESPESA_LISTAR'] })
  async findAll(): Promise<DespesaResponseDto[]> {
    const despesas = await this.service.findAll();
    const despesasDto: DespesaResponseDto[] = despesas.map(despesa => despesa.toDto());
    return despesasDto;
  }

  @Get(':uuid')
  @Roles({ roles: ['MASTER','DESPESA_EXIBIR']})
  async findOne(@Param('uuid') uuid: string): Promise<DespesaResponseDto> {
    const despesa = await this.service.findOneByUuid(uuid);
    if (!despesa)
      throw new NotFoundException('Despesa não localizada');

    return despesa.toDto()
  }

  @Post()
  @Roles({ roles: ['MASTER','DESPESA_CADASTRAR'] })
  async create(@Body() request: DespesaRequestDto): Promise<DespesaResponseDto> {
    const createdDespesa = await this.service.create(request);
    return createdDespesa.toDto();
  }

  @Put(':uuid')
  @Roles({ roles: ['MASTER','DESPESA_EDITAR'] })
  async update(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string, @Body() request: DespesaRequestDto): Promise<string> {
    await this.service.update(uuid, request);
    return "Despesa alterada com sucesso"
  }

  @Delete(':uuid')
  @Roles({ roles: ['MASTER','DESPESA_EXCLUIR'] })
  async remove(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string): Promise<DespesaResponseDto> {
    const despesa = await this.service.remove(uuid);
    return despesa.toDto();
  }
}