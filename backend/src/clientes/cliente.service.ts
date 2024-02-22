// cliente.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteEntity } from './cliente.entity';
import { Repository } from 'typeorm';
import { ClienteRequestDto } from './cliente.request.dto';
import { SetorService } from 'src/setores/setor.service';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(ClienteEntity) 
    private clienteRepository: Repository<ClienteEntity>,
    private setorService: SetorService,
  ) { }

  async findAll(): Promise<ClienteEntity[]> {
    return this.clienteRepository.find();
  }

  async findOneByUuid(uuid: string): Promise<ClienteEntity> {
    const cliente = await this.clienteRepository.findOne({
      where: { uuid },
      relations: ['setor']
    });
    if (!cliente) {
      throw new NotFoundException('Cliente não localizado');
    }
    return cliente;
  }  
  
  async findByDocumento(documento: string): Promise<ClienteEntity> {
    const cliente = await this.clienteRepository.findOne({ where: { documento } });
    if (!cliente) {
      throw new NotFoundException(`CPF/CNPJ ${documento} não localizado`);
    }
    return cliente;
  }

  async create(request: ClienteRequestDto): Promise<ClienteEntity> {
    const setor = await this.setorService.findOneByUuid(request.setor)
    const cliente = ClienteEntity.fromRequestDto(request, setor);
    const createdCliente = this.clienteRepository.create(cliente);
    return this.clienteRepository.save(createdCliente);
  }

  async update(uuid: string, request: ClienteEntity): Promise<ClienteEntity> {
    const setor = await this.findOneByUuid(uuid);
    const updatedCliente = this.clienteRepository.merge(setor, request);
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
