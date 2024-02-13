// servico.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicoEntity } from './servico.entity';
import { Repository } from 'typeorm';
import { ServicoRequestDto } from './servico.request.dto';
import { SetorService } from 'src/setores/setor.service';

@Injectable()
export class ServicoService {
  constructor(
    @InjectRepository(ServicoEntity) 
    private servicoRepository: Repository<ServicoEntity>,
    private setorService: SetorService,
  ) { }

  async findAll(): Promise<ServicoEntity[]> {
    return this.servicoRepository.find();
  }

  async findOneByUuid(uuid: string): Promise<ServicoEntity> {
    const servico = await this.servicoRepository.findOne({ where: { uuid } });
    if (!servico) {
      throw new NotFoundException('Serviço não localizado');
    }
    return servico;
  }

  async create(request: ServicoRequestDto): Promise<ServicoEntity> {
    request.setor="a53c4e66-bd7b-11ee-8c1d-641c679a799a"
    const setor = await this.setorService.findOneByUuid(request.setor)
    const servico = ServicoEntity.fromRequestDto(request, setor);
    const createdServico = this.servicoRepository.create(servico);
    return this.servicoRepository.save(createdServico);
  }

  async update(uuid: string, request: ServicoEntity): Promise<ServicoEntity> {
    const setor = await this.findOneByUuid(uuid);
    const updatedServico = this.servicoRepository.merge(setor, request);
    await this.servicoRepository.save(updatedServico);
    return updatedServico;
  }

  async remove(uuid: string): Promise<ServicoEntity> {
    const servico = await this.findOneByUuid(uuid); // Verifica se o serviço existe
    return this.servicoRepository.remove(servico);
  }
}
