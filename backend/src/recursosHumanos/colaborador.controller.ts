import { Controller, Get, Param, ParseUUIDPipe, Post, Body, Put, Delete, NotFoundException } from '@nestjs/common';
import { ColaboradorService } from './colaborador.service';
import { ColaboradorResponseDto } from './colaborador.response.dto';
import { ColaboradorRequestDto } from './colaborador.request.dto';
import { Roles } from 'nest-keycloak-connect';
import { CargoRequestDto } from './cargo.request.dto';
import { CargoResponseDto } from './cargo.response.dto';

@Controller('colaboradores')
export class ColaboradorController {
  constructor(private readonly colaboradorService: ColaboradorService) { }

  @Get()
  @Roles({ roles: ['MASTER', 'COLABORADOR_LISTAR'] })
  async findAll(): Promise<ColaboradorResponseDto[]> {
    const colaboradores = await this.colaboradorService.findAll();
    const colaboradorDto: ColaboradorResponseDto[] = colaboradores.map(colaborador => colaborador.toDto());
    return colaboradorDto;
  }

  @Get(':uuid')
  @Roles({ roles: ['MASTER', 'COLABORADOR_EXIBIR'] })
  async findOne(@Param('uuid') uuid: string): Promise<ColaboradorResponseDto> {
    const colaborador = await this.colaboradorService.findOneByUuid(uuid);
    if (!colaborador)
      throw new NotFoundException('Colaborador não localizado');

    return colaborador.toDto()
  }

  @Get('/findByDocumento/:documento')
  @Roles({ roles: ['MASTER', 'COLABORADOR_EXIBIR'] })
  async findByDocumento(@Param('documento') documento: string): Promise<ColaboradorResponseDto> {
    const colaborador = await this.colaboradorService.findByDocumento(documento);
    if (!colaborador)
      return null;

    return colaborador.toDto();
  }

  @Post()
  @Roles({ roles: ['MASTER', 'COLABORADOR_CADASTRAR'] })
  async create(@Body() request: ColaboradorRequestDto): Promise<ColaboradorResponseDto> {
    const createdColaborador = await this.colaboradorService.create(request);
    return createdColaborador.toDto();
  }

  @Put(':uuid')
  @Roles({ roles: ['MASTER', 'COLABORADOR_EDITAR'] })
  async update(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string, @Body() request: ColaboradorRequestDto): Promise<string> {
    const updatedColaborador = await this.colaboradorService.update(uuid, request);
    return JSON.stringify(updatedColaborador);
  }

  @Delete(':uuid')
  @Roles({ roles: ['MASTER', 'COLABORADOR_EXCLUIR'] })
  async remove(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string): Promise<ColaboradorResponseDto> {
    const colaborador = await this.colaboradorService.remove(uuid);
    return colaborador.toDto();
  }

  @Get('/findByEmail/:email')
  @Roles({ roles: ['MASTER', 'COLABORADOR_EXIBIR'] })
  async findByEmail(@Param('email') email: string): Promise<string> {
    return await this.colaboradorService.findByEmail(email)
  }

  @Get('/cargos/listar')
  @Roles({ roles: ['MASTER', 'COLABORADOR_LISTAR'] })
  async findAllOffice(): Promise<CargoResponseDto[]> {
    const cargos = await this.colaboradorService.findAllOffice();
    const cargoDto: CargoResponseDto[] = cargos.map(cargo => cargo.toDto());
    return cargoDto;
  }

  @Get('/findByNameOffice/:nomeCargo')
  @Roles({ roles: ['MASTER', 'COLABORADOR_EXIBIR'] })
  async findByNameOffice(@Param('nomeCargo') nomeCargo: string): Promise<string> {
    return await this.colaboradorService.findByNameOffice(nomeCargo)
  }

  @Post()
  @Roles({ roles: ['MASTER', 'COLABORADOR_CADASTRAR'] })
  async createOffice(@Body() request: CargoRequestDto): Promise<CargoResponseDto> {
    const createdCargo = await this.colaboradorService.createOffice(request);
    return createdCargo.toDto();
  }



}