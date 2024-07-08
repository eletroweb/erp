import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SetorEntity } from './setor.entity';
import { Repository } from 'typeorm';
import { DescricaoSpecification } from './specification/DescricaoSpecification';
import { SituacaoSpecification } from './specification/SituacaoSpecification';
import { UsuarioLogado } from 'src/usuario/dto/usuario.response.dto';
import { EmpresaUsuarioService } from 'src/empresa/empresausuario/empresa.usuario.service';
import { EmpresaSpecification } from './specification/EmpresaSpecification';


@Injectable()
export class SetorService {
  constructor(
    @InjectRepository(SetorEntity)
    private setorRepository: Repository<SetorEntity>,
    @Inject(EmpresaUsuarioService) private empresaUsuarioService: EmpresaUsuarioService
  ) {}

  async findAll(
    usuarioLogado: UsuarioLogado,
    descricao: string,
    situacao: string,
   ): Promise<SetorEntity[]> {
    const consulta = this.setorRepository.createQueryBuilder('setor');

    if (descricao) { new DescricaoSpecification(descricao).apply(consulta)};
    if (situacao) { new SituacaoSpecification(situacao).apply(consulta)};
    
    const empresa = await this.empresaUsuarioService.findAllByUsuarioLogado(usuarioLogado.sub);
    new EmpresaSpecification(empresa).apply(consulta);

    return consulta.getMany();
  }

  async findOneByUuid(uuid: string): Promise<SetorEntity> {
    const setor = await this.setorRepository.findOne({ where: { uuid } });
    if (!setor) {
      throw new NotFoundException('Setor não localizado');
    }
    return setor;
  }

  async create(
    setorEntity: SetorEntity,
    usuarioLogado: UsuarioLogado
  ): Promise<SetorEntity> {
    const empresa = await this.empresaUsuarioService.findAllByUsuarioLogado(usuarioLogado.sub);
    setorEntity.empresa = empresa;
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
