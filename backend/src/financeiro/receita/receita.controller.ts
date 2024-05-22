import { Controller, Get, Param, ParseUUIDPipe, Post, Body, Put, Delete, NotFoundException } from '@nestjs/common';
import { ReceitaService } from './receita.service';
import { ReceitaResponseDto } from './receita.response.dto';
import { Roles } from 'nest-keycloak-connect';
import { ReceitaRequestDto } from './receita.request.dto';

@Controller('receita')
export class ReceitaController {
  constructor(private readonly service: ReceitaService) { }

  @Get()
  @Roles({ roles: ['MASTER','DESPESA_LISTAR'] })
  async findAll(): Promise<ReceitaResponseDto[]> {
    const receitas = await this.service.findAll();
    const receitasDto: ReceitaResponseDto[] = receitas.map(receita => receita.toDto());
    return receitasDto;
  }

  @Get(':uuid')
  @Roles({ roles: ['MASTER','DESPESA_EXIBIR']})
  async findOne(@Param('uuid') uuid: string): Promise<ReceitaResponseDto> {
    const receita = await this.service.findOneByUuid(uuid);
    if (!receita)
      throw new NotFoundException('Receita não localizada');

    return receita.toDto()
  }

  @Post()
  @Roles({ roles: ['MASTER','DESPESA_CADASTRAR'] })
  async create(@Body() request: ReceitaRequestDto): Promise<ReceitaResponseDto> {
    const createdReceita = await this.service.create(request);
    return createdReceita.toDto();
  }

  @Put(':uuid')
  @Roles({ roles: ['MASTER','DESPESA_EDITAR'] })
  async update(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string, @Body() request: ReceitaRequestDto): Promise<string> {
    await this.service.update(uuid, request);
    return "Receita alterada com sucesso"
  }

  @Delete(':uuid')
  @Roles({ roles: ['MASTER','DESPESA_EXCLUIR'] })
  async remove(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string): Promise<ReceitaResponseDto> {
    const receita = await this.service.remove(uuid);
    return receita.toDto();
  }
}