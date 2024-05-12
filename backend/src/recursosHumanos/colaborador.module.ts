import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ColaboradorEntity } from "./colaborador.entity";
import { ColaboradorRepository } from "./colaborador.repository";
import { ColaboradorController } from "./colaborador.controller";
import { ColaboradorService } from "./colaborador.service";

@Module({
    imports: [TypeOrmModule.forFeature([ColaboradorEntity])],
    controllers: [ColaboradorController],
    providers: [ColaboradorService, ColaboradorRepository],
    exports: [ColaboradorService],
  })

  export class ColaboradorModule {}