import { Controller, Get, Param, ParseUUIDPipe, Post, Body, Put, Delete, NotFoundException, Res, Query } from '@nestjs/common';
import { FinanceiroService } from './financeiro.service';
import { FinanceiroResponseDto } from './financeiro.response.dto';
import { Roles } from 'nest-keycloak-connect';
import { FinanceiroRequestDto } from './financeiro.request.dto';
import { FinanceiroEnum } from 'src/enum/financeiro.enum';

@Controller('financeiro')
export class FinanceiroController {
  constructor(private readonly service: FinanceiroService) { }

  @Get()
  @Roles({ roles: ['MASTER','DESPESA_LISTAR'] })
  async findAll(): Promise<FinanceiroResponseDto[]> {
    const financeiro = await this.service.findAll();
    const financeiroDto: FinanceiroResponseDto[] = financeiro.map(financeiro => financeiro.toDto());
    return financeiroDto;
  }

  @Get(':uuid')
  @Roles({ roles: ['MASTER','DESPESA_EXIBIR']})
  async findOne(@Param('uuid') uuid: string): Promise<FinanceiroResponseDto> {
    const financeiro = await this.service.findOneByUuid(uuid);
    if (!financeiro)
      throw new NotFoundException('Financeiro não localizada');

    return financeiro.toDto()
  }

  @Post()
  @Roles({ roles: ['MASTER','DESPESA_CADASTRAR'] })
  async create(@Body() request: FinanceiroRequestDto): Promise<FinanceiroResponseDto> {
    const createdFinanceiro = await this.service.create(request);
    return createdFinanceiro.toDto();
  }

  @Put(':uuid')
  @Roles({ roles: ['MASTER','DESPESA_EDITAR'] })
  async update(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string, @Body() request: FinanceiroRequestDto): Promise<string> {
    await this.service.update(uuid, request);
    return "Financeiro alterada com sucesso"
  }

  @Delete(':uuid')
  @Roles({ roles: ['MASTER','DESPESA_EXCLUIR'] })
  async remove(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string): Promise<FinanceiroResponseDto> {
    const financeiro = await this.service.remove(uuid);
    return financeiro.toDto();
  }

  @Get('resumo/totais')
  @Roles({ roles: ['MASTER', 'DESPESA_LISTAR'] })
  async getResumo(@Query('data_inicio') dataInicio: string, @Query('data_fim') dataFim: string, @Query('situacao') situacao: FinanceiroEnum, @Res() res): Promise<any> {
      const resumo = await this.service.getResumo(dataInicio, dataFim, situacao);
      return res.json(resumo);
  }

}