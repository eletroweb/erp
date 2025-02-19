import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  NotFoundException,
  Query
} from '@nestjs/common';
import { SetorService } from './setor.service';
import { SetorEntity } from './setor.entity';
import { SetorResponseDto } from './setor.response.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { SituacaoEnum } from 'src/enum/situacao.enum'
import { GetCurrentUser } from 'src/auth/decorator/user.decorator';
import { UsuarioLogado } from 'src/usuario/dto/usuario.response.dto';

@Controller('setores')
export class SetorController {
  constructor(private readonly setorService: SetorService) {}

  @Get()
  @Roles({ roles: ['MASTER', 'SETOR_LISTAR'] })
  async findAll(
    @GetCurrentUser() usuarioLogado: UsuarioLogado,
    @Query('descricao') descricao: string,
    @Query('situacao') situacao: SituacaoEnum,
    ): Promise<SetorResponseDto[]> {
    const setores = await this.setorService.findAll(usuarioLogado, descricao, situacao);
          return setores.map((setor) => setor.toDto());
  }

  @Get(':uuid')
  @Roles({ roles: ['MASTER', 'SETOR_EXIBIR'] })
  async findOne(@Param('uuid') uuid: string): Promise<SetorResponseDto> {
    const setor = await this.setorService.findOneByUuid(uuid);
    if (!setor) throw new NotFoundException('Setor não localizado');

    return setor.toDto();
  }

  @Post()
  @Roles({ roles: ['MASTER', 'SETOR_CADASTRAR'] })
  async create(
    @GetCurrentUser() usuarioLogado: UsuarioLogado,
    @Body() setorEntity: SetorEntity): Promise<string> {
    const createdSetor = await this.setorService.create(setorEntity, usuarioLogado);
    return JSON.stringify(createdSetor);
  }

  @Put(':uuid')
  @Roles({ roles: ['MASTER', 'SETOR_EDITAR'] })
  async update(
    @Param('uuid') uuid: string,
    @Body() setorEntity: SetorEntity,
  ): Promise<string> {
    const updatedSetor = await this.setorService.update(uuid, setorEntity);
    return JSON.stringify(updatedSetor);
  }

  @Delete(':uuid')
  @Roles({ roles: ['MASTER', 'SETOR_EXCLUIR'] })
  async remove(@Param('uuid') uuid: string): Promise<string> {
    const deletedSetor = await this.setorService.remove(uuid);
    return JSON.stringify(deletedSetor);
  }
}
