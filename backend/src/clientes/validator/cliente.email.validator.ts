import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, } from 'class-validator';
import { ClienteEntity } from '../cliente.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class ClienteEmailValidation implements ValidatorConstraintInterface {

  constructor(
    @InjectRepository(ClienteEntity)
    private readonly clienteRepository: Repository<ClienteEntity>,
  ) { }

  async validate(email: string, validationArguments: ValidationArguments): Promise<boolean> {
    const uuid = validationArguments.object['uuid'];

    const query = this.clienteRepository.createQueryBuilder('cliente')
      .where('cliente.email = :email', { email });

    if (uuid)
      query.andWhere('cliente.uuid != :uuid', { uuid });

    return await query.getOne().then((cliente) => {
      if (cliente) {
        const message = `Já existe um cliente com o e-mail ${email}`;
        throw new UnprocessableEntityException(message);
      }
      return true;
    });
  }
}