import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteEntity } from './cliente.entity';
import { Repository } from 'typeorm';
import { SetorService } from 'src/setores/setor.service';
import { ClienteRequestDto } from './cliente.request.dto';
import { UsuarioLogado } from 'src/usuario/dto/usuario.response.dto';
import { EmpresaUsuarioService } from 'src/empresa/empresausuario/empresa.usuario.service';


@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(ClienteEntity)
    private clienteRepository: Repository<ClienteEntity>,
    private setorService: SetorService,
    @Inject(EmpresaUsuarioService) private empresaUsuarioService: EmpresaUsuarioService
  ) {}

  async findAll(
    usuarioLogado: UsuarioLogado,    
    nome?: string,
    documento?: string,
    situacao?: string,
  ): Promise<ClienteEntity[]> {
    const empresa = await this.empresaUsuarioService.findAllByUsuarioLogado(usuarioLogado.sub);
    if(!empresa) {
      throw new NotFoundException('Empresa não encontrada para o usuário logado');
    }
    let queryBuilder = this.clienteRepository.createQueryBuilder('cliente')
      .where('cliente.empresa_id = :empresaId', {empresaId: empresa.id});

    if (nome)
      queryBuilder = queryBuilder.where('cliente.nome LIKE :nome', {
        nome: `%${nome}%`,
      });

    if (documento)
      queryBuilder = queryBuilder.andWhere(
        'cliente.documento LIKE :documento',
        { documento: `%${documento}%` },
      );

    if (situacao) {
      const situacaoFiltro = situacao == 'true' ? 1 : 0;
      queryBuilder = queryBuilder.andWhere('cliente.situacao = :situacao', {
        situacao: `${situacaoFiltro}`,
      });
    }

    return queryBuilder.getMany();
  }

  async findOneByUuid(uuid: string): Promise<ClienteEntity> {
    const cliente = await this.clienteRepository.findOne({
      where: { uuid },
      relations: ['setor'],
      select: {
        setor: {
          uuid: true,
          descricao: true,
        },
      },
    });
    if (!cliente) {
      throw new NotFoundException('Cliente não localizado');
    }
    return cliente;
  }

  async findByDocumento(documento: string): Promise<ClienteEntity> {
    return await this.clienteRepository.findOne({ where: { documento } });
  }

  async create(
    request: ClienteRequestDto,
    usuarioLogado: UsuarioLogado,
  ): Promise<ClienteEntity> {
    const empresa = await this.empresaUsuarioService.findAllByUsuarioLogado(usuarioLogado.sub);
    if(!empresa) {
      throw new NotFoundException('Empresa não encontrada para o usuário logado');
    }

    const setor = await this.setorService.findOneByUuid(request.setor);
    const cliente = ClienteEntity.fromRequestDto(request, setor);
    cliente.empresa = empresa;
    const createdCliente = this.clienteRepository.create(cliente);
    return this.clienteRepository.save(createdCliente);
  }

  async update(
    uuid: string,
    request: ClienteRequestDto,
  ): Promise<ClienteEntity> {
    const clienteOrigin = await this.findOneByUuid(uuid);
    const setor = await this.setorService.findOneByUuid(request.setor);
    const clienteTarget = ClienteEntity.fromRequestDto(request, setor);
    const updatedCliente = this.clienteRepository.merge(
      clienteOrigin,
      clienteTarget,
    );
    await this.clienteRepository.save(updatedCliente);
    return updatedCliente;
  }

  async remove(uuid: string): Promise<ClienteEntity> {
    const cliente = await this.findOneByUuid(uuid);
    return this.clienteRepository.remove(cliente);
  }

  async findByEmail(email: string): Promise<string> {
    const cliente = await this.clienteRepository.findOne({ where: { email } });
    if (cliente) return `Já existe um cliente com este email ${cliente.email}`;
  }
}
