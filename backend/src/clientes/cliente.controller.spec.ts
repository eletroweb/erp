import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { ClienteResponseDto } from './cliente.response.dto';


const mockClienteService = {
  findAll: jest.fn(() => [
    {
      uuid: 'uuid-1',
      nome: 'Nome do cliente 1',
      email: 'cliente1@email.com',
      telefone: '(11) 1234-5678',
      documento: '123.456.789-00',
      estado: 'SP',
      cidade: 'São Paulo',
      endereco: 'Rua X, 123',
      complemento: 'Apto. 101',
      situacao: true,
      data_cadastro: new Date(),
      data_atualizacao: new Date(),
      setor: {
        uuid: 'uuid-setor-1',
        nome: 'Nome do setor 1',
        descricao: 'Descrição do setor 1',
      },
    },
    {
      uuid: 'uuid-2',
      nome: 'Nome do cliente 2',
      email: 'cliente2@email.com',
      telefone: '(11) 9876-5432',
      documento: '987.654.321-00',
      estado: 'RJ',
      cidade: 'Rio de Janeiro',
      endereco: 'Rua Y, 456',
      complemento: 'Casa',
      situacao: false,
      data_cadastro: new Date(),
      data_atualizacao: new Date(),
      setor: {
        uuid: 'uuid-setor-2',
        nome: 'Nome do setor 2',
        descricao: 'Descrição do setor 2',
      },
    },
  ]),
};

export class SetorEntityMock {
  uuid: string;
  nome: string;
  descricao: string;

  constructor(uuid: string, nome: string, descricao: string) {
    this.uuid = uuid;
    this.nome = nome;
    this.descricao = descricao;
  }
};


describe('ClienteController', () => {
  let controller: ClienteController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ClienteController],
      providers: [
        {
          provide: ClienteService,
          useValue: mockClienteService,
        },
      ],
    }).compile();

    controller = app.get<ClienteController>(ClienteController);
  });

  describe('root', () => {
    it('RF2.4 Listar Clientes', async () => {

      const setorMock = new SetorEntityMock('uuid-setor-1', 'Nome do setor 1', 'Descrição do setor 1');

      jest.mock('src/setores/setor.entity', () => {
        return {
          SetorEntity: jest.fn(() => setorMock),
        };
      });

      const result = await controller.findAll();

      expect(result.length).toEqual(2);
      expect(result.length).toBeInstanceOf(ClienteResponseDto);
      expect(result[0]).toHaveProperty('uuid', 'uuid-1');
      expect(result[0]).toHaveProperty('nome', 'Nome do cliente 1');
      expect(result[0]).toHaveProperty('email', 'cliente1@email.com');
      expect(result[0]).toHaveProperty('telefone', '(11) 1234-5678');
      expect(result[0]).toHaveProperty('documento', '123.456.789-00');
      expect(result[0]).toHaveProperty('estado', 'SP');
      expect(result[0]).toHaveProperty('cidade', 'São Paulo');
      expect(result[0]).toHaveProperty('endereco', 'Rua X, 123');
      expect(result[0]).toHaveProperty('complemento', 'Apto. 101');
      expect(result[0]).toHaveProperty('situacao', true);
      expect(result[0]).toHaveProperty('data_cadastro');
      expect(result[0]).toHaveProperty('data_atualizacao');
    });
  });
});
