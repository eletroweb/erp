import { Controller, Get, Param, Post, Body, Put, Delete, Res, NotFoundException } from '@nestjs/common';
import { ProjetoService } from './projeto.service';
import { ProjetoResponseDto } from './projeto.response.dto';
import { ProjetoRequestDto } from './projeto.request.dto';

@Controller('projetos')
export class ProjetoController {
  constructor(private readonly projetoService: ProjetoService) { }

  @Get()
  async findAll(): Promise<ProjetoResponseDto[]> {
    const projetos = await this.projetoService.findAll();
    const projetosDto: ProjetoResponseDto[] = projetos.map(projeto => projeto.toDto());
    return projetosDto;
  }
  

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string): Promise<ProjetoResponseDto> {
    const projeto = await this.projetoService.findOneByUuid(uuid);
    if (!projeto)
      throw new NotFoundException('Projeto não localizado');
    
    return projeto.toDto();
  }

  @Post()
  async create(@Body() request: ProjetoRequestDto): Promise<string> {
    const createdProjeto = await this.projetoService.create(request);
    return JSON.stringify(createdProjeto);
  }

  @Put(':uuid')
  async update(@Param('uuid') uuid: string, @Body() request: ProjetoRequestDto): Promise<string> {
    const updatedProjeto = await this.projetoService.update(uuid, request);
    return JSON.stringify(updatedProjeto);
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string): Promise<string> {
    const deletedProjeto = await this.projetoService.remove(uuid);
    return JSON.stringify(deletedProjeto);
  }
}
