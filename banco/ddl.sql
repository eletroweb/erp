drop database if exists erp;
create database if not exists erp;
use erp;
-- Tabela: setores
CREATE TABLE setores (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) DEFAULT (UUID()),
    descricao VARCHAR(255),
    situacao INT(1) DEFAULT 1,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO erp.setores (uuid,descricao,situacao,data_cadastro,data_atualizacao) VALUES
	 ('02074b20-bd21-11ee-8c1d-641c679a799a','Meio Ambiente',1,'2024-01-27 11:33:16','2024-01-27 11:33:16'),
	 ('1bc514ff-bd21-11ee-8c1d-641c679a799a','Segurança do Trabalho',1,'2024-01-27 11:33:59','2024-01-27 11:33:59'),
	 ('2627230a-bd21-11ee-8c1d-641c679a799a','Engenharia civil',1,'2024-01-27 11:34:16','2024-01-27 11:34:16');

-- Tabela: clientes
CREATE TABLE clientes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) DEFAULT (UUID()),
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    documento VARCHAR(20) NOT NULL,
    estado VARCHAR(2),
    cidade VARCHAR(100),
    endereco VARCHAR(255),
    complemento VARCHAR(255),
    situacao INT(1) DEFAULT 1,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    setor_id INT,
    FOREIGN KEY (setor_id) REFERENCES setores(id) ON DELETE CASCADE
);


-- Inserir clientes vinculados ao setor 1
/* INSERT INTO clientes (nome, email, documento, estado, cidade, endereco, complemento, setor_id)
VALUES
    ('Cliente1', 'cliente1@email.com', '123456789', 'SP', 'Sao Paulo', 'Rua A', 'Complemento A', 1),
    ('Cliente2', 'cliente2@email.com', '987654321', 'RJ', 'Rio de Janeiro', 'Rua B', 'Complemento B', 1),
    ('Cliente3', 'cliente3@email.com', '654321987', 'MG', 'Belo Horizonte', 'Rua C', 'Complemento C', 1),
     ('Cliente4', 'cliente4@email.com', '111223344', 'RS', 'Porto Alegre', 'Rua D', 'Complemento D', 2),
    ('Cliente5', 'cliente5@email.com', '556677889', 'PR', 'Curitiba', 'Rua E', 'Complemento E', 2),
    ('Cliente6', 'cliente6@email.com', '999888777', 'BA', 'Salvador', 'Rua F', 'Complemento F', 3),
    ('Cliente7', 'cliente7@email.com', '333222111', 'PE', 'Recife', 'Rua G', 'Complemento G', 3),
    ('Cliente8', 'cliente8@email.com', '777666555', 'CE', 'Fortaleza', 'Rua H', 'Complemento H', 3),
    ('Cliente9', 'cliente9@email.com', '444333222', 'AM', 'Manaus', 'Rua I', 'Complemento I', 3),
    ('Cliente10', 'cliente10@email.com', '111000999', 'SC', 'Florianopolis', 'Rua J', 'Complemento J', 3);
*/

-- Tabela: clientes_atributos
CREATE TABLE clientes_atributos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) DEFAULT (UUID()),
    cliente_id INT,
    chave VARCHAR(255),
    valor VARCHAR(255),
    situacao INT(1) DEFAULT 1,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);

/*
INSERT INTO erp.clientes_atributos (uuid,cliente_id,chave,valor,situacao) VALUES
	 ('64567cfd-bd57-11ee-8c1d-641c679a799a',1,'Telefone','83991732800',1),
	 ('801f6f1c-bd57-11ee-8c1d-641c679a799a',1,'E-mail','fulano@teste.com',1);
*/

/*
 * Um contrato possui N serviços vinculados a ele
 * */
	
-- Tabela: contratos
CREATE TABLE contratos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) DEFAULT (UUID()),
    descricao TEXT,
    situacao INT(1) DEFAULT 1,
    orcamento DECIMAL(10,2),
    data_inicio DATE,
    data_fim DATE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
/*
INSERT INTO contratos (uuid, descricao, situacao, orcamento, data_inicio, data_fim)
VALUES 
(UUID(), 'Contrato de Manutenção', 1, 1500.00, '2024-01-10', '2024-12-31'),
(UUID(), 'Contrato de Consultoria', 1, 2500.00, '2024-02-15', '2024-06-30'),
(UUID(), 'Contrato de Consturção', 1, 3500.00, '2024-03-01', '2024-09-30'),
(UUID(), 'Contrato de Treinamento', 1, 2000.00, '2024-04-10', '2024-08-15'),
(UUID(), 'Contrato de Suporte', 1, 1800.00, '2024-05-20', '2024-11-30');
*/


CREATE TABLE cliente_contratos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) DEFAULT (UUID()),
    cliente_id INT,
    contrato_id INT,
    situacao INT(1) DEFAULT 1,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE cascade,
    FOREIGN KEY (contrato_id) REFERENCES contratos(id) ON DELETE CASCADE
);


/*
 * Um serviço esta associado a um contrato
 * que possui um orçamento; Cada serviço possui um valor
 * */
