import { Controller, Post, Body, UseInterceptors, UploadedFile, Get, Param, Res, BadRequestException } from '@nestjs/common';
import { DespesaParcelaSituacaoRequest } from './despesa.parcela.situacao.request';
import { FileInterceptor } from '@nestjs/platform-express';
import { DespesaParcelaComprovanteInterceptor } from './despesa.parcela.comprovante.interceptor';
import { DespesaParcelaComprovanteService } from './despesa.parcela.comprovante.service';
import { existsSync, createReadStream } from 'fs';
import { DespesaService } from '../despesa.service';
import { DespesaParcelaService } from './despesa.parcela.service';


@Controller('despesas/parcela')
export class DespesaParcelaController {
  constructor(
    private readonly despesaService: DespesaService,
    private readonly comprovanteService: DespesaParcelaComprovanteService,
    private readonly despesaParcelaService: DespesaParcelaService,
  ) { }

  // RF12.5.2 Anexar comprovante de pagamento na parcela
  @Post('/alterar-situacao')
  @UseInterceptors(FileInterceptor('comprovante', DespesaParcelaComprovanteInterceptor))
  async uploadFileAndPassValidation(
    @Body() request: DespesaParcelaSituacaoRequest,
    @UploadedFile() comprovante: Express.Multer.File,
  ) {
    if (!comprovante)
      throw new BadRequestException('Comprovante não selecionado')

    const comprovante_nome = comprovante.filename
    await this.despesaService.pagar(request, comprovante_nome);

    // Verificar se todas as parcelas estão pagas
    const despesa = await this.despesaService.findOneByUuid(request.despesa_uuid)
    if (await this.despesaParcelaService.todasParcelasPagas(despesa.parcelas)){
      await this.despesaService.pagarDespesa(despesa.uuid)
    }

    return { message: "Parcela paga com sucesso" }
  }

  @Get('/download-comprovante/:comprovante')
  async downloadFile(@Param('comprovante') comprovante: string, @Res() res) {
    const filePath = `./uploads/despesas/comprovantes/${comprovante}`;

    if (!existsSync(filePath)) {
      res.status(404).send('Arquivo não encontrado');
      return;
    }

    const fileStream = createReadStream(filePath);
    fileStream.pipe(res);

    const filextension = comprovante.match(/\.(\w+)$/)[1]
    res.setHeader('Content-Type', `application/${filextension}`);
    res.setHeader('Content-Disposition', `attachment; filename="${comprovante}"`);
  }
}