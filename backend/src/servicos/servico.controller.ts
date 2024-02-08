import { Controller, Get, Param, ParseUUIDPipe, Post, Body, Put, Delete, Res, NotFoundException } from '@nestjs/common';
import { ServicoService } from './servico.service';
import { ServicoEntity } from './servico.entity';
import { ServicoResponseDto } from './servico.response.dto';
import { ServicoRequestDto } from './servico.request.dto';

@Controller('servicos')
export class ServicoController {
  constructor(private readonly servicoService: ServicoService) { }

  @Get()
  async findAll(): Promise<ServicoResponseDto[]> {
    const servicos = await this.servicoService.findAll();
    const servicosDto: ServicoResponseDto[] = servicos.map(servico => servico.toDto());
    return servicosDto;
  }  

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string): Promise<ServicoResponseDto> {
    const servico = await this.servicoService.findOneByUuid(uuid);
    if (!servico)
      throw new NotFoundException('Serviço não localizado');
    
    return servico.toDto();
  }

  @Post()
  async create(@Body() request: ServicoRequestDto): Promise<string> {
    const createdServico = await this.servicoService.create(request);
    return JSON.stringify(createdServico);
  }

  @Put(':uuid')
  async update(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string, @Body() servicoEntity: ServicoEntity): Promise<string> {
    const updatedServico = await this.servicoService.update(uuid, servicoEntity);
    return JSON.stringify(updatedServico);
  }

  @Delete(':uuid')
  async remove(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string): Promise<string> {
    const deletedServico = await this.servicoService.remove(uuid);
    return JSON.stringify(deletedServico);
  }
}
