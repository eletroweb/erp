import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfiguracaoEntity } from "./configuracao.entity";
import { ConfiguracaoRequestDto } from "./configuracao.request.dto";
import { ConfiguracaoResponseDto } from "./configuracao.response.dto";
import { EmpresaUsuarioService } from "src/empresa/empresausuario/empresa.usuario.service";
import { UsuarioLogado } from "src/usuario/dto/usuario.response.dto";

@Injectable()
export class ConfiguracaoService {
    constructor(
        @InjectRepository(ConfiguracaoEntity)
        private readonly configuracaoRepository: Repository<ConfiguracaoEntity>,
        @Inject(EmpresaUsuarioService) private empresaUsuarioService: EmpresaUsuarioService
    ) {}

    async updateNotificationSettings(
        usuarioLogado: UsuarioLogado,      
        updateDto: ConfiguracaoRequestDto
    ): Promise<ConfiguracaoResponseDto> {
        const { habilitado, dias } = updateDto.notificacoesDespesasPendentes;

        const empresa = await this.empresaUsuarioService.findAllByUsuarioLogado(usuarioLogado.sub);

        if(!empresa) {
            throw new NotFoundException('Empresa não encontrada para o usuário logado');
        }

        let configuracao = await this.configuracaoRepository.findOne({ where: { empresa: { id: empresa.id } } });

        if(!configuracao) {
            configuracao = this.configuracaoRepository.create({
                empresa: { id: empresa.id },
                notificarDespesaPendente: habilitado,
                notificarDespesaPendenteDias: dias,
            });            
        } else { //vai fazer com que a configuração existente sejam atualizadas.
            configuracao.notificarDespesaPendente = habilitado;
            configuracao.notificarDespesaPendenteDias = dias;
        }
        await this.configuracaoRepository.save(configuracao);
        return this.toResponseDto(configuracao);      
    }

    private toResponseDto(configuracao: ConfiguracaoEntity): ConfiguracaoResponseDto {
        return {
            uuid: configuracao.uuid,
            notificacoesDespesasPendentes: {
                habilitado: configuracao.notificarDespesaPendente,
                dias: configuracao.notificarDespesaPendenteDias,
            },
        };
    }

    async getNotificationSettings(usuarioLogado: UsuarioLogado): Promise<ConfiguracaoResponseDto> {
        const empresa = await this.empresaUsuarioService.findAllByUsuarioLogado(usuarioLogado.sub);
    
        if (!empresa) {
            throw new NotFoundException('Empresa não encontrada para o usuário logado');
        }
    
        let configuracao = await this.configuracaoRepository.findOne({
            where: { empresa: { id: empresa.id } },
        });   
        
        if (!configuracao) {
            configuracao = this.configuracaoRepository.create({
                empresa: { id: empresa.id },
                notificarDespesaPendente: true,
                notificarDespesaPendenteDias: 5,
            });
                
            await this.configuracaoRepository.save(configuracao);
        }    
        return this.toResponseDto(configuracao);
    }
    
}
