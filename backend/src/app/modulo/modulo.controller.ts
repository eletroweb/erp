/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get } from '@nestjs/common';
import { Public } from '../../auth/public-strategy';
import { ModuloEntity } from './module.entity';
import { ModuloService } from './module.service';
import { ModuloRequest } from './modulo.request';

@Controller('modulos')
export class ModuloController {
    constructor(private readonly service: ModuloService) { }

    @Post()
    @Public()
    async create(@Body() request: ModuloRequest): Promise<ModuloEntity> {
        const createdFinanceiro = await this.service.create(request);
        return createdFinanceiro
    }

    @Get()
    @Public()
    async list(): Promise<ModuloEntity[]> {
        return await this.service.list();
    }
}