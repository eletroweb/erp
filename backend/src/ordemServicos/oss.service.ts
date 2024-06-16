import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OssEntity } from './oss.entity';
import { OrdemServicoEntity } from './ordemServico.entity';
import { SituacaoEnum } from 'src/enum/situacao.enum';
import { OssRequestDto } from './oss.request.dto';
import { ServicoService } from 'src/servicos/servico.service';

@Injectable()
export class OssService {
  constructor(
    @InjectRepository(OssEntity)
    private repository: Repository<OssEntity>,
    private servicoService: ServicoService,
  ) {}

  async createMany(
    ordem_servico: OrdemServicoEntity,
    items: OssRequestDto[],
  ): Promise<void> {
    const promises: Promise<OssEntity>[] = [];

    const existingOssEntities = await this.repository.find({
      where: { ordem_servico: { id: ordem_servico.id } },
    });

    for (const item of items) {
      const existingOssEntity = existingOssEntities.find(
        (oss) => oss.servico_id.uuid === item.servico,
      );

      const servico = await this.servicoService.findOneByUuid(item.servico);

      if (existingOssEntity) {
        existingOssEntity.quantidade = item.quantidade;
        existingOssEntity.situacao = item.situacao
          ? SituacaoEnum.ATIVO
          : SituacaoEnum.INATIVO;
        promises.push(this.repository.save(existingOssEntity));
      } else {
        const ossEntity = new OssEntity();
        ossEntity.ordem_servico = ordem_servico;
        ossEntity.servico_id = servico;
        ossEntity.quantidade = item.quantidade;
        ossEntity.situacao = item.situacao
          ? SituacaoEnum.ATIVO
          : SituacaoEnum.INATIVO;
        promises.push(this.repository.save(ossEntity));
      }
    }

    await Promise.all(
      await this.removerOssResidual(promises, existingOssEntities, items),
    );
  }

  async removerOssResidual(
    promises: Promise<OssEntity>[],
    existingOssEntities: OssEntity[],
    items: OssRequestDto[],
  ): Promise<Promise<OssEntity>[]> {
    const ossUuidsToUpdate = items.map((item) => item.servico);

    for (const existingOssEntity of existingOssEntities) {
      if (!ossUuidsToUpdate.includes(existingOssEntity.servico_id.uuid)) {
        promises.push(this.repository.remove(existingOssEntity));
      }
    }

    return promises;
  }
}
