import { Controller, Get, Param, NotFoundException, Body, Post, ParseUUIDPipe, Delete, Put } from "@nestjs/common";
import { ContratoService } from "./contrato.service";
import { ContratoResponseDto } from "./contrato.response.dto";
import { ContratoRequestDto } from "./contrato.request.dto";
import { ContratoEntity } from "./contrato.entity";
@Controller('contratos')
export class ContratoController {
  constructor(private readonly contratoService: ContratoService) { }

  @Get()
  async findAll(): Promise<ContratoResponseDto[]> {
    const contratos = await this.contratoService.findAll();
    const contratosDto: ContratoResponseDto[] = contratos.map(contrato => contrato.toDto());
    return contratosDto;
  }

@Get(':uuid')
async findOne(@Param('uuid') uuid: string): Promise<ContratoResponseDto> {
  const contrato = await this.contratoService.findOneByUuid(uuid);
  if (!contrato)
    throw new NotFoundException('Contrato não localizado');
  return contrato.toDto();
}

@Post()
async create(@Body() request: ContratoRequestDto): Promise<string> {
  const createdContrato = await this.contratoService.create(request);
  return JSON.stringify(createdContrato);
}


@Put(':uuid')
async update(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string, @Body() contratoEntity: ContratoEntity): Promise<string> {
  const updatedContrato = await this.contratoService.update(uuid, contratoEntity);
  return JSON.stringify(updatedContrato);
}

@Delete(':uuid')
async remove(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string): Promise<string> {
  const deletedContrato = await this.contratoService.remove(uuid);
  return JSON.stringify(deletedContrato);
}
}