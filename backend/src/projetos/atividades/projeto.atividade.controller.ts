import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProjetoAtividadesEntity } from './projeto.atividade.entity';
import { ProjetoAtividadeService } from './projeto.atividade.service';
import { ProjetoAtividadeRequestDto } from './projeto.atividade.request';
import { BaseEntity } from 'src/app/base.entity';

@Controller('projetos-atividades')
export class ProjetoAtividadeController {
  constructor(private readonly service: ProjetoAtividadeService) { }

  @Get()
  async findAll(): Promise<BaseEntity[]> {
    return await this.service.findAll();
  }
  
  @Post()
  async create(@Body() request: ProjetoAtividadeRequestDto): Promise<string> {
    const response = await this.service.create(request);
    return JSON.stringify(response);
  }
}
