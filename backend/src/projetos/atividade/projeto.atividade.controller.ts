import { Controller, Get } from '@nestjs/common';
import { ProjetoAtividadeEntity } from './projeto.atividade.entity';
import { ProjetoAtividadeService } from './projeto.atividade.service';
import { ProjetoAtividadeResponseDto } from './projeto.atividade.response.dto';

@Controller('projetos-atividades')
export class ProjetoAtividadeController {
  constructor(private readonly service: ProjetoAtividadeService) { }

  @Get()
  async findAll(): Promise<ProjetoAtividadeResponseDto[]> {
    const atividades = await this.service.findAll();
    const atividadesDto: ProjetoAtividadeResponseDto[] = atividades.map(atividade => atividade.toDto());
    return atividadesDto;
  }
}
