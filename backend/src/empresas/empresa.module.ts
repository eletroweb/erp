import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresaService } from './empresa.service';
import { EmpresaController } from './empresa.controller';
import { EmpresaEntity } from './empresa.entity';
import { UsuarioEntity } from 'src/auth/usuarios/usuario.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmpresaEntity, UsuarioEntity]),
    AuthModule,
  ],
  providers: [EmpresaService],
  controllers: [EmpresaController],
})
export class EmpresaModule {}
