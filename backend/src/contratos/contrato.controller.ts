/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Param,
    NotFoundException,
    Body,
    Post,
    ParseUUIDPipe,
    Delete,
    Put
} from "@nestjs/common";
import {ContratoService} from "./contrato.service";
import {ContratoResponseDto} from "./contrato.response.dto";
import {ContratoRequestDto} from "./contrato.request.dto";
import {ContratoEntity} from "./contrato.entity";
import { Roles } from "src/config/roles.decorator";

@Controller('contratos')
export class ContratoController {
    constructor(private readonly contratoService: ContratoService) {
    }

    @Get()
    @Roles({ roles: ["MASTER","CONTRATO_LISTAR"] })
    async findAll(): Promise<ContratoResponseDto[]> {
        const contratos = await this.contratoService.findAll();
        const contratosDto: ContratoResponseDto[] = contratos.map(contrato => contrato.toDto());
        return contratosDto;
    }

    @Get(':uuid')
    @Roles({ roles: ["MASTER","CONTRATO_EXIBIR"] })
    async findOne(@Param('uuid') uuid: string): Promise<ContratoResponseDto> {
        const contrato = await this.contratoService.findOneByUuid(uuid);
        if (!contrato)
            throw new NotFoundException('Contrato não localizado');
        return contrato.toDto();
    }

    @Post()
    @Roles({ roles: ["MASTER","CONTRATO_CADASTRAR"] })
    async create(@Body() request: ContratoRequestDto): Promise<string> {
        const createdContrato = await this.contratoService.create(request);
        return JSON.stringify(createdContrato);
    }

    @Put(':uuid')
    @Roles({ roles: ["MASTER","CONTRATO_EDITAR"] })
    async update(@Param('uuid', new ParseUUIDPipe({version: '4'})) uuid: string, @Body() contratoEntity: ContratoEntity): Promise<string> {
        const updatedContrato = await this.contratoService.update(uuid, contratoEntity);
        return JSON.stringify(updatedContrato);
    }

    @Delete(':uuid')
    @Roles({ roles: ["MASTER","CONTRATO_EXCLUIR"] })
    async remove(@Param('uuid') uuid: string): Promise<string> {
        const deletedContrato = await this.contratoService.remove(uuid);
        return JSON.stringify(deletedContrato);
    }
}