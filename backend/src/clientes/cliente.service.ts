// cliente.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteEntity } from './cliente.entity';
import { ClienteCreateDto } from './dto/cliente.create.dto';
import { Like, Repository } from 'typeorm';
import { SetorService } from 'src/setores/setor.service';
import { ClienteUpdateDto } from './dto/cliente.update.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(ClienteEntity) 
    private clienteRepository: Repository<ClienteEntity>,
    private setorService: SetorService,
  ) { }

  async findAll(nome?: string, documento?: string, situacao?: string): Promise<ClienteEntity[]> {
    let queryBuilder = this.clienteRepository.createQueryBuilder("cliente");

    if (nome)
        queryBuilder = queryBuilder.where("cliente.nome LIKE :nome", { nome: `%${nome}%` });

    if (documento)
        queryBuilder = queryBuilder.andWhere("cliente.documento LIKE :documento", { documento: `%${documento}%` });

    if (situacao) {
      const situacaoFiltro = situacao == 'true' ? 1 : 0
      queryBuilder = queryBuilder.andWhere("cliente.situacao = :situacao", { situacao: `${situacaoFiltro}` });
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

  async create(request: ClienteCreateDto): Promise<ClienteEntity> {
    const setor = await this.setorService.findOneByUuid(request.setor)
    const cliente = ClienteEntity.fromRequestDto(request, setor);
    const createdCliente = this.clienteRepository.create(cliente);
    return this.clienteRepository.save(createdCliente);
  }

  async update(uuid: string, request: ClienteUpdateDto): Promise<ClienteEntity> {
    const clienteOrigin = await this.findOneByUuid(uuid);
    const setor = await this.setorService.findOneByUuid(request.setor)
    const clienteTarget = ClienteEntity.fromRequestDto(request, setor);
    const updatedCliente = this.clienteRepository.merge(clienteOrigin, clienteTarget);
    await this.clienteRepository.save(updatedCliente);
    return updatedCliente;
  }

  async remove(uuid: string): Promise<ClienteEntity> {
    const cliente = await this.findOneByUuid(uuid); // Verifica se o cliente existe
    return this.clienteRepository.remove(cliente);
  }

  async findByEmail(email: string): Promise<string> {
    const cliente = await this.clienteRepository.findOne({where: {email}})
    if (cliente)
      return  `Já existe um cliente com este email ${cliente.email}`
  }
}
