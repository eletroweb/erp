// projeto.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SetorService } from 'src/setores/setor.service';
import { ClienteService } from 'src/clientes/cliente.service';
import { UsuarioService } from 'src/usuarios/usuario.service';
import { ProjetoAtividadesEntity } from './projeto.atividade.entity';
import { ProjetoEntity } from '../projeto.entity';
import { ProjetoAtividadeRequestDto } from './projeto.atividade.request';
import { ProjetoService } from '../projeto.service';
import { BaseEntity } from 'src/app/base.entity';

@Injectable()
export class ProjetoAtividadeService {
  constructor(
    @InjectRepository(ProjetoAtividadesEntity) 
    private projetoAtviidadeRepository: Repository<ProjetoAtividadesEntity>,
    private projetoService: ProjetoService,
    private setorService: SetorService,
    private usuarioService: UsuarioService,
  ) { }

  async findAll(): Promise<BaseEntity[]> {
    return this.projetoAtviidadeRepository.find();
  }

  async create(request: ProjetoAtividadeRequestDto): Promise<BaseEntity> {
    const projeto = await this.projetoService.findOneByUuid(request.projeto)
    const setor = await this.setorService.findOneByUuid(request.setor)
    const projetoAtividade = ProjetoAtividadesEntity.fromRequestDto(request, projeto, setor);
    const createdProjeto = this.projetoAtviidadeRepository.create(projetoAtividade);
    return this.projetoAtviidadeRepository.save(createdProjeto);
  }
}
