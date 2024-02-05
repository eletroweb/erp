// setor.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SetorRepository } from './setor.repository';
import { SetorEntity } from './setor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SetorService {
  constructor(
    @InjectRepository(SetorEntity) private setorRepository: Repository<SetorEntity>,
  ) { }

  async findAll(): Promise<SetorEntity[]> {
    return this.setorRepository.find();
  }

  async findOneByUuid(uuid: string): Promise<SetorEntity> {
    const setor = await this.setorRepository.findOne({ where: { uuid } });
    if (!setor) {
      throw new NotFoundException('Setor not found');
    }
    return setor;
  }

  async create(setorEntity: SetorEntity): Promise<SetorEntity> {
    const createdSetor = this.setorRepository.create(setorEntity);
    return this.setorRepository.save(createdSetor);
  }

  async update(uuid: string, setorEntity: SetorEntity): Promise<SetorEntity> {
    await this.findOneByUuid(uuid); // Verifica se o setor existe
    const updatedSetor = await this.setorRepository.save({ ...setorEntity, uuid });
    return updatedSetor;
  }

  async remove(uuid: string): Promise<SetorEntity> {
    const setor = await this.findOneByUuid(uuid); // Verifica se o setor existe
    return this.setorRepository.remove(setor);
  }
}
