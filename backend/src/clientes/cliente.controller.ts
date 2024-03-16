import { Controller, Get, Param, ParseUUIDPipe, Post, Body, Put, Delete, NotFoundException } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteResponseDto } from './cliente.response.dto';
import { ClienteRequestDto } from './cliente.request.dto';
import { Roles } from 'nest-keycloak-connect';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) { }

  @Get()
  @Roles({ roles: ["CLIENTE_LISTAR"] })
  async findAll(): Promise<ClienteResponseDto[]> {
    const clientes = await this.clienteService.findAll();
    const clientesDto: ClienteResponseDto[] = clientes.map(cliente => cliente.toDto());
    return clientesDto;
  }

  @Get(':uuid')
  @Roles({ roles: ["CLIENTE_EXIBIR"] })
  async findOne(@Param('uuid') uuid: string): Promise<ClienteResponseDto> {
    const cliente = await this.clienteService.findOneByUuid(uuid);
    if (!cliente)
      throw new NotFoundException('Cliente não localizado');

    return cliente.toDto()
  }

  @Get('/findByDocumento/:documento')
  @Roles({ roles: ["CLIENTE_EXIBIR"] })
  async findByDocumento(@Param('documento') documento: string): Promise<ClienteResponseDto> {
    const cliente = await this.clienteService.findByDocumento(documento);
    if (!cliente)
      throw new NotFoundException('Cliente não localizado');

    return cliente.toDto();
  }

  @Post()
  @Roles({ roles: ["CLIENTE_CADASTRAR"] })
  async create(@Body() request: ClienteRequestDto): Promise<ClienteResponseDto> {
    const createdCliente = await this.clienteService.create(request);
    return createdCliente.toDto();
  }

  @Put(':uuid')
  @Roles({ roles: ["CLIENTE_EDITAR"] })
  async update(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string, @Body() request: ClienteRequestDto): Promise<string> {
    const updatedCliente = await this.clienteService.update(uuid, request);
    return JSON.stringify(updatedCliente);
  }

  @Delete(':uuid')
  @Roles({ roles: ["CLIENTE_EXCLUIR"] })
  async remove(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string): Promise<ClienteResponseDto> {
    const cliente = await this.clienteService.remove(uuid);
    return cliente.toDto();
  }

  @Get('/findByEmail/:email')
  @Roles({ roles: ["CLIENTE_EXIBIR"] })
  async findByEmail(@Param('email') email: string): Promise<string> {
    return await this.clienteService.findByEmail(email)
  }
}