import { Injectable, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SetorEntity } from './setor.entity';
import { Repository } from 'typeorm';
import { DescricaoSpecification } from './specification/DescricaoSpecification';
import { SituacaoSpecification } from './specification/SituacaoSpecification';


@Injectable()
export class SetorService {
  constructor(
    @InjectRepository(SetorEntity)
    private setorRepository: Repository<SetorEntity>,
  ) {}

  async findAll(
    descricao: string,
    situacao: string,
   ): Promise<SetorEntity[]> {
    const consulta = this.setorRepository.createQueryBuilder('setor');

    if (descricao) { new DescricaoSpecification(descricao).apply(consulta)};
    if (situacao) { new SituacaoSpecification(situacao).apply(consulta)};
    return consulta.getMany();
  }

  async findOneByUuid(uuid: string): Promise<SetorEntity> {
    const setor = await this.setorRepository.findOne({ where: { uuid } });
    if (!setor) {
      throw new NotFoundException('Setor não localizado');
    }
    return setor;
  }

  async create(setorEntity: SetorEntity): Promise<SetorEntity> {
    const createdSetor = this.setorRepository.create(setorEntity);
    return this.setorRepository.save(createdSetor);
  }

  async update(uuid: string, request: SetorEntity): Promise<SetorEntity> {
    const setor = await this.findOneByUuid(uuid);
    const updatedSetor = this.setorRepository.merge(setor, request);
    await this.setorRepository.save(updatedSetor);
    return updatedSetor;
  }

  async remove(uuid: string): Promise<SetorEntity> {
    const setor = await this.findOneByUuid(uuid); // Verifica se o setor existe
    return this.setorRepository.remove(setor);
  }
}
