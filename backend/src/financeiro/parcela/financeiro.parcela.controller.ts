import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { FinanceiroParcelaSituacaoRequest } from './financeiro.parcela.situacao.request';
import { FileInterceptor } from '@nestjs/platform-express';
import { FinanceiroParcelaComprovanteInterceptor } from './financeiro.parcela.comprovante.interceptor';
import { FinanceiroParcelaComprovanteService } from './financeiro.parcela.comprovante.service';
import { existsSync, createReadStream } from 'fs';
import { FinanceiroService } from '../financeiro.service';
import { FinanceiroParcelaService } from './financeiro.parcela.service';
import { Roles } from 'src/auth/decorator/roles.decorator';

@Controller('financeiro/parcela')
export class FinanceiroParcelaController {
  constructor(
    private readonly financeiroService: FinanceiroService,
    private readonly comprovanteService: FinanceiroParcelaComprovanteService,
    private readonly financeiroParcelaService: FinanceiroParcelaService,
  ) {}

  // RF12.5.2 Anexar comprovante de pagamento na parcela
  @Post('/alterar-situacao')
  @Roles({ roles: ['MASTER'] })
  @UseInterceptors(
    FileInterceptor('comprovante', FinanceiroParcelaComprovanteInterceptor),
  )
  async uploadFileAndPassValidation(
    @Body() request: FinanceiroParcelaSituacaoRequest,
    @UploadedFile() comprovante: Express.Multer.File,
  ) {
    if (!comprovante)
      throw new BadRequestException('Comprovante não selecionado');

    const comprovante_nome = comprovante.filename;
    await this.financeiroService.pagar(request, comprovante_nome);

    // Verificar se todas as parcelas estão pagas
    const financeiro = await this.financeiroService.findOneByUuid(
      request.financeiro_uuid,
    );
    if (
      await this.financeiroParcelaService.todasParcelasPagas(
        financeiro.parcelas,
      )
    ) {
      await this.financeiroService.pagarFinanceiro(financeiro.uuid);
    }

    return { message: 'Parcela paga com sucesso' };
  }

  @Get('/download-comprovante/:comprovante')
  @Roles({ roles: ['MASTER'] })
  async downloadFile(@Param('comprovante') comprovante: string, @Res() res) {
    const filePath = `./uploads/financeiro/comprovantes/${comprovante}`;

    if (!existsSync(filePath)) {
      res.status(404).send('Arquivo não encontrado');
      return;
    }

    const fileStream = createReadStream(filePath);
    fileStream.pipe(res);

    const filextension = comprovante.match(/\.(\w+)$/)[1];
    res.setHeader('Content-Type', `application/${filextension}`);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${comprovante}"`,
    );
  }
}
