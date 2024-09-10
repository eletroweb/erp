import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ColaboradorEntity } from "./colaborador.entity";
import { Not, Repository } from "typeorm";
import { ColaboradorRequestDto } from "./colaborador.request.dto";
import { CargoEntity } from "./cargo.entity";
import { CargoRequestDto } from "./cargo.request.dto";
import { EmpresaUsuarioService } from "src/empresa/empresausuario/empresa.usuario.service";
import { UsuarioLogado } from "src/usuario/dto/usuario.response.dto";

@Injectable()
export class ColaboradorService {
  constructor(
    @InjectRepository(ColaboradorEntity)
    private colaboradorRepository: Repository<ColaboradorEntity>,

    @InjectRepository(CargoEntity)
    private cargoRepository: Repository<CargoEntity>,

    @Inject(EmpresaUsuarioService)
    private empresaUsuarioService: EmpresaUsuarioService,
  ) {}

  async findAll(
    usuarioLogado: UsuarioLogado,
  ): Promise<ColaboradorEntity[]> {
    const empresa = await this.empresaUsuarioService.findAllByUsuarioLogado(usuarioLogado.sub);
    if(!empresa) {
      throw new NotFoundException('Empresa não encontrada para o usuário logado');
    }
    let queryBuilder = this.colaboradorRepository.createQueryBuilder('colaborador')
      .where('colaborador.empresa_id = :empresaId', {empresaId: empresa.id});

    return queryBuilder.getMany();
  }

  async findOneByUuid(uuid: string): Promise<ColaboradorEntity> {
    const colaborador = await this.colaboradorRepository.findOne({
      where: { uuid },
    });
    if (!colaborador) {
      throw new NotFoundException('Colaborador não localizado');
    }
    return colaborador;
  }

  async findByDocumento(documento: string): Promise<ColaboradorEntity> {
    return await this.colaboradorRepository.findOne({ where: { documento } });
  }

  async create(
    request: ColaboradorRequestDto,
    usuarioLogado: UsuarioLogado,
  ): Promise<ColaboradorEntity> {
    const empresa = await this.empresaUsuarioService.findAllByUsuarioLogado(usuarioLogado.sub);
    if(!empresa){
      throw new NotFoundException('Empresa não encontrada para o usuário logado')
    }
    const colaborador = ColaboradorEntity.fromRequestDto(request);
    colaborador.empresa = empresa;
    const createdColaborador = this.colaboradorRepository.create(colaborador);
    return this.colaboradorRepository.save(createdColaborador);
  }

  async update(
    uuid: string,
    request: ColaboradorRequestDto,
  ): Promise<ColaboradorEntity> {
    const colaboradorOrigin = await this.findOneByUuid(uuid);
    const colaboradorTarget = ColaboradorEntity.fromRequestDto(request);
    const updatedColaborador = this.colaboradorRepository.merge(
      colaboradorOrigin,
      colaboradorTarget,
    );
    await this.colaboradorRepository.save(updatedColaborador);
    return updatedColaborador;
  }

  async remove(uuid: string): Promise<ColaboradorEntity> {
    const colaborador = await this.findOneByUuid(uuid);
    return this.colaboradorRepository.remove(colaborador);
  }

  async findByEmail(email: string): Promise<string> {
    const colaborador = await this.colaboradorRepository.findOne({
      where: { email },
    });
    if (colaborador)
      return `Já existe um colaborador com este email ${colaborador.email}`;
  } 

  /*return all Office in repository*/
  async findAllOffice(): Promise<CargoEntity[]> {
    return this.cargoRepository.find();
  }
  
  /*find for name Office end return your name*/
  async findByNameOffice(nome: string): Promise<string> {
    const cargo = await this.cargoRepository.findOne({ where: { nome } });
    if (cargo)
      return `${cargo.nome} já cadastrado!`
  }

  async createOffice(request: CargoRequestDto): Promise<CargoEntity> {
    const cargo = CargoEntity.fromRequestDto(request);
    const createdCargo = this.cargoRepository.create(cargo);
    return this.cargoRepository.save(createdCargo);
  }  
}
