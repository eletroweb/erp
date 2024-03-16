// setor.controller.ts
import { Controller, Get, Param, ParseUUIDPipe, Post, Body, Put, Delete, Res, NotFoundException } from '@nestjs/common';
import { SetorService } from './setor.service';
import { SetorEntity } from './setor.entity';
import { SetorResponseDto } from './setor.response.dto';
import { Roles } from 'nest-keycloak-connect';

@Controller('setores')
export class SetorController {
  constructor(private readonly setorService: SetorService) { }

  @Get()
  @Roles({ roles: ["SETOR_LISTAR"] })
  async findAll(): Promise<SetorResponseDto[]> {
    const setores = await this.setorService.findAll();
    const setoresDto: SetorResponseDto[] = setores.map(setor => setor.toDto());
    return setoresDto;
  }

  @Get(':uuid')
  @Roles({ roles: ["SETOR_EXIBIR"] })
  async findOne(@Param('uuid') uuid: string): Promise<SetorResponseDto> {
    const setor = await this.setorService.findOneByUuid(uuid);
    if (!setor)
      throw new NotFoundException('Setor não localizado');
    
    return setor.toDto();
  }

  @Post()
  @Roles({ roles: ["SETOR_CADASTRAR"] })
  async create(@Body() setorEntity: SetorEntity): Promise<string> {
    const createdSetor = await this.setorService.create(setorEntity);
    return JSON.stringify(createdSetor);
  }

  @Put(':uuid')
  @Roles({ roles: ["SETOR_EDITAR"] })
  async update(@Param('uuid') uuid: string, @Body() setorEntity: SetorEntity): Promise<string> {
    const updatedSetor = await this.setorService.update(uuid, setorEntity);
    return JSON.stringify(updatedSetor);
  }

  @Delete(':uuid')
  @Roles({ roles: ["SETOR_EXCLUIR"] })
  async remove(@Param('uuid') uuid: string): Promise<string> {
    const deletedSetor = await this.setorService.remove(uuid);
    return JSON.stringify(deletedSetor);
  }
}
