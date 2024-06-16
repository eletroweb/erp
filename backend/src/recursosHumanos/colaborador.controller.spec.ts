import { Test, TestingModule } from '@nestjs/testing';
import { ColaboradorService } from './colaborador.service';
import { ColaboradorController } from './colaborador.controller';
import { ColaboradorResponseDto } from './colaborador.response.dto';

const mockColaboradorService = {
  findAll: jest.fn(() => [
    {
      uuid: 'uuid-1',
      nome: 'Nome do colaborador 1',
      email: 'colaborador1@email.com',
      telefone: '(83) 1234-5679',
      documento: '366.959.020-03',
      cargo: 'Assistente Administrativo',
      salario: '1.500,00',
      valor_hora: '0,00',
      observacao: 'Qualquer coisa',
      situacao: true,
      data_cadastro: new Date(),
      data_atualizacao: new Date(),
    },
    {
      uuid: 'uuid-2',
      nome: 'Nome do colaborador 2',
      email: 'colaborador2@email.com',
      telefone: '(86) 9875-5432',
      documento: '492.729.170-77',
      cargo: 'Engenheiro',
      salario: '0,00',
      valor_hora: '150,00',
      observacao: 'Tanto faz',
      situacao: false,
      data_cadastro: new Date(),
      data_atualizacao: new Date(),
    },
  ]),
};

describe('ColaboradorController', () => {
  let controller: ColaboradorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ColaboradorController],
      providers: [
        {
          provide: ColaboradorService,
          useValue: mockColaboradorService,
        },
      ],
    }).compile();

    controller = app.get<ColaboradorController>(ColaboradorController);
  });

  describe('root', () => {
    it('RF12.2 Listar Colaboradores', async () => {
      const result = await controller.findAll();

      expect(result.length).toEqual(2);
      expect(result.length).toBeInstanceOf(ColaboradorResponseDto);
      expect(result[0]).toHaveProperty('uuid', 'uuid-1');
      expect(result[0]).toHaveProperty('nome', 'Nome do colaborador 1');
      expect(result[0]).toHaveProperty('email', 'colaborador1@email.com');
      expect(result[0]).toHaveProperty('telefone', '(83) 1234-5678');
      expect(result[0]).toHaveProperty('documento', '987.654.321-00');
      expect(result[0]).toHaveProperty('cargo', 'Assistente Administrativo');
      expect(result[0]).toHaveProperty('salario', '1.500,00');
      expect(result[0]).toHaveProperty('valor_hora', '0,00');
      expect(result[0]).toHaveProperty('cobservacao', 'Qualquer coisa');
      expect(result[0]).toHaveProperty('situacao', true);
      expect(result[0]).toHaveProperty('data_cadastro');
      expect(result[0]).toHaveProperty('data_atualizacao');
    });
  });
});
