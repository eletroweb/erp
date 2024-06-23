import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresaRepository } from './empresa.repository';
import { EmpresaUsuarioEntity } from './empresa.usuario.entity';
import { EmpresaEntity } from './empresa.entity';
import { EmpresaController } from './empresa.controller';
import { EmpresaService } from './empresa.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([EmpresaEntity, EmpresaUsuarioEntity]),
  ],
  controllers: [EmpresaController],
  providers: [EmpresaService, EmpresaRepository, EmpresaUsuarioEntity],
  exports: [EmpresaService],
})
export class EmpresaModule {}
