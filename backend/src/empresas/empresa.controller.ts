import { Controller, Get, Post, Put, Body, Param, HttpException } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { EmpresaRequestDto } from './empresa.request.dto';
import { EmpresaResponseDto } from './empresa.response.dto';
import { Roles } from 'src/config/roles.decorator';

@Controller('empresas')
export class EmpresaController {
  constructor(
    private readonly empresaService: EmpresaService,
  ) {}

  @Get()
  @Roles({ roles: ['MASTER', 'EMPRESA_EXIBIR'] })
  async findAll(): Promise<EmpresaResponseDto[]> {
    try {
      const empresas = await this.empresaService.findAll();
      return empresas.map(empresa => empresa.toDto());
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Get(':uuid')
  @Roles({ roles: ['MASTER', 'EMPRESA_EXIBIR'] })
  async findOne(@Param('uuid') uuid: string): Promise<EmpresaResponseDto> {
    try {
      const empresa = await this.empresaService.findOneByUuid(uuid);
      return empresa.toDto();
    } catch (error) {
      throw new HttpException(error.message, error.status || 404);
    }
  }

  @Post()
  @Roles({ roles: ['MASTER', 'EMPRESA_CADASTRAR'] })
  async create(@Body() request: EmpresaRequestDto, userId: number): Promise<string> {
    try {
      return await this.empresaService.create(request, userId);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Put(':uuid')
  @Roles({ roles: ['MASTER', 'EMPRRESA_EDITAR'] })
  async update(
    @Param('uuid') uuid: string,
    @Body() request: EmpresaRequestDto,
  ): Promise<EmpresaResponseDto> {
    try {
      const updatedEmpresa = await this.empresaService.updateByUuid(uuid, request);
      return updatedEmpresa.toDto();
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}