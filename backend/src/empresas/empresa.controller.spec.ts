import { Test, TestingModule } from '@nestjs/testing';
import { EmpresaService } from './empresa.service';
import { EmpresaController } from './empresa.controller';
import { EmpresaResponseDto } from './empresa.response.dto';

const mockEmpresaService = {
  findAll: jest.fn(() => [
    {
      uuid: 'uuid-1',
      razao_social: 'Razão Social 1',
      nome_fantasia: 'Nome Fantasia 1',
      cnpj: '12.345.678/0001-12',
      email: 'empresa1@email.com',
      cep: '12345-678',
      estado: 'SP',
      cidade: 'São Paulo',
      endereco: 'Rua A, 123',
      numero: '123',
      complemento: 'Sala 1',
      data_cadastro: new Date(),
      data_atualizacao: new Date(),
    },
    {
      uuid: 'uuid-2',
      razao_social: 'Razão Social 2',
      nome_fantasia: 'Nome Fantasia 2',
      cnpj: '87.654.321/0001-87',
      email: 'empresa2@email.com',
      cep: '87654-321',
      estado: 'RJ',
      cidade: 'Rio de Janeiro',
      endereco: 'Rua B, 456',
      numero: '456',
      complemento: 'Sala 2',
      data_cadastro: new Date(),
      data_atualizacao: new Date(),
    },
  ]),
  findOneByUuid: jest.fn((uuid: string) => ({
    uuid,
    razao_social: `Razão Social com uuid ${uuid}`,
    nome_fantasia: `Nome Fantasia com uuid ${uuid}`,
    cnpj: '12.345.678/0001-12',
    email: 'empresa1@email.com',
    cep: '12345-678',
    estado: 'SP',
    cidade: 'São Paulo',
    endereco: 'Rua A, 123',
    numero: '123',
    complemento: 'Sala 1',
    data_cadastro: new Date(),
    data_atualizacao: new Date(),
  })),
  create: jest.fn((dto: any) => ({
    ...dto,
    uuid: 'uuid-1',
    data_cadastro: new Date(),
    data_atualizacao: new Date(),
  })),
  updateByUuid: jest.fn((uuid: string, dto: any) => ({
    uuid,
    ...dto,
    data_atualizacao: new Date(),
  })),
};

describe('EmpresaController', () => {
  let controller: EmpresaController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EmpresaController],
      providers: [
        {
          provide: EmpresaService,
          useValue: mockEmpresaService,
        },
      ],
    }).compile();

    controller = app.get<EmpresaController>(EmpresaController);
  });

  describe('findAll', () => {
    it('should return an array of empresas', async () => {
      const result = await controller.findAll();
      expect(result.length).toEqual(2);
      expect(result[0]).toBeInstanceOf(EmpresaResponseDto);
      expect(result[0]).toHaveProperty('uuid', 'uuid-1');
      expect(result[0]).toHaveProperty('razao_social', 'Razão Social 1');
      expect(result[0]).toHaveProperty('nome_fantasia', 'Nome Fantasia 1');
      expect(result[0]).toHaveProperty('cnpj', '12.345.678/0001-12');
      expect(result[0]).toHaveProperty('email', 'empresa1@email.com');
      expect(result[0]).toHaveProperty('cep', '12345-678');
      expect(result[0]).toHaveProperty('estado', 'SP');
      expect(result[0]).toHaveProperty('cidade', 'São Paulo');
      expect(result[0]).toHaveProperty('endereco', 'Rua A, 123');
      expect(result[0]).toHaveProperty('numero', '123');
      expect(result[0]).toHaveProperty('complemento', 'Sala 1');
      expect(result[0]).toHaveProperty('data_cadastro');
      expect(result[0]).toHaveProperty('data_atualizacao');
    });
  });

  describe('findOne', () => {
    it('should return a single empresa', async () => {
      const uuid = 'uuid-1';
      const result = await controller.findOne(uuid);
      expect(result).toBeInstanceOf(EmpresaResponseDto);
      expect(result).toHaveProperty('uuid', uuid);
      expect(result).toHaveProperty('razao_social', `Razão Social com uuid ${uuid}`);
    });
  });

  describe('create', () => {
    it('should create a new empresa', async () => {
      const createDto = {
        razao_social: 'Razão Social 1',
        nome_fantasia: 'Nome Fantasia 1',
        cnpj: '12.345.678/0001-12',
        email: 'empresa1@email.com',
        cep: '12345-678',
        estado: 'SP',
        cidade: 'São Paulo',
        endereco: 'Rua A, 123',
        numero: '123',
        complemento: 'Sala 1',
      };
      const result = await controller.create(createDto, 1);
      expect(result).toHaveProperty('uuid', 'uuid-1');
      expect(result).toHaveProperty('razao_social', 'Razão Social 1');
      expect(result).toHaveProperty('nome_fantasia', 'Nome Fantasia 1');
    });
  });

  describe('update', () => {
    it('should update an existing empresa', async () => {
      const uuid = 'uuid-1';
      const updateDto = {
        razao_social: 'Razão Social 1 updated',
        nome_fantasia: 'Nome Fantasia 1 updated',
        cnpj: '12.345.678/0001-12',
        email: 'empresa1@email.com',
        cep: '12345-678',
        estado: 'SP',
        cidade: 'São Paulo',
        endereco: 'Rua A, 123',
        numero: '123',
        complemento: 'Sala 1',
      };
      const result = await controller.update(uuid, updateDto);
      expect(result).toHaveProperty('uuid', uuid);
      expect(result).toHaveProperty('razao_social', 'Razão Social 1 updated');
      expect(result).toHaveProperty('nome_fantasia', 'Nome Fantasia 1 updated');
    });
  });
});