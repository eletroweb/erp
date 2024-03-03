// servico.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicoEntity } from './servico.entity';
import { Repository } from 'typeorm';
import { ServicoRequestDto } from './servico.request.dto';
import { SetorService } from 'src/setores/setor.service';
import { ContratoService } from 'src/contratos/contrato.service';

@Injectable()
export class ServicoService {
  constructor(
    @InjectRepository(ServicoEntity) 
    private servicoRepository: Repository<ServicoEntity>,
    private setorService: SetorService,
    private contratoService: ContratoService
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
    const setor = await this.setorService.findOneByUuid(request.setor)
    const contrato = await this.contratoService.findOneByUuid(request.contrato)
    const servico = ServicoEntity.fromRequestDto(request, setor, contrato);
    const createdServico = this.servicoRepository.create(servico);
    return this.servicoRepository.save(createdServico);
  }

  async update(uuid: string, request: ServicoRequestDto): Promise<ServicoEntity> {
    const servicoOrigin = await this.findOneByUuid(uuid);
    const setor = await this.setorService.findOneByUuid(request.setor)
    const contrato = await this.contratoService.findOneByUuid(request.contrato)
    const servicoTarget = ServicoEntity.fromRequestDto(request, setor, contrato);
    const updatedServico = this.servicoRepository.merge(servicoOrigin, servicoTarget);
    await this.servicoRepository.save(updatedServico);
    return updatedServico;
  }

  async remove(uuid: string): Promise<ServicoEntity> {
    const servico = await this.findOneByUuid(uuid); // Verifica se o serviço existe
    return this.servicoRepository.remove(servico);
  }
}
