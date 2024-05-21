import { Test, TestingModule } from '@nestjs/testing';
import { FornecedorService } from './fornecedor.service';
import { FornecedorController } from './fornecedor.controller';
import { FornecedorResponseDto } from './fornecedor.response.dto';

const mockFornecedorService = {
    findAll: jest.fn(() => [
        {
            uuid: 'uuid-1',
            nome: 'Nome do Fornecedor 1',
            email: 'fornecedor@gmail.com',
            telefone: '(83) 99887-7665',
            documento: '01.123.456/0001-89',
            estado: 'PB',
            cidade: 'Campina Grande',
            endereco: 'Rua da lama, 115',
            complemento: 'Terreo',
            situacao: true,
            data_cadastro: new Date(),
            data_atualizacao: new Date()
        },
        {
            uuid: 'uuid-2',
            nome: 'Nome do Fornecedor 2',
            email: 'fornecedor2@gmail.com',
            telefone: '(83) 99887-9999',
            documento: '89.789.456/0001-90',
            estado: 'PB',
            cidade: 'Patos',
            endereco: 'Rua da ladeira, 91',
            complemento: '',
            situacao: true,
            data_cadastro: new Date(),
            data_atualizacao: new Date()
        },
    ]),
};


describe('FornecedorController', () => {
  let controller: FornecedorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FornecedorController],
      providers: [
        {
          provide: FornecedorService,
          useValue: mockFornecedorService,
        },
      ],
    }).compile();

    controller = app.get<FornecedorController>(FornecedorController);
  });

  describe('root', () => {
    it('RF2.4 Listar Fornecedores', async () => {      
      const result = await controller.findAll();

      expect(result.length).toEqual(2);
      expect(result.length).toBeInstanceOf(FornecedorResponseDto);
      expect(result[0]).toHaveProperty('uuid', 'uuid-1');
      expect(result[0]).toHaveProperty('nome', 'Nome do fornecedor 1');
      expect(result[0]).toHaveProperty('email', 'fornecedor@gmail.com');
      expect(result[0]).toHaveProperty('telefone', '(83) 99887-7665');
      expect(result[0]).toHaveProperty('documento', '89.789.456/0001-90');
      expect(result[0]).toHaveProperty('estado', 'PB');
      expect(result[0]).toHaveProperty('cidade', 'Campina Grande');
      expect(result[0]).toHaveProperty('endereco', 'Rua da lama, 115');
      expect(result[0]).toHaveProperty('complemento', 'terreo');
      expect(result[0]).toHaveProperty('situacao', true);
      expect(result[0]).toHaveProperty('data_cadastro');
      expect(result[0]).toHaveProperty('data_atualizacao');
    });
  });
});



