import { Controller, Get, Param, ParseUUIDPipe, Post, Body, Put, Delete, NotFoundException} from "@nestjs/common";
import { FornecedorService } from './fornecedor.service';
import { FornecedorResponseDto } from './fornecedor.response.dto';
import { FornecedorRequestDto } from './fornecedor.request.dto';
import { Roles } from 'nest-keycloak-connect';

@Controller('fornecedores')
export class FornecedorController {
    constructor(private readonly fornecedorService: FornecedorService) { }

    @Get()
    @Roles({ roles: ['MASTER', 'FORNECEDOR_LISTAR'] })
    async findAll(): Promise<FornecedorResponseDto[]> {
        const fornecedores = await this.fornecedorService.findAll();
        const fornecedorDto: FornecedorResponseDto[] = fornecedores.map(fornecedor => fornecedor.toDto());
        return fornecedorDto;
    }

    @Get(':uuid')
    @Roles({ roles: ['MASTER', 'FORNECEDOR_EXIBIR']})
    async findOne(@Param('uuid') uuid: string): Promise<FornecedorResponseDto> {
        const fornecedor = await this.fornecedorService.findOneByUuid(uuid);
        if (!fornecedor)
            throw new NotFoundException('Fornecedor não localizado');
        return fornecedor.toDto();   
    }

    @Post()
    @Roles({ roles: ['MASTER', 'FORNECEDOR_CADASTRAR'] })
    async create(@Body() request: FornecedorRequestDto): Promise<FornecedorResponseDto> {
        const createdFornecedor = await this.fornecedorService.create(request)
        return createdFornecedor.toDto();
    }

    @Put(':uuid')
    @Roles({ roles: ['MASTER', 'FORNECEDOR_EDITAR'] })
    async update(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string, @Body() request: FornecedorRequestDto): Promise<string> {
        const updatedFornecedor = await this.fornecedorService.update(uuid, request);
        return JSON.stringify(updatedFornecedor);
    }

    @Delete(':uuid')
    @Roles({ roles: ['MASTER', 'FORNECEDOR_EXCLUIR'] })
    async remove(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string): Promise<FornecedorResponseDto> {
        const fornecedor = await this.fornecedorService.remove(uuid);
        return fornecedor.toDto();
    }

    @Get('/findByEmail/:email')
    @Roles({ roles: ['MASTER', 'FORNECEDOR_EXIBIR'] })
    async findByEmail(@Param('email') email: string): Promise<string> {
        return await this.fornecedorService.findByEmail(email)
    }    
}