import { Controller, Get, Param, ParseUUIDPipe, Post, Body, Put, Delete, Res, NotFoundException } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteEntity } from './cliente.entity';
import { ClienteResponseDto } from './cliente.response.dto';
import { ClienteRequestDto } from './cliente.request.dto';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) { }

  @Get()
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
    
    return cliente.toDto();
  }

  @Post()
  async create(@Body() request: ClienteRequestDto): Promise<string> {
    const createdCliente = await this.clienteService.create(request);
    return JSON.stringify(createdCliente);
  }

  @Put(':uuid')
  async update(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string, @Body() clienteEntity: ClienteEntity): Promise<string> {
    const updatedCliente = await this.clienteService.update(uuid, clienteEntity);
    return JSON.stringify(updatedCliente);
  }

  @Delete(':uuid')
  async remove(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string): Promise<string> {
    const deletedCliente = await this.clienteService.remove(uuid);
    return JSON.stringify(deletedCliente);
  }
}
