import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { EmpresaEntity } from './empresa.entity';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { GetCurrentUser } from 'src/auth/decorator/user.decorator';
import { UsuareioLogado } from 'src/auth/usuarios/usuario.logado';
import { EmpresaResponseDto } from './empresa.response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { EmpresaLogomarcaInterceptor } from './empresa.logomarca.interceptor';

@Controller('empresa')
export class EmpresaController {
  constructor(private empresaService: EmpresaService) { }

  @Post()
  @Roles({ roles: ['MASTER'] })
  async create(
    @GetCurrentUser() usuarioLogado: UsuareioLogado,
    @Body() request: EmpresaEntity,
  ): Promise<string> {
    await this.empresaService.create(request, usuarioLogado);
    return JSON.stringify('Dados da empresa atualizados com sucesso');
  }

  @Get()
  @Roles({ roles: ['MASTER'] })
  async findOne(@Param('uuid') uuid: string): Promise<EmpresaResponseDto> {
    return await this.empresaService.findOne(uuid);
  }

  @Post('/logomarca')
  @Roles({ roles: ['MASTER'] })
  @UseInterceptors(FileInterceptor('logomarca', EmpresaLogomarcaInterceptor))
  async uploadFileAndPassValidation(
    @GetCurrentUser() usuarioLogado: UsuareioLogado,
    @UploadedFile() logomarca: Express.Multer.File,
  ) {
    await this.empresaService.alterarLogomarca(
      logomarca.filename,
      usuarioLogado,
    );
    return JSON.stringify('Logomarca atualizada com sucesso');
  }

  @Get('/logomarca/')
  @Roles({ roles: ['MASTER'] })
  async downloadFile(
    @GetCurrentUser() usuarioLogado: UsuareioLogado,
    @Res() res,
  ) {
    const logoPath = await this.empresaService.getLogoPath(usuarioLogado.sub);
    return res.sendFile(logoPath);
  }

  /*@Get('/logomarca/')
  @Roles({ roles: ['MASTER'] })
  async downloadFile(
    @GetCurrentUser() usuarioLogado: UsuareioLogado,
    @Res() res,
  ) {
    const empresa = await this.empresaService.findOne(usuarioLogado.sub);
    const filePath = `./uploads/empresa/logomarca/${empresa.logomarca}`;

    if (!existsSync(filePath)) {
      res.status(404).send('Logomarca não encontrada');
      return;
    }

    const fileStream = createReadStream(filePath);
    fileStream.pipe(res);

    const filextension = empresa.logomarca.match(/\.(\w+)$/)[1];
    res.setHeader('Content-Type', `application/${filextension}`);
    res.setHeader('Content-Disposition', `attachment; filename="logomarca"`);
  }*/
}
