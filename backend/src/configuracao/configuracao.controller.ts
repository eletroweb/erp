import { Controller, Put, Get, Body, Param } from "@nestjs/common";
import { ConfiguracaoService } from "./configuracao.service";
import { ConfiguracaoRequestDto } from "./configuracao.request.dto";
import { ConfiguracaoResponseDto } from "./configuracao.response.dto";
import { GetCurrentUser } from "src/auth/decorator/user.decorator";
import { UsuarioLogado } from "src/usuario/dto/usuario.response.dto";

@Controller('configuracoes')
export class ConfiguracaoController {
  constructor(private readonly configuracaoService: ConfiguracaoService) {}

  @Put()
  async updateNotificationSettings(    
    @GetCurrentUser () usuarioLogado: UsuarioLogado,    
    @Body() updateDto: ConfiguracaoRequestDto
  ): Promise<ConfiguracaoResponseDto> {    
    const updatedConfig = await this.configuracaoService.updateNotificationSettings(usuarioLogado, updateDto);
    return updatedConfig;
  }

  @Get()
  async getNotificationSettings(    
    @GetCurrentUser() usuarioLogado: UsuarioLogado
  ): Promise<ConfiguracaoResponseDto> {        
    const config = await this.configuracaoService.getNotificationSettings(usuarioLogado);
    return config;
  }
}
