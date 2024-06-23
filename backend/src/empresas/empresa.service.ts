import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { EmpresaRequestDto } from './empresa.request.dto';
import { EmpresaEntity } from './empresa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(EmpresaEntity)
    private readonly empresaRepository: Repository<EmpresaEntity>,
  ) {}

  async findAll(): Promise<EmpresaEntity[]> {
    return this.empresaRepository.find();
  }

  async findOneByUuid(uuid: string): Promise<EmpresaEntity> {
    const empresa = await this.empresaRepository.findOne({ where: { uuid } });
    if (!empresa) {
      throw new NotFoundException('Empresa não localizada');
    }
    return empresa;
  }

  async create(request: EmpresaRequestDto, userId: number): Promise<string> {
    const existingEmpresa = await this.empresaRepository.count();
    if (existingEmpresa > 0) {
      throw new ConflictException('Já existe uma empresa cadastrada');
    }
    const empresa = this.empresaRepository.create(request);
    await this.empresaRepository.save(empresa);
    return 'Empresa cadastrada com sucesso';
  }

  async updateByUuid(uuid: string, request: EmpresaRequestDto): Promise<EmpresaEntity> {
    const empresa = await this.findOneByUuid(uuid);
    Object.assign(empresa, request);
    return this.empresaRepository.save(empresa);
  }
}