/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { ModuloEntity } from "./module.entity"
import { ModuloRequest } from "./modulo.request"

@Injectable()
export class ModuloService {
    constructor(
        @InjectRepository(ModuloEntity)
        private readonly service: Repository<ModuloEntity>,
    ) { }

    async create(request: ModuloRequest): Promise<ModuloEntity> {
        return this.service.save(ModuloEntity.toEntity(request))
    }

    async findByNome(nome: string): Promise<ModuloEntity> {
        return await this.service.findOne({ where: { nome } })
    }

    async findOneByUuid(uuid: string): Promise<ModuloEntity> {
        return this.service.findOne({
            where: { uuid: uuid }
        })
    }

    async list(): Promise<ModuloEntity[]> {
        return await this.service.find({ relations: ['roles'] })
    }


    async mapRoles(roleNomes: string[]): Promise<ModuloEntity[]> {
        const roles = [];
        for (const roleNome of roleNomes) {
            const role = await this.findByNome(roleNome);
            roles.push(role);
        }
        return roles;
    }

    async getRolesByNomes(roleNomes: string[]): Promise<ModuloEntity[]> {
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
