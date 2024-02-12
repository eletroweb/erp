import { Controller, Get, Param, ParseUUIDPipe, Post, Body, Put, Delete, Res, NotFoundException } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteEntity } from './cliente.entity';
import { ClienteResponseDto } from './cliente.response.dto';
import { ClienteRequestDto } from './cliente.request.dto';
import { Roles } from 'nest-keycloak-connect';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) { }

  @Get()
  @Roles({ roles: ['admin'] })
  async findAll(): Promise<ClienteResponseDto[]> {
    const clientes = await this.clienteService.findAll();
    const clientesDto: ClienteResponseDto[] = clientes.map(cliente => cliente.toDto());
    return clientesDto;
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string): Promise<ClienteResponseDto> {
    const cliente = await this.clienteService.findOneByUuid(uuid);
    if (!cliente)
      throw new NotFoundException('Cliente não localizado');
    
    return cliente.toDto()
  }

  @Get('/findByDocumento/:documento')
  async findByDocumento(@Param('documento') documento: string): Promise<ClienteResponseDto> {
    const cliente = await this.clienteService.findByDocumento(documento);
    if (!cliente)
      throw new NotFoundException('Cliente não localizado');
    
    return cliente.toDto();
  }

  @Post()
  async create(@Body() request: ClienteRequestDto): Promise<ClienteResponseDto> {
    const createdCliente = await this.clienteService.create(request);
    return createdCliente.toDto();
  }

  @Put(':uuid')
  async update(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string, @Body() clienteEntity: ClienteEntity): Promise<string> {
    const updatedCliente = await this.clienteService.update(uuid, clienteEntity);
    return JSON.stringify(updatedCliente);
  }

  @Delete(':uuid')
  async remove(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string): Promise<ClienteResponseDto> {
    const cliente = await this.clienteService.remove(uuid);
    return cliente.toDto();
  }
}
