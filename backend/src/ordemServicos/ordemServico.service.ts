import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdemServicoEntity } from './ordemServico.entity';
import { OrdemServicoRequestDto } from './ordemServico.request.dto';
import { SetorService } from 'src/setores/setor.service';
import { ClienteService } from 'src/clientes/cliente.service';
import { OssService } from './oss.service';

@Injectable()
export class OrdemServicoService {
  constructor(
    @InjectRepository(OrdemServicoEntity)
    private ordemServicoRepository: Repository<OrdemServicoEntity>,
    private setorService: SetorService,
    private clienteService: ClienteService,
    private ossService: OssService,
  ) {}

  async findAll(): Promise<OrdemServicoEntity[]> {
    return this.ordemServicoRepository.find({
      relations: ['setor'],
      select: {
        setor: {
          uuid: true,
          descricao: true,
        },
      },
    });
  }

  async findOneByUuid(uuid: string): Promise<OrdemServicoEntity> {
    const ordemServico = await this.ordemServicoRepository.findOne({
      where: { uuid },
      relations: ['setor'],
    });
    if (!ordemServico) {
      throw new NotFoundException('Ordem de Serviço não localizado');
    }
    return ordemServico;
  }

  async create(request: OrdemServicoRequestDto): Promise<OrdemServicoEntity> {
    const setor = await this.setorService.findOneByUuid(request.setor);
    const cliente = await this.clienteService.findOneByUuid(request.cliente);

    const ordemServico = OrdemServicoEntity.fromRequestDto(
      request,
      cliente,
      setor,
    );
    const createdOrdemServico =
      this.ordemServicoRepository.create(ordemServico);
    return this.ordemServicoRepository.save(createdOrdemServico);
  }

  async update(
    uuid: string,
    request: OrdemServicoRequestDto,
  ): Promise<OrdemServicoEntity> {
    const osOrigin = await this.findOneByUuid(uuid);
    const setor = await this.setorService.findOneByUuid(request.setor);
    const cliente = await this.clienteService.findOneByUuid(request.cliente);

    await this.ossService.createMany(osOrigin, request.servicos);

    const osTarget = OrdemServicoEntity.fromRequestDto(request, cliente, setor);
    const updatedCliente = this.ordemServicoRepository.merge(
      osOrigin,
      osTarget,
    );
    await this.ordemServicoRepository.save(updatedCliente);
    return updatedCliente;
  }

  async remove(uuid: string): Promise<OrdemServicoEntity> {
    const ordemServico = await this.findOneByUuid(uuid); // Verifica se o serviço existe
    return this.ordemServicoRepository.remove(ordemServico);
  }
}
