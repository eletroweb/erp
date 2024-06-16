/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleEntity } from './role.entity';
import { Public } from '../public-strategy';
import { RoleRequest } from './role.request';

@Controller('roles')
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @Post()
  @Public()
  async create(@Body() request: RoleRequest): Promise<RoleEntity> {
    const createdFinanceiro = await this.service.create(request);
    return createdFinanceiro;
  }

  @Get()
  @Public()
  async list(): Promise<RoleEntity[]> {
    return await this.service.list();
  }
}
