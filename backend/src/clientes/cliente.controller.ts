import { Controller, Get, Param, ParseUUIDPipe, Post, Body, Put, Delete, NotFoundException, Query } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteResponseDto } from './cliente.response.dto';
import { ClienteCreateDto } from './dto/cliente.create.dto';
import { Roles } from 'nest-keycloak-connect';
import { ClienteUpdateDto } from './dto/cliente.update.dto';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) { }

  @Get()
  @Roles({ roles: ['MASTER','CLIENTE_LISTAR'] })
  async findAll(
    @Query('nome') nome?: string,
    @Query('documento') documento?: string,
    @Query('situacao') situacao?: string,
  ): Promise<ClienteResponseDto[]> {
    const clientes = await this.clienteService.findAll(nome, documento, situacao);
    const clientesDto: ClienteResponseDto[] = clientes.map(cliente => cliente.toDto());
    return clientesDto;
  }

  @Get(':uuid')
  @Roles({ roles: ['MASTER','CLIENTE_EXIBIR']})
  async findOne(@Param('uuid') uuid: string): Promise<ClienteResponseDto> {
    const cliente = await this.clienteService.findOneByUuid(uuid);
    if (!cliente)
      throw new NotFoundException('Cliente não localizado');

    return cliente.toDto()
  }

  @Get('/findByDocumento/:documento')
  @Roles({ roles: ['MASTER','CLIENTE_EXIBIR'] })
  async findByDocumento(@Param('documento') documento: string): Promise<ClienteResponseDto> {
    const cliente = await this.clienteService.findByDocumento(documento);
    if (!cliente)
      return null;

    return cliente.toDto();
  }

  @Post()
  @Roles({ roles: ['MASTER','CLIENTE_CADASTRAR'] })
  async create(@Body() request: ClienteCreateDto): Promise<ClienteResponseDto> {
    const createdCliente = await this.clienteService.create(request);
    return createdCliente.toDto();
  }

  @Put(':uuid')
  @Roles({ roles: ['MASTER','CLIENTE_EDITAR'] })
  async update(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string, @Body() request: ClienteUpdateDto): Promise<string> {
    const updatedCliente = await this.clienteService.update(uuid, request);
    return JSON.stringify(updatedCliente);
  }

  @Delete(':uuid')
  @Roles({ roles: ['MASTER','CLIENTE_EXCLUIR'] })
  async remove(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string): Promise<ClienteResponseDto> {
    const cliente = await this.clienteService.remove(uuid);
    return cliente.toDto();
  }

  @Get('/findByEmail/:email')
  @Roles({ roles: ['MASTER','CLIENTE_EXIBIR'] })
  async findByEmail(@Param('email') email: string): Promise<string> {
    return await this.clienteService.findByEmail(email)
  }
}