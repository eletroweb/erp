import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SetorService } from 'src/setores/setor.service';
import { ProjetoAtividadesEntity } from './projeto.atividade.entity';
import { ProjetoAtividadeRequestDto } from './projeto.atividade.request';
import { ProjetoService } from '../projeto.service';
import { BaseEntity } from 'src/app/base.entity';

@Injectable()
export class ProjetoAtividadeService {
  constructor(
    @InjectRepository(ProjetoAtividadesEntity)
    private repository: Repository<ProjetoAtividadesEntity>,
    private projetoService: ProjetoService,
    private setorService: SetorService,
  ) {}

  async findAll(): Promise<BaseEntity[]> {
    return this.repository.find();
  }

  async create(request: ProjetoAtividadeRequestDto): Promise<BaseEntity> {
    const projeto = await this.projetoService.findOneByUuid(request.projeto);
    const setor = await this.setorService.findOneByUuid(request.setor);
    const projetoAtividade = ProjetoAtividadesEntity.fromRequestDto(
      request,
      projeto,
      setor,
    );
    const createdProjeto = this.repository.create(projetoAtividade);
    return this.repository.save(createdProjeto);
  }

  async update(
    uuid: string,
    request: ProjetoAtividadeRequestDto,
  ): Promise<ProjetoAtividadesEntity> {
    const atividadeOrigin = await this.findOneByUuid(uuid);
    const setor = await this.setorService.findOneByUuid(request.setor);
    const projeto = await this.projetoService.findOneByUuid(request.projeto);
    const atividadeTarget = ProjetoAtividadesEntity.fromRequestDto(
      request,
      projeto,
      setor,
    );
    const updatedAtividade = this.repository.merge(
      atividadeOrigin,
      atividadeTarget,
    );
    await this.repository.save(updatedAtividade);

    return updatedAtividade;
  }

  async delete(uuid: string) {
    const atividade = await this.findOneByUuid(uuid);
    await this.repository.remove(atividade);
  }

  async findOneByUuid(uuid: string): Promise<ProjetoAtividadesEntity> {
    const atividade = await this.repository.findOne({
      where: { uuid },
      relations: ['projeto', 'setor'],
      select: {},
    });
    if (!atividade) throw new NotFoundException('Atividade não localizada');

    return atividade;
  }
}
