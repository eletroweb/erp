// projeto.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjetoEntity } from './projeto.entity';
import { Repository } from 'typeorm';
import { ProjetoRequestDto } from './projeto.request.dto';
import { SetorService } from 'src/setores/setor.service';
import { ClienteService } from 'src/clientes/cliente.service';
import { UsuarioService } from 'src/usuarios/usuario.service';

@Injectable()
export class ProjetoService {
  constructor(
    @InjectRepository(ProjetoEntity) 
    private projetoRepository: Repository<ProjetoEntity>,
    private setorService: SetorService,
    private clienteService: ClienteService,
    private usuarioService: UsuarioService,
  ) { }

  async findAll(): Promise<ProjetoEntity[]> {
    return this.projetoRepository.find();
  }

  async findOneByUuid(uuid: string): Promise<ProjetoEntity> {
    const projeto = await this.projetoRepository.findOne({ where: { uuid } });
    if (!projeto) {
      throw new NotFoundException('Projeto not found');
    }
    return projeto;
  }

  async create(request: ProjetoRequestDto): Promise<ProjetoEntity> {
    const setor = await this.setorService.findOneByUuid(request.setor)
    const cliente = await this.clienteService.findOneByUuid(request.cliente)
    const responsavel = await this.usuarioService.findOneByUuid(request.responsavel)

    const projeto = ProjetoEntity.fromRequestDto(request, setor, cliente, responsavel);
    const createdProjeto = this.projetoRepository.create(projeto);
    return this.projetoRepository.save(createdProjeto);
  }

  async update(uuid: string, projetoEntity: ProjetoEntity): Promise<ProjetoEntity> {
    await this.findOneByUuid(uuid); // Verifica se o projeto existe
    const updatedProjeto = await this.projetoRepository.save({ ...projetoEntity, uuid });
    return updatedProjeto;
  }

  async remove(uuid: string): Promise<ProjetoEntity> {
    const projeto = await this.findOneByUuid(uuid); // Verifica se o projeto existe
    return this.projetoRepository.remove(projeto);
  }
}
