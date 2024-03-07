import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjetoAtividadeEntity } from './projeto.atividade.entity';

@Injectable()
export class ProjetoAtividadeService {
  constructor(
    @InjectRepository(ProjetoAtividadeEntity) 
    private repository: Repository<ProjetoAtividadeEntity>,
  ) { }

  async findAll(): Promise<ProjetoAtividadeEntity[]> {
    return this.repository.find();
  }
}
