import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, } from 'class-validator';
import { ClienteEntity } from '../cliente.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class ClienteDocumentoValidation implements ValidatorConstraintInterface {

    constructor(
        @InjectRepository(ClienteEntity)
        private readonly clienteRepository: Repository<ClienteEntity>,
    ) { }

    async validate(documento: string, validationArguments: ValidationArguments): Promise<boolean> {
        const uuid = validationArguments.object['uuid'];

        const query = this.clienteRepository.createQueryBuilder('cliente')
            .where('cliente.documento = :documento', { documento });

        if (uuid)
            query.andWhere('cliente.uuid != :uuid', { uuid });

        return await query.getOne().then((cliente) => {
            if (cliente) {
                const message = `Já existe um cliente com o CPF/CNPJ ${documento}`;
                throw new UnprocessableEntityException(message);
            }
            return true;
        });
    }
}