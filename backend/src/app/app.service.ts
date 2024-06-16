import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { EnderecoResponse } from './endereco.response';

@Injectable()
export class AppService {
  async findAddressByCep(cep: string): Promise<EnderecoResponse> {
    try {
      const brasilApiResponse = await axios.get(
        `https://brasilapi.com.br/api/cep/v1/${cep}`,
      );
      const { state, city, street, neighborhood } = brasilApiResponse.data;
      const response = new EnderecoResponse();
      response.estado = state;
      response.cidade = city;
      response.endereco = street;
      response.bairro = neighborhood;
      response.cep = cep;

      return response;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException(
          'Endereço não encontrado para o CEP fornecido',
        );
      } else {
        throw new Error('Erro ao consultar o CEP');
      }
    }
  }
}
