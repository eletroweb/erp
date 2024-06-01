import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ColaboradorEntity } from "./colaborador.entity";
import { ColaboradorRepository } from "./colaborador.repository";
import { ColaboradorController } from "./colaborador.controller";
import { ColaboradorService } from "./colaborador.service";
import { CargoEntity } from "./cargo.entity";
import { CargoRepository } from "./cargo.repository";

@Module({
    imports: [TypeOrmModule.forFeature([ColaboradorEntity, CargoEntity])],
    controllers: [ColaboradorController],
    providers: [ColaboradorService, ColaboradorRepository, CargoEntity, CargoRepository],
    exports: [ColaboradorService],
  })

  export class ColaboradorModule {}