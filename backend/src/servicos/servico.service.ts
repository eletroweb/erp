3; // servico.service.ts
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
    private contratoService: ContratoService,
  ) {}

  async findAll(
    descricao?: string,
    situacao?: string,
  ): Promise<ServicoEntity[]> {
    //return this.servicoRepository.find({relations: ['contrato', 'setor']});
    let queryBuilder = this.servicoRepository.createQueryBuilder('servicos');

    if (descricao)
      queryBuilder = queryBuilder.where('servicos.descricao LIKE :descricao', {
        descricao: `%${descricao}%`,
      });

    if (situacao) {
      const situacaoFiltro = situacao == 'true' ? 1 : 0;
      queryBuilder = queryBuilder.andWhere('servicos.situacao = :situacao', {
        situacao: `${situacaoFiltro}`,
      });
    }

    return queryBuilder.getMany();
  }

  async findOneByUuid(uuid: string): Promise<ServicoEntity> {
    const servico = await this.servicoRepository.findOne({
      where: { uuid },
      relations: ['contrato', 'setor'],
      select: {
        id: true,
        uuid: true,
        descricao: true,
        situacao: true,
        valor: true,
        contrato: {
          uuid: true,
          descricao: true,
        },
        setor: {
          uuid: true,
          descricao: true,
        },
      },
    });
    if (!servico) {
      throw new NotFoundException('Serviço não localizado');
    }
    return servico;
  }

  async create(request: ServicoRequestDto): Promise<ServicoEntity> {
    const setor = await this.setorService.findOneByUuid(request.setor);
    const contrato = await this.contratoService.findOneByUuid(request.contrato);
    const servico = ServicoEntity.fromRequestDto(request, setor, contrato);
    const createdServico = this.servicoRepository.create(servico);
    return this.servicoRepository.save(createdServico);
  }

  async update(
    uuid: string,
    request: ServicoRequestDto,
  ): Promise<ServicoEntity> {
    const servicoOrigin = await this.findOneByUuid(uuid);
    const setor = await this.setorService.findOneByUuid(request.setor);
    const contrato = await this.contratoService.findOneByUuid(request.contrato);
    const servicoTarget = ServicoEntity.fromRequestDto(
      request,
      setor,
      contrato,
    );
    const updatedServico = this.servicoRepository.merge(
      servicoOrigin,
      servicoTarget,
    );
    await this.servicoRepository.save(updatedServico);
    return updatedServico;
  }

  async remove(uuid: string): Promise<ServicoEntity> {
    const servico = await this.findOneByUuid(uuid); // Verifica se o serviço existe
    return this.servicoRepository.remove(servico);
  }
}
