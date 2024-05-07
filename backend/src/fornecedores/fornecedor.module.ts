import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FornecedorEntity } from "./fornecedor.entity";
import { FornecedorRepository } from "./fornecedor.repository";
import { FornecedorCortroller } from "./fornecedor.controller";
import { FornecedorService } from "./fornecedor.service";

@Module({
    imports: [TypeOrmModule.forFeature([FornecedorEntity])],
    controllers: [FornecedorCortroller],
    providers: [FornecedorService, FornecedorRepository],
    exports: [FornecedorService],
})

export class FornecedorModule {}