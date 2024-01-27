drop database if exists agilmax_erp;
create database if not exists agilmax_erp;
use agilmax_erp;
-- Tabela: setores
CREATE TABLE setores (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) DEFAULT (UUID()),
    descricao VARCHAR(255),
    situacao INT(1) DEFAULT 1,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO agilmax_erp.setores (uuid,descricao,situacao,data_cadastro,data_atualizacao) VALUES
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
INSERT INTO clientes (nome, email, documento, estado, cidade, endereco, complemento, setor_id)
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

-- Tabela: clientes_atributos
CREATE TABLE clientes_atributos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) DEFAULT (UUID()),
    cliente_id INT,
    chave VARCHAR(255),
    valor VARCHAR(255),
    obrigatorio BOOLEAN,
    situacao INT(1) DEFAULT 1,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);

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

-- Tabela: servicos
CREATE TABLE servicos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) DEFAULT (UUID()),
    os_id INT,
    descricao TEXT,
    situacao INT(1) DEFAULT 1,
    valor DECIMAL(10,2),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (os_id) REFERENCES os(id) ON DELETE CASCADE
);

-- Tabela: os_atributos
CREATE TABLE os_atributos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) DEFAULT (UUID()),
    os_id INT,
    atributo_id INT,
    valor VARCHAR(255),
    FOREIGN KEY (os_id) REFERENCES os(id) ON DELETE CASCADE,
    FOREIGN KEY (atributo_id) REFERENCES clientes_atributos(id) ON DELETE CASCADE
);

-- Tabela: os_configuracao_atributos
CREATE TABLE os_configuracao_atributos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) DEFAULT (UUID()),
    descricao VARCHAR(255),
    tipo VARCHAR(50),
    situacao INT(1) DEFAULT 1,
    setor INT,
    FOREIGN KEY (setor) REFERENCES setores(id) ON DELETE CASCADE
);

