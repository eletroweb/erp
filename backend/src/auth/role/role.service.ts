/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { RoleEntity } from "./role.entity"
import { RoleRequest } from "./role.request"
import { ModuloEntity } from "src/app/modulo/module.entity"
import { ModuloService } from '../../app/modulo/module.service';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>,
        private readonly moduloService: ModuloService,
    ) { }

    async create(request: RoleRequest): Promise<RoleEntity> {
        const modulo = await this.moduloService.findOneByUuid(request.modulo);
        const role = RoleEntity.toEntity(request, modulo)
        
        return this.roleRepository.save(role)
    }

    async findByNome(nome: string): Promise<RoleEntity> {
        return await this.roleRepository.findOne({ where: { nome } })
    }

    async list(): Promise<RoleEntity[]> {
        return await this.roleRepository.find()
    }


    async mapRoles(roleNomes: string[]): Promise<RoleEntity[]> {
        const roles = [];
        for (const roleNome of roleNomes) {
            const role = await this.findByNome(roleNome);
            roles.push(role);
        }
        return roles;
    }

    async getRolesByNomes(roleNomes: string[]): Promise<RoleEntity[]> {
        const roles = await Promise.all(roleNomes.map(async roleNome => {
            const role = await this.findByNome(roleNome);
            if (!role) {
                throw new NotFoundException(`Role com nome ${roleNome} não encontrada`);
            }
            return role;
        }));

        return roles;
    }

    async getRolesIds(roleNomes: string[]): Promise<number[]> {
        const roles = [];
        for (const roleNome of roleNomes) {
            const role = await this.findByNome(roleNome);
            roles.push(role.id);
        }
        return roles;
    }
}
