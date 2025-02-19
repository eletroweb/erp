import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Body,
  Put,
  Delete,
  NotFoundException,
  Res,
  Query,
} from '@nestjs/common';
import { FinanceiroService } from './financeiro.service';
import { FinanceiroResponseDto } from './financeiro.response.dto';
import { FinanceiroRequestDto } from './financeiro.request.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { FinanceiroCategoriaEnum, FinanceiroEnum, ParcelamentoEnum } from 'src/enum/financeiro.enum';
import { GetCurrentUser } from 'src/auth/decorator/user.decorator';
import { UsuarioLogado } from 'src/usuario/dto/usuario.response.dto';
import { FinanceiroAdapter } from './adapter/FinanceiroAdapter';
import { SocketService } from './socket.service';
import { NotificaitonRequest } from 'src/app/notification.request';

@Controller('financeiro')
export class FinanceiroController {
  constructor(
    private readonly service: FinanceiroService,
    private readonly financeiroAdapter: FinanceiroAdapter,
    private readonly socketService: SocketService,
  ) { }

  @Get()
  @Roles({ roles: ['MASTER', 'DESPESA_LISTAR'] })
  async findAll(
    @GetCurrentUser() usuarioLogado: UsuarioLogado,
    @Query('descricao') descricao: string,
    @Query('categoria') categoria: FinanceiroCategoriaEnum,
    @Query('dataInicio') dataInicio: string,
    @Query('dataFim') dataFim: string,
    @Query('dataPagamentoInicio') dataPagamentoInicio: string,
    @Query('dataPagamentoFim') dataPagamentoFim: string,
    @Query('situacao') situacao: FinanceiroEnum,
    @Query('parcelada') parcelada: ParcelamentoEnum,
  ): Promise<FinanceiroResponseDto[]> {
    const isParcelada =
      parcelada === ParcelamentoEnum.PARCELADO
        ? true
        : parcelada === ParcelamentoEnum.NAO_PARCELADO
          ? false
          : null;
    const financeiro = await this.service.findAll(
      usuarioLogado,
      descricao,
      categoria,
      dataInicio,
      dataFim,
      dataPagamentoInicio,
      dataPagamentoFim,
      situacao,
      isParcelada,
    );
    const financeiroDto: FinanceiroResponseDto[] = financeiro.map(
      (financeiro) => this.financeiroAdapter.toDto(financeiro),
    );
    return financeiroDto;
  }

  @Get(':uuid')
  @Roles({ roles: ['MASTER', 'DESPESA_EXIBIR'] })
  async findOne(@Param('uuid') uuid: string): Promise<FinanceiroResponseDto> {
    const financeiro = await this.service.findOneByUuid(uuid);
    if (!financeiro) throw new NotFoundException('Financeiro não localizada');

    return this.financeiroAdapter.toDto(financeiro);
  }

  @Post()
  @Roles({ roles: ['MASTER', 'DESPESA_CADASTRAR'] })
  async create(
    @GetCurrentUser() usuarioLogado: UsuarioLogado,
    @Body() request: FinanceiroRequestDto,
  ): Promise<FinanceiroResponseDto> {
    const createdFinanceiro = await this.service.create(usuarioLogado, request);
    return this.financeiroAdapter.toDto(createdFinanceiro);
  }

  @Put(':uuid')
  @Roles({ roles: ['MASTER', 'DESPESA_EDITAR'] })
  async update(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
    @Body() request: FinanceiroRequestDto,
  ): Promise<string> {
    await this.service.update(uuid, request);
    return 'Registro atualizado com sucesso';
  }

  @Delete(':uuid')
  @Roles({ roles: ['MASTER', 'DESPESA_EXCLUIR'] })
  async remove(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
  ): Promise<FinanceiroResponseDto> {
    const financeiro = await this.service.remove(uuid);
    return this.financeiroAdapter.toDto(financeiro);
  }

  @Get('resumo/totais')
  @Roles({ roles: ['MASTER', 'DESPESA_LISTAR'] })
  async getResumo(
    @Query('data_inicio') dataInicio: string,
    @Query('data_fim') dataFim: string,
    @Query('situacao') situacao: FinanceiroEnum,
    @Res() res,
  ): Promise<any> {
    const resumo = await this.service.getResumo(dataInicio, dataFim, situacao);
    return res.json(resumo);
  }

  @Post('notification/invoicePending')
  @Roles({ roles: ['MASTER', 'DESPESA_LISTAR'] })
  async invoicePendingNotification(
    @GetCurrentUser() usuarioLogado: UsuarioLogado,
    @Body() notification: NotificaitonRequest): Promise<string> {
    this.socketService.emitClientEvent(usuarioLogado, notification);
    return "Mensagem enviada";
  }
}
