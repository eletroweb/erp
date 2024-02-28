// cliente.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContratoEntity } from './contrato.entity';
import { ContratoRequestDto } from './contrato.request.dto';

@Injectable()
export class ContratoService {
  constructor(
    @InjectRepository(ContratoEntity) 
    private contratoRepository: Repository<ContratoEntity>
  ) { }

  async findAll(): Promise<ContratoEntity[]> {
    return this.contratoRepository.find();
  }

  async findOneByUuid(uuid: string): Promise<ContratoEntity> {
    const contrato = await this.contratoRepository.findOne({
      where: { uuid }
    });
    if (!contrato) {
      throw new NotFoundException('Contrato não localizado');
    }
    return contrato;
  }  
 
  async findByDocumento(documento: string): Promise<ContratoEntity> {
    const contrato = await this.contratoRepository.findOne({ where: { documento } });
    if (!contrato) {
      throw new NotFoundException(`CPF/CNPJ ${documento} não localizado`);
    }
    return contrato;
  }

  async create(request: ContratoRequestDto): Promise<ContratoEntity> {
    const contrato = ContratoEntity.fromRequestDto(request);
    const createdContrato = this.contratoRepository.create(contrato);
    return this.contratoRepository.save(createdContrato);
  }

  async update(uuid: string, request: ContratoEntity): Promise<ContratoEntity> {
    const setor = await this.findOneByUuid(uuid);
    const updatedContrato = this.contratoRepository.merge(setor, request);
    await this.contratoRepository.save(updatedContrato);
    return updatedContrato;
  }

  async remove(uuid: string): Promise<ContratoEntity> {
    const contrato = await this.findOneByUuid(uuid); // Verifica se o cliente existe
    return this.contratoRepository.remove(contrato);
  }
}