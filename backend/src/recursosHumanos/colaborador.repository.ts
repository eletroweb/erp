import { EntityRepository, Repository } from "typeorm";
import { ColaboradorEntity } from "./colaborador.entity";

@EntityRepository(ColaboradorEntity)
export class ColaboradorRepository extends Repository<ColaboradorEntity> {}