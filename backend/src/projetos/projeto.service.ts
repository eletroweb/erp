// projeto.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjetoEntity } from './projeto.entity';
import { Repository } from 'typeorm';
import { ProjetoRequestDto } from './projeto.request.dto';
import { SetorService } from 'src/setores/setor.service';
import { ClienteService } from 'src/clientes/cliente.service';
import { UsuarioService } from 'src/auth/usuarios/usuario.service';

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
    const projeto = await this.projetoRepository.findOne({
      where: { uuid },
      relations: ['setor', 'cliente'],
      select: {
      },
    });
    if (!projeto)
      throw new NotFoundException('Projeto não localizado');

    return projeto;
  }

  async create(request: ProjetoRequestDto): Promise<ProjetoEntity> {
    const setor = await this.setorService.findOneByUuid(request.setor)
    const cliente = await this.clienteService.findOneByUuid(request.cliente)
    const projeto = ProjetoEntity.fromRequestDto(request, setor, cliente);
    const createdProjeto = this.projetoRepository.create(projeto);
    return this.projetoRepository.save(createdProjeto);
  }

  async update(uuid: string, request: ProjetoRequestDto): Promise<ProjetoEntity> {
    // Recupera o projeto que esta sendo editado
    const projetoOrigin = await this.findOneByUuid(uuid);

    // Verifica se o setor informado existe e retorna
    const setor = await this.setorService.findOneByUuid(request.setor)

    // Verifica se o cliente informado existe e retorna
    const cliente = await this.clienteService.findOneByUuid(request.cliente)

    // Converte o request em uma Entity
    const projetoTarget = ProjetoEntity.fromRequestDto(request, setor, cliente);

    // Faz o merge entre a Entity enviada e existente no banco de dados.
    const updatedProjeto = this.projetoRepository.merge(projetoOrigin, projetoTarget);

    // Salva a Entity alterada no banco 
    await this.projetoRepository.save(updatedProjeto);

    // Retorna a Entity alterada
    return updatedProjeto;
  }

  async remove(uuid: string): Promise<ProjetoEntity> {
    const projeto = await this.findOneByUuid(uuid); // Verifica se o projeto existe
    return this.projetoRepository.remove(projeto);
  }
}