-- Tabela: servicos
CREATE TABLE servicos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) DEFAULT (UUID()),
    descricao TEXT,
    situacao INT(1) DEFAULT 1,
    valor DECIMAL(10,2),
    contrato_id INT,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (contrato_id) REFERENCES contratos(id) ON DELETE CASCADE
);

-- Inserir serviços relacionados à construção civil associados ao contrato_id = 3
/*INSERT INTO servicos (descricao, situacao, valor, contrato_id)
VALUES
    ('Serviço de Fundação', 1, 5000.00, 3),
    ('Instalação Elétrica', 1, 3000.00, 3),
    ('Serviço de Alvenaria', 1, 4500.00, 3),
    ('Pintura Interna', 1, 2000.00, 3),
    ('Serviço de Encanamento', 1, 3500.00, 3),
    ('Instalação de Pisos', 1, 2800.00, 3),
    ('Serviço de Telhado', 1, 4000.00, 3),
    ('Pintura Externa', 1, 2200.00, 3),
    ('Limpeza Pós-Obra', 1, 1200.00, 3),
    ('Serviço de Paisagismo', 1, 1800.00, 3);
*/

-- Tabela: os
CREATE TABLE os (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) DEFAULT (UUID()),
    cliente_id INT,
    descricao TEXT,
    prazo DATE,
    situacao INT(1) DEFAULT 1,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    setor_id INT,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
    FOREIGN KEY (setor_id) REFERENCES setores(id) ON DELETE CASCADE
);


-- Inserir 10 ordens de serviços
/*INSERT INTO os (cliente_id, descricao, prazo, situacao, setor_id)
VALUES
    (FLOOR(1 + RAND() * 5), 'Serviço de Manutenção Elétrica', '2024-02-10', 1, 3),
    (FLOOR(1 + RAND() * 5), 'Instalação de Sistemas de Segurança', '2024-02-15', 1, 3),
    (FLOOR(1 + RAND() * 5), 'Serviço de Pintura Interna', '2024-02-20', 1, 3),
    (FLOOR(1 + RAND() * 5), 'Limpeza e Manutenção de Ar Condicionado', '2024-02-25', 1, 3),
    (FLOOR(1 + RAND() * 5), 'Reparo em Encanamento', '2024-03-05', 1, 3),
    (FLOOR(1 + RAND() * 5), 'Serviço de Jardinagem', '2024-03-10', 1, 3),
    (FLOOR(1 + RAND() * 5), 'Instalação de Equipamentos de Segurança', '2024-03-15', 1, 3),
    (FLOOR(1 + RAND() * 5), 'Manutenção de Elevadores', '2024-03-20', 1, 3),
    (FLOOR(1 + RAND() * 5), 'Serviço de Limpeza Geral', '2024-03-25', 1, 3),
    (FLOOR(1 + RAND() * 5), 'Reparo em Telhado', '2024-04-01', 1, 3);
*/
-- Tabela: servicos
CREATE TABLE os_servicos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) DEFAULT (UUID()),
    os_id INT,
    servico_id INT,
    quantidade INT,
    situacao INT(1) DEFAULT 1,
    observacao TEXT,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (os_id) REFERENCES os(id) ON DELETE cascade,
    FOREIGN KEY (servico_id) REFERENCES servicos(id) ON DELETE CASCADE
);

/*
-- Inserir associação de serviços para cada ordem de serviço
INSERT INTO os_servicos (os_id, servico_id, situacao, observacao)
VALUES
    (1, 1, 1, 'Realizar serviço de Fundação'),
    (1, 2, 1, 'Realizar Instalação Elétrica'),
    (3, 3, 1, 'Realizar Serviço de Alvenaria'),
    (4, 4, 1, 'Realizar Pintura Interna'),
    (5, 5, 1, 'Realizar Serviço de Encanamento'),
    (6, 6, 1, 'Realizar Instalação de Pisos'),
    (7, 7, 1, 'Realizar Serviço de Telhado'),
    (8, 8, 1, 'Realizar Pintura Externa'),
    (9, 9, 1, 'Realizar Limpeza Pós-Obra'),
    (10, 10, 1, 'Realizar Serviço de Paisagismo');
*/

-- Tabela: os_configuracao_atributos
CREATE TABLE os_configuracao_atributos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) DEFAULT (UUID()),
    descricao VARCHAR(255),
    tipo VARCHAR(50),
    obrigatorio boolean DEFAULT 0,
    situacao INT(1) DEFAULT 1,
    setor INT,
    FOREIGN KEY (setor) REFERENCES setores(id) ON DELETE CASCADE
);

-- Tabela: os_atributos
CREATE TABLE os_atributos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) DEFAULT (UUID()),
    os_id INT,
    atributo_id INT,
    valor text,
    FOREIGN KEY (os_id) REFERENCES os(id) ON DELETE CASCADE,
    FOREIGN KEY (atributo_id) REFERENCES os_configuracao_atributos(id) ON DELETE CASCADE
);
