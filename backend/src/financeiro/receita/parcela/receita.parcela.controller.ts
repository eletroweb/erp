import { Controller, Post, Body, UseInterceptors, UploadedFile, Get, Param, Res, BadRequestException } from '@nestjs/common';
import { ReceitaParcelaSituacaoRequest } from './receita.parcela.situacao.request';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReceitaParcelaComprovanteInterceptor } from './receita.parcela.comprovante.interceptor';
import { ReceitaParcelaComprovanteService } from './receita.parcela.comprovante.service';
import { existsSync, createReadStream } from 'fs';
import { ReceitaService } from '../receita.service';
import { ReceitaParcelaService } from './receita.parcela.service';


@Controller('receitas/parcela')
export class ReceitaParcelaController {
  constructor(
    private readonly receitaService: ReceitaService,
    private readonly comprovanteService: ReceitaParcelaComprovanteService,
    private readonly receitaParcelaService: ReceitaParcelaService,
  ) { }

  // RF12.5.2 Anexar comprovante de pagamento na parcela
  @Post('/alterar-situacao')
  @UseInterceptors(FileInterceptor('comprovante', ReceitaParcelaComprovanteInterceptor))
  async uploadFileAndPassValidation(
    @Body() request: ReceitaParcelaSituacaoRequest,
    @UploadedFile() comprovante: Express.Multer.File,
  ) {
    if (!comprovante)
      throw new BadRequestException('Comprovante não selecionado')

    const comprovante_nome = comprovante.filename
    await this.receitaService.pagar(request, comprovante_nome);

    // Verificar se todas as parcelas estão pagas
    const receita = await this.receitaService.findOneByUuid(request.receita_uuid)
    if (await this.receitaParcelaService.todasParcelasPagas(receita.parcelas)){
      await this.receitaService.pagarReceita(receita.uuid)
    }

    return { message: "Parcela paga com sucesso" }
  }

  @Get('/download-comprovante/:comprovante')
  async downloadFile(@Param('comprovante') comprovante: string, @Res() res) {
    const filePath = `./uploads/receitas/comprovantes/${comprovante}`;

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