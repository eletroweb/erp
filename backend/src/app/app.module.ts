import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { SetorModule } from '../setores/setor.module';
import { ClienteModule } from '../clientes/cliente.module';
import { ProjetoModule } from 'src/projetos/projeto.module';
import { ContratoModule } from 'src/contratos/contrato.module';
import { ServicoModule } from 'src/servicos/servico.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrdemServicoModule } from 'src/ordemServicos/ordemServico.module';
import { FinanceiroModule } from 'src/financeiro/financeiro.module';
import { ColaboradorModule } from 'src/recursosHumanos/colaborador.module';
import { FornecedorModule } from 'src/fornecedores/fornecedor.module';
import configuration from 'src/config/configuration';
import { AuthModule } from 'src/auth/auth.module';
import { ModuloModule } from 'src/app/modulo/modulo.module';
import { EmpresaModule } from 'src/empresa/empresa.module';
import { EmpresaUsuarioModule } from 'src/empresa/empresausuario/empresa.usuario.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dbConfig = configService.get('database');
        return { ...dbConfig };
      },
      inject: [ConfigService],
    }),
    ModuloModule,
    AuthModule,
    SetorModule,
    ClienteModule,
    ProjetoModule,
    ContratoModule,
    ServicoModule,
    OrdemServicoModule,
    FinanceiroModule,
    ColaboradorModule,
    FornecedorModule,
    EmpresaModule,
    UsuarioModule,
    EmpresaUsuarioModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
