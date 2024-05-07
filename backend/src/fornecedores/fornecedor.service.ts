// cliente.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FornecedorEntity } from './fornecedor.entity';
import { Repository } from 'typeorm';
import { FornecedorRequestDto } from './fornecedor.request.dto';


@Injectable()
export class FornecedorService {
  constructor(
    @InjectRepository(FornecedorEntity) 
    private fornecedorRepository: Repository<FornecedorEntity>,
  ) { }

  async findAll(): Promise<FornecedorEntity[]> {
    return this.fornecedorRepository.find();
  }

  async findOneByUuid(uuid: string): Promise<FornecedorEntity> {
    const fornecedor = await this.fornecedorRepository.findOne({
      where: { uuid },      
    });
    if (!fornecedor) {
      throw new NotFoundException('Fornecedor não localizado');
    }
    return fornecedor;
  }  
  
  async findByDocumento(documento: string): Promise<FornecedorEntity> {
    return await this.fornecedorRepository.findOne({ where: { documento } });
  }

  async create(request: FornecedorRequestDto): Promise<FornecedorEntity> {
    const fornecedor = FornecedorEntity.fromRequestDto(request);
    const createdFornecedor = this.fornecedorRepository.create(fornecedor);
    return this.fornecedorRepository.save(createdFornecedor);
  }

  async update(uuid: string, request: FornecedorRequestDto): Promise<FornecedorEntity> {
    const fornecedorOrigin = await this.findOneByUuid(uuid);
    const fornecedorTarget = FornecedorEntity.fromRequestDto(request);
    const updatedFornecedor = this.fornecedorRepository.merge(fornecedorOrigin, fornecedorTarget);
    await this.fornecedorRepository.save(updatedFornecedor);
    return updatedFornecedor;
  }

  async remove(uuid: string): Promise<FornecedorEntity> {
    const fornecedor = await this.findOneByUuid(uuid); 
    return this.fornecedorRepository.remove(fornecedor);
  }

  async findByEmail(email: string): Promise<string> {
    const fornecedor = await this.fornecedorRepository.findOne({where: {email}})
    if (fornecedor)
      return  `Já existe um fornecedor com este email ${fornecedor.email}`
  }
}
