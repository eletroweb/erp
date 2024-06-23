-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: erp
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8mb4 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

--
-- Table structure for table `cargos`
--

DROP TABLE IF EXISTS `cargos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `cargos` (
    `id` int NOT NULL AUTO_INCREMENT,
    `uuid` char(36) NOT NULL,
    `nome` varchar(100) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `cargos`
--

LOCK TABLES `cargos` WRITE;
/*!40000 ALTER TABLE `cargos` DISABLE KEYS */
;
/*!40000 ALTER TABLE `cargos` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `clientes` (
    `id` int NOT NULL AUTO_INCREMENT,
    `uuid` char(36) NOT NULL,
    `nome` varchar(100) NOT NULL,
    `email` varchar(50) NOT NULL,
    `telefone` varchar(50) NOT NULL,
    `documento` varchar(20) NOT NULL,
    `estado` varchar(2) DEFAULT NULL,
    `cidade` varchar(100) DEFAULT NULL,
    `endereco` varchar(100) DEFAULT NULL,
    `complemento` varchar(255) DEFAULT NULL,
    `situacao` enum('ATIVO', 'INATIVO') NOT NULL,
    `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `data_atualizacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `setor_id` int DEFAULT NULL,
    `cep` varchar(9) NOT NULL,
    `bairro` varchar(255) DEFAULT NULL,
    `numero` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `FK_788e6db8c862f167114a4850603` (`setor_id`),
    CONSTRAINT `FK_788e6db8c862f167114a4850603` FOREIGN KEY (`setor_id`) REFERENCES `setores` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */
;
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `colaborador_entity`
--

DROP TABLE IF EXISTS `colaborador_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `colaborador_entity` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `matricula` varchar(255) DEFAULT NULL,
    `nome` varchar(255) DEFAULT NULL,
    `salario` double DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `colaborador_entity`
--

LOCK TABLES `colaborador_entity` WRITE;
/*!40000 ALTER TABLE `colaborador_entity` DISABLE KEYS */
;
/*!40000 ALTER TABLE `colaborador_entity` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `colaboradores`
--

DROP TABLE IF EXISTS `colaboradores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `colaboradores` (
    `id` int NOT NULL AUTO_INCREMENT,
    `uuid` char(36) NOT NULL,
    `nome` varchar(100) NOT NULL,
    `email` varchar(50) NOT NULL,
    `telefone` varchar(50) NOT NULL,
    `documento` varchar(20) NOT NULL,
    `cargo` varchar(50) DEFAULT NULL,
    `salario` varchar(50) DEFAULT NULL,
    `valor_hora` varchar(50) DEFAULT NULL,
    `observacao` varchar(255) DEFAULT NULL,
    `situacao` enum('ATIVO', 'INATIVO') NOT NULL,
    `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `data_atualizacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `colaboradores`
--

LOCK TABLES `colaboradores` WRITE;
/*!40000 ALTER TABLE `colaboradores` DISABLE KEYS */
;
/*!40000 ALTER TABLE `colaboradores` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `contratos`
--

DROP TABLE IF EXISTS `contratos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `contratos` (
    `id` int NOT NULL AUTO_INCREMENT,
    `uuid` char(36) NOT NULL,
    `descricao` varchar(100) NOT NULL,
    `situacao` int NOT NULL DEFAULT '1',
    `orcamento` decimal(10, 2) NOT NULL,
    `data_inicio` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `data_fim` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `data_atualizacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `contratos`
--

LOCK TABLES `contratos` WRITE;
/*!40000 ALTER TABLE `contratos` DISABLE KEYS */
;
/*!40000 ALTER TABLE `contratos` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `empresas`
--

DROP TABLE IF EXISTS `empresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `empresas` (
    `id` int NOT NULL AUTO_INCREMENT,
    `uuid` char(36) NOT NULL,
    `razaoSocial` varchar(255) NOT NULL,
    `nomeFantasia` varchar(255) NOT NULL,
    `cnpj` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `cep` varchar(255) NOT NULL,
    `estado` varchar(255) NOT NULL,
    `cidade` varchar(255) NOT NULL,
    `endereco` varchar(255) NOT NULL,
    `numero` varchar(255) NOT NULL,
    `complemento` varchar(255) DEFAULT NULL,
    `situacao` enum('ATIVO', 'INATIVO') NOT NULL DEFAULT 'ATIVO',
    `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `data_atualizacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `logomarca` varchar(255) DEFAULT NULL,
    `usuarioId` int DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `REL_ce30afa75c4fbd4697af6ea062` (`usuarioId`),
    CONSTRAINT `FK_ce30afa75c4fbd4697af6ea0621` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `empresas`
--

LOCK TABLES `empresas` WRITE;
/*!40000 ALTER TABLE `empresas` DISABLE KEYS */
;

INSERT INTO
    `empresas`
VALUES (
        6,
        '7748082e-ef3e-443c-b210-392c197933a8',
        'Example Company',
        'Example',
        '12345678901234',
        'example@example.com',
        '12345-678',
        'Example State',
        'Example City',
        'Example Street',
        '123',
        'Example Complement',
        'ATIVO',
        '2024-06-17 00:48:27',
        '2024-06-17 00:48:27',
        'example_logo.png',
        63
    );
/*!40000 ALTER TABLE `empresas` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `empresas_usuarios`
--

DROP TABLE IF EXISTS `empresas_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `empresas_usuarios` (
    `id` int NOT NULL AUTO_INCREMENT,
    `usuario_id` int NOT NULL,
    `empresa_id` int NOT NULL,
    `usuarioId` int DEFAULT NULL,
    `empresaId` int DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `FK_410eb25d6f00f36a09ab1346ef9` (`usuarioId`),
    KEY `FK_43c45348b6f55f0273dd51f167c` (`empresaId`),
    CONSTRAINT `FK_410eb25d6f00f36a09ab1346ef9` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`),
    CONSTRAINT `FK_43c45348b6f55f0273dd51f167c` FOREIGN KEY (`empresaId`) REFERENCES `empresas` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `empresas_usuarios`
--

LOCK TABLES `empresas_usuarios` WRITE;
/*!40000 ALTER TABLE `empresas_usuarios` DISABLE KEYS */
;
/*!40000 ALTER TABLE `empresas_usuarios` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `ferias_entity`
--

DROP TABLE IF EXISTS `ferias_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `ferias_entity` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `data_limite` datetime(6) DEFAULT NULL,
    `dias_de_gozo` int DEFAULT NULL,
    `parcela` int DEFAULT NULL,
    `periodo_aquisitivo_atual` varchar(255) DEFAULT NULL,
    `periodo_de_gozo` varchar(255) DEFAULT NULL,
    `salario_parcial` bit(1) DEFAULT NULL,
    `colaborador_id` bigint DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `FKl91vpvyuyxcko0dihqr5bcmlh` (`colaborador_id`),
    CONSTRAINT `FKl91vpvyuyxcko0dihqr5bcmlh` FOREIGN KEY (`colaborador_id`) REFERENCES `colaborador_entity` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `ferias_entity`
--

LOCK TABLES `ferias_entity` WRITE;
/*!40000 ALTER TABLE `ferias_entity` DISABLE KEYS */
;
/*!40000 ALTER TABLE `ferias_entity` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `financeiro`
--

DROP TABLE IF EXISTS `financeiro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `financeiro` (
    `id` int NOT NULL AUTO_INCREMENT,
    `uuid` char(36) NOT NULL,
    `categoria` enum('RECEITA', 'DESPESA') NOT NULL DEFAULT 'DESPESA',
    `tipo` enum('FIXA', 'VARIAVEL') NOT NULL DEFAULT 'VARIAVEL',
    `descricao` varchar(255) NOT NULL,
    `fornecedor` varchar(255) NOT NULL DEFAULT '0',
    `observacao` varchar(255) DEFAULT NULL,
    `data_vencimento` datetime DEFAULT NULL,
    `data_pagamento` datetime DEFAULT NULL,
    `valor_cobranca` varchar(255) NOT NULL,
    `parcelada` tinyint NOT NULL DEFAULT '0',
    `numero_parcelas` int NOT NULL,
    `situacao` enum(
        'PAGA',
        'PENDENTE',
        'VENCIDA',
        'ARQUIVADO'
    ) NOT NULL DEFAULT 'PENDENTE',
    `setor_id` int DEFAULT NULL,
    `contrato_id` int DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `FK_9462c6a416498ce097ad5d89bfb` (`setor_id`),
    KEY `FK_c0da56ad28dc57040b60b2b5978` (`contrato_id`),
    CONSTRAINT `FK_9462c6a416498ce097ad5d89bfb` FOREIGN KEY (`setor_id`) REFERENCES `setores` (`id`) ON DELETE CASCADE,
    CONSTRAINT `FK_c0da56ad28dc57040b60b2b5978` FOREIGN KEY (`contrato_id`) REFERENCES `contratos` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `financeiro`
--

LOCK TABLES `financeiro` WRITE;
/*!40000 ALTER TABLE `financeiro` DISABLE KEYS */
;

INSERT INTO
    `financeiro`
VALUES (
        1,
        '2e694344-21cd-4a2b-b28b-9de2c23060ef',
        'RECEITA',
        'FIXA',
        'Salário',
        '0',
        NULL,
        '2024-06-30 00:00:00',
        NULL,
        '350.00',
        0,
        1,
        'PENDENTE',
        NULL,
        NULL
    ),
    (
        2,
        'f9dae9d3-56c9-4bbd-8780-b42b3242b8f2',
        'RECEITA',
        'FIXA',
        'Férias',
        '0',
        NULL,
        '2024-06-30 00:00:00',
        NULL,
        '235.00',
        0,
        1,
        'PENDENTE',
        NULL,
        NULL
    ),
    (
        3,
        'e4d6f496-9bfb-460b-bd36-99b1642b4d52',
        'RECEITA',
        'VARIAVEL',
        'Receita Exemplo 1',
        '0',
        NULL,
        '2024-06-28 00:00:00',
        NULL,
        '725.00',
        0,
        1,
        'VENCIDA',
        NULL,
        NULL
    ),
    (
        4,
        '85fa0f8f-8418-4c4b-ab55-903454d9a34d',
        'DESPESA',
        'VARIAVEL',
        'Energia',
        'Copel',
        NULL,
        '2024-06-27 00:00:00',
        NULL,
        '84.00',
        0,
        1,
        'PENDENTE',
        1,
        NULL
    ),
    (
        5,
        '3a0a77d3-73a3-4289-a9f6-7aa9fcaf33e0',
        'DESPESA',
        'VARIAVEL',
        'Água',
        '0',
        NULL,
        '2024-05-31 00:00:00',
        NULL,
        '63.00',
        0,
        1,
        'VENCIDA',
        2,
        NULL
    ),
    (
        6,
        '26ac739f-3625-49dc-beac-caaffcfa3039',
        'DESPESA',
        'FIXA',
        'Conta de Energia',
        '0',
        NULL,
        '2024-06-30 00:00:00',
        NULL,
        '1000.00',
        0,
        10,
        'PENDENTE',
        2,
        NULL
    ),
    (
        7,
        'e3523a7c-3b5c-47ca-83ee-f404b70ebd2a',
        'DESPESA',
        'VARIAVEL',
        'Energia',
        'Energisa',
        NULL,
        '2024-06-30 00:00:00',
        NULL,
        '100.00',
        0,
        10,
        'PENDENTE',
        1,
        NULL
    ),
    (
        8,
        '8da3a9ce-4fa4-4d51-bd0e-1de358421c7d',
        'RECEITA',
        'VARIAVEL',
        'Receita 1',
        '0',
        NULL,
        '2024-06-30 00:00:00',
        '2024-06-22 21:06:03',
        '150.00',
        0,
        1,
        'PAGA',
        NULL,
        NULL
    ),
    (
        9,
        'a9e78fe7-5bfe-4020-b80f-f84b9ddc6a3d',
        'RECEITA',
        'VARIAVEL',
        'Receita 2',
        '0',
        NULL,
        '2024-06-30 00:00:00',
        '2024-06-22 21:12:40',
        '1500.00',
        0,
        1,
        'PAGA',
        NULL,
        NULL
    );
/*!40000 ALTER TABLE `financeiro` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `financeiro_parcelas`
--

DROP TABLE IF EXISTS `financeiro_parcelas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `financeiro_parcelas` (
    `id` int NOT NULL AUTO_INCREMENT,
    `uuid` char(36) NOT NULL,
    `parcela` int NOT NULL,
    `valor` decimal(10, 2) NOT NULL,
    `data_vencimento` date NOT NULL,
    `data_pagamento` date DEFAULT NULL,
    `situacao` enum(
        'PAGA',
        'PENDENTE',
        'VENCIDA',
        'ARQUIVADO'
    ) NOT NULL,
    `comprovante` varchar(255) DEFAULT NULL,
    `observacao` varchar(255) DEFAULT NULL,
    `financeiroId` int DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `FK_caae013a51227ee253bef721795` (`financeiroId`),
    CONSTRAINT `FK_caae013a51227ee253bef721795` FOREIGN KEY (`financeiroId`) REFERENCES `financeiro` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 29 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `financeiro_parcelas`
--

LOCK TABLES `financeiro_parcelas` WRITE;
/*!40000 ALTER TABLE `financeiro_parcelas` DISABLE KEYS */
;

INSERT INTO
    `financeiro_parcelas`
VALUES (
        1,
        '96b9af97-9480-4714-b632-3d7b931e24c8',
        1,
        350.00,
        '2024-06-30',
        NULL,
        'PENDENTE',
        NULL,
        NULL,
        1
    ),
    (
        2,
        '50652886-db9a-4bbf-b2cb-6494985bb1fe',
        1,
        235.00,
        '2024-06-30',
        NULL,
        'PENDENTE',
        NULL,
        NULL,
        2
    ),
    (
        3,
        '2ebe1931-98dc-4783-be2f-4be2dc543134',
        1,
        725.00,
        '2024-06-01',
        NULL,
        'VENCIDA',
        NULL,
        NULL,
        3
    ),
    (
        4,
        'f1ba05e8-18e8-40d1-b708-516484547605',
        1,
        84.00,
        '2024-06-01',
        NULL,
        'PENDENTE',
        NULL,
        NULL,
        4
    ),
    (
        5,
        '0a68b834-21e7-4abe-b5f6-62994a66c7c2',
        1,
        63.00,
        '2024-05-31',
        NULL,
        'VENCIDA',
        NULL,
        NULL,
        5
    ),
    (
        6,
        'e3799d87-c4d6-4d6f-bb30-f12314dd0947',
        1,
        100.00,
        '2024-06-30',
        NULL,
        'PENDENTE',
        NULL,
        NULL,
        6
    ),
    (
        7,
        '502eca2c-1d20-46fa-b2ae-70243d971546',
        2,
        100.00,
        '2024-07-30',
        NULL,
        'PENDENTE',
        NULL,
        NULL,
        6
    ),
    (
        8,
        'f3bbc16c-4840-4f08-9857-6c08a7596d4a',
        3,
        100.00,
        '2024-08-30',
        NULL,
        'PENDENTE',
        NULL,
        NULL,
        6
    ),
    (
        9,
        '9c5e2a3d-a655-49f5-9716-14e4908031f2',
        4,
        100.00,
        '2024-09-30',
        NULL,
        'PENDENTE',
        NULL,
        NULL,
        6
    ),
    (
        10,
        '1a2705e8-601d-4fb4-85a7-e429807c2b47',
        5,
        100.00,
        '2024-10-30',
        NULL,
        'PENDENTE',
        NULL,
        NULL,
        6
    ),
    (
        11,
        'dbe8d4f2-35e5-40a4-ba3c-b4278d9597ec',
        6,
        100.00,
        '2024-11-30',
        NULL,
        'PENDENTE',
        NULL,
        NULL,
        6
    ),
    (
        12,
        '30fdbc42-f26b-4163-89eb-9dd7cec52cef',
        7,
        100.00,
        '2024-12-30',
        NULL,
        'PENDENTE',
        NULL,
        NULL,
        6
    ),
    (
        13,
        '96005e93-ccec-4827-928e-d8be45d6d3f7',
        8,
        100.00,
        '2025-01-30',
        NULL,
        'PENDENTE',
        NULL,
        NULL,
        6
    ),
    (
        14,
        '9a459b93-61ae-4d6c-829e-7d854f1c7884',
        9,
        100.00,
        '2025-02-28',
        NULL,
        'PENDENTE',
        NULL,
        NULL,
        6
    ),
    (
        15,
        '12f34216-cff9-42aa-b891-4b07e7fca3a5',
        10,
        100.00,
        '2025-03-28',
        NULL,
        'PENDENTE',
        NULL,
        NULL,
        6
    ),
    (
        16,
        'ec4825c9-40a7-4c87-8474-610408594993',
        1,
        10.00,
        '2024-06-30',
        NULL,
        'PENDENTE',
        NULL,
        NULL,
        7
    ),
    (
        17,
        '1c55cb0e-57ee-4a20-83f0-e0beca9e500c',
        2,
        10.00,
        '2024-07-30',
        NULL,
        'PENDENTE',
        NULL,
        NULL,
        7
    ),
    (
        18,
        'b3916327-c8d6-4e4a-a131-6ccc9e0ab62d',
        3,
        10.00,
        '2024-08-30',
        NULL,
        'PENDENTE',
        NULL,
        NULL,
        7
    ),
    (
        19,
        'e6ad9684-47c2-4052-9f30-bf4dd14383cc',
        4,
        10.00,
        '2024-09-30',
        NULL,
        'PENDENTE',
        NULL,
        NULL,
        7
    ),
    (
        20,
        'e7df44d5-0559-49a7-a939-bfde3ff8765c',
        5,
        10.00,
        '2024-10-30',
        NULL,
        'PENDENTE',
        NULL,
        NULL,
        7
    ),
    (
        21,
        '9a4fecec-e982-4a94-9d5c-4f7ca86fa4ba',
        6,
        10.00,
        '2024-11-30',
        NULL,
        'PENDENTE',
        NULL,
        NULL,
        7
    ),
    (
        22,
        '132eff08-6754-46d1-9cd7-aec6e88bda76',
        7,
        10.00,
        '2024-12-30',
        NULL,
        'PENDENTE',
        NULL,
        NULL,
        7
    ),
    (
        23,
        '4a098550-154f-420b-a71f-3686e57d310c',
        8,
        10.00,
        '2025-01-30',
        NULL,
        'PENDENTE',
        NULL,
        NULL,
        7
    ),
    (
        24,
        '289be0c0-d4fe-4905-84e7-c6bbedb80592',
        9,
        10.00,
        '2025-02-28',
        NULL,
        'PENDENTE',
        NULL,
        NULL,
        7
    ),
    (
        25,
        '05a03253-9ca4-4702-af8e-bc6496552191',
        10,
        10.00,
        '2025-03-28',
        NULL,
        'PENDENTE',
        NULL,
        NULL,
        7
    ),
    (
        26,
        'fab251c9-06c0-44f8-a04b-6c8e3bae0a85',
        1,
        150.00,
        '2024-06-30',
        '2024-06-30',
        'PAGA',
        '8da3a9ce-4fa4-4d51-bd0e-1de358421c7d-1.jpeg',
        'null',
        8
    ),
    (
        28,
        '5820dc12-0b16-4a50-8046-7a2f797986ae',
        1,
        1500.00,
        '2024-06-30',
        '2024-06-22',
        'PAGA',
        NULL,
        'null',
        9
    );
/*!40000 ALTER TABLE `financeiro_parcelas` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `fornecedores`
--

DROP TABLE IF EXISTS `fornecedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `fornecedores` (
    `id` int NOT NULL AUTO_INCREMENT,
    `uuid` char(36) NOT NULL,
    `nome` varchar(100) NOT NULL,
    `email` varchar(50) NOT NULL,
    `telefone` varchar(50) NOT NULL,
    `documento` varchar(20) NOT NULL,
    `estado` varchar(2) DEFAULT NULL,
    `cidade` varchar(100) DEFAULT NULL,
    `endereco` varchar(100) DEFAULT NULL,
    `complemento` varchar(255) DEFAULT NULL,
    `situacao` enum('ATIVO', 'INATIVO') NOT NULL,
    `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `data_atualizacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `fornecedores`
--

LOCK TABLES `fornecedores` WRITE;
/*!40000 ALTER TABLE `fornecedores` DISABLE KEYS */
;
/*!40000 ALTER TABLE `fornecedores` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `modulos`
--

DROP TABLE IF EXISTS `modulos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `modulos` (
    `id` int NOT NULL AUTO_INCREMENT,
    `uuid` char(36) NOT NULL,
    `nome` varchar(50) NOT NULL,
    `situacao` enum('ATIVO', 'INATIVO') NOT NULL DEFAULT 'ATIVO',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `modulos`
--

LOCK TABLES `modulos` WRITE;
/*!40000 ALTER TABLE `modulos` DISABLE KEYS */
;

INSERT INTO
    `modulos`
VALUES (
        1,
        '27526d6e-4dd4-4c41-af04-515321a4737b',
        'Financeiro',
        'ATIVO'
    ),
    (
        2,
        '2f958501-6850-46e9-91ae-62176abd7b8c',
        'Recursos Humanos',
        'ATIVO'
    ),
    (
        3,
        'f7c1af80-05af-4839-9b81-bd8a9c38faaa',
        'Clientes',
        'ATIVO'
    ),
    (
        4,
        '92217e8c-fb1c-413f-8cb4-b26ceade72d3',
        'Usuários',
        'ATIVO'
    ),
    (
        5,
        '3d89b130-ff05-4bef-8e3e-53f5921c5164',
        'Setores',
        'ATIVO'
    );
/*!40000 ALTER TABLE `modulos` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `os`
--

DROP TABLE IF EXISTS `os`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `os` (
    `id` int NOT NULL AUTO_INCREMENT,
    `uuid` char(36) NOT NULL,
    `descricao` varchar(255) NOT NULL,
    `situacao` enum('ATIVO', 'INATIVO') NOT NULL,
    `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `data_atualizacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `cliente_id` int NOT NULL,
    `setor_id` int DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `FK_924ec33d218efb6f0e8e81e6e61` (`cliente_id`),
    KEY `FK_9bd2a1c1d1e00fe875fc81e94f7` (`setor_id`),
    CONSTRAINT `FK_924ec33d218efb6f0e8e81e6e61` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE,
    CONSTRAINT `FK_9bd2a1c1d1e00fe875fc81e94f7` FOREIGN KEY (`setor_id`) REFERENCES `setores` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `os`
--

LOCK TABLES `os` WRITE;
/*!40000 ALTER TABLE `os` DISABLE KEYS */
;
/*!40000 ALTER TABLE `os` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `oss`
--

DROP TABLE IF EXISTS `oss`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `oss` (
    `id` int NOT NULL AUTO_INCREMENT,
    `uuid` char(36) NOT NULL,
    `quantidade` int NOT NULL DEFAULT '1',
    `situacao` enum('ATIVO', 'INATIVO') NOT NULL DEFAULT 'INATIVO',
    `observacao` varchar(255) DEFAULT NULL,
    `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `data_atualizacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `os_id` int NOT NULL,
    `servico_id` int NOT NULL,
    PRIMARY KEY (`id`),
    KEY `FK_21245e71dcdd75dce110722566c` (`os_id`),
    KEY `FK_85dd5e4ed5cfe94424577e9a26a` (`servico_id`),
    CONSTRAINT `FK_21245e71dcdd75dce110722566c` FOREIGN KEY (`os_id`) REFERENCES `os` (`id`) ON DELETE CASCADE,
    CONSTRAINT `FK_85dd5e4ed5cfe94424577e9a26a` FOREIGN KEY (`servico_id`) REFERENCES `servicos` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `oss`
--

LOCK TABLES `oss` WRITE;
/*!40000 ALTER TABLE `oss` DISABLE KEYS */
;
/*!40000 ALTER TABLE `oss` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `projetos`
--

DROP TABLE IF EXISTS `projetos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `projetos` (
    `id` int NOT NULL AUTO_INCREMENT,
    `uuid` char(36) NOT NULL,
    `responsavel` text,
    `orcamento` decimal(10, 2) NOT NULL,
    `data_inicio` date NOT NULL,
    `data_fim` date NOT NULL,
    `observacao` text,
    `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `data_atualizacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `cliente_id` int NOT NULL,
    `setor_id` int NOT NULL,
    `situacao` enum('ATIVO', 'INATIVO') NOT NULL DEFAULT 'ATIVO',
    PRIMARY KEY (`id`),
    KEY `FK_9fecf68c32703585c72b8b8ed9f` (`cliente_id`),
    KEY `FK_30eea3c64125b15a1170b5c92c6` (`setor_id`),
    CONSTRAINT `FK_30eea3c64125b15a1170b5c92c6` FOREIGN KEY (`setor_id`) REFERENCES `setores` (`id`) ON DELETE CASCADE,
    CONSTRAINT `FK_9fecf68c32703585c72b8b8ed9f` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `projetos`
--

LOCK TABLES `projetos` WRITE;
/*!40000 ALTER TABLE `projetos` DISABLE KEYS */
;
/*!40000 ALTER TABLE `projetos` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `projetos_atividades`
--

DROP TABLE IF EXISTS `projetos_atividades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `projetos_atividades` (
    `id` int NOT NULL AUTO_INCREMENT,
    `uuid` char(36) NOT NULL,
    `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `data_atualizacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `descricao` varchar(255) NOT NULL,
    `prioridade` int NOT NULL DEFAULT '0',
    `situacao` enum(
        'PENDING',
        'IN_PROGRESS',
        'CANCELLED',
        'PAUSED',
        'COMPLETED'
    ) NOT NULL,
    `data_inicio` date NOT NULL,
    `data_fim` date NOT NULL,
    `observacao` text,
    `projeto_id` int DEFAULT NULL,
    `setor_id` int DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `FK_466a827d309d555c2d5ca7ab62a` (`projeto_id`),
    KEY `FK_61d6d9707b0aa051c464c301b6e` (`setor_id`),
    CONSTRAINT `FK_466a827d309d555c2d5ca7ab62a` FOREIGN KEY (`projeto_id`) REFERENCES `projetos` (`id`) ON DELETE CASCADE,
    CONSTRAINT `FK_61d6d9707b0aa051c464c301b6e` FOREIGN KEY (`setor_id`) REFERENCES `setores` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `projetos_atividades`
--

LOCK TABLES `projetos_atividades` WRITE;
/*!40000 ALTER TABLE `projetos_atividades` DISABLE KEYS */
;
/*!40000 ALTER TABLE `projetos_atividades` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `roles` (
    `id` int NOT NULL AUTO_INCREMENT,
    `uuid` char(36) NOT NULL,
    `nome` varchar(50) NOT NULL,
    `situacao` enum('ATIVO', 'INATIVO') NOT NULL DEFAULT 'ATIVO',
    `moduloId` int DEFAULT NULL,
    `descricao` varchar(100) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `FK_85ca92b8a49f76ef6c50fc9fe73` (`moduloId`),
    CONSTRAINT `FK_85ca92b8a49f76ef6c50fc9fe73` FOREIGN KEY (`moduloId`) REFERENCES `modulos` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 42 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */
;

INSERT INTO
    `roles`
VALUES (
        25,
        '6185dd79-7f6f-4b0c-b8e5-929dc1a08526',
        'CADASTRAR_CLIENTE',
        'ATIVO',
        3,
        'Cadastrar cliente'
    ),
    (
        26,
        'e992b054-48f7-402d-b578-0297c4d20882',
        'LISTAR_CLIENTE',
        'ATIVO',
        3,
        'Listar cliente'
    ),
    (
        27,
        'd51f6965-4f7a-4f5e-a73f-325fc66c3178',
        'EXCLUIR_CLIENTE',
        'ATIVO',
        3,
        'Exlcuir cliente'
    ),
    (
        28,
        'f38eb7c3-b9b7-426a-a8a0-1f95d0f70919',
        'EDITAR_CLIENTE',
        'ATIVO',
        3,
        'Editar cliente'
    ),
    (
        32,
        '999fc916-06dd-4123-be7c-51f92375a6da',
        'EDITAR_USUARIO',
        'ATIVO',
        4,
        'Editar Usuário'
    ),
    (
        33,
        'abd10c30-f103-4c23-8bc3-4f1ed51c628c',
        'LISTAR_USUARIO',
        'ATIVO',
        4,
        'Listar Usuário'
    ),
    (
        34,
        'a391e26f-01d9-44b9-b3ea-58397c52d230',
        'EXCLUIR_USUARIO',
        'ATIVO',
        4,
        'Excluir Usuário'
    ),
    (
        35,
        'f2a14453-8765-4732-af4e-d70aaf0f3f59',
        'CADASTRAR_USUARIO',
        'ATIVO',
        4,
        'Cadastrar Usuário'
    ),
    (
        36,
        'cbe05497-ac5f-47b1-95e4-2c08d857a4d0',
        'MASTER',
        'ATIVO',
        4,
        'Permissão completa'
    ),
    (
        37,
        '2165704b-cbb0-4065-ac93-b4506cd817b3',
        'SETOR_LISTAR',
        'ATIVO',
        5,
        'Listar setores'
    ),
    (
        38,
        '1e55f509-06ce-4085-b3b4-84a0bcf94789',
        'SETOR_EXIBIR',
        'ATIVO',
        5,
        'Exibir setor'
    ),
    (
        39,
        '679672d8-f262-40a2-8698-d5558885f0ca',
        'SETOR_CADASTRAR',
        'ATIVO',
        5,
        'Cadastrar setor'
    ),
    (
        40,
        'feadbd35-0ca0-43e1-a30a-8b661087142a',
        'SETOR_EDITAR',
        'ATIVO',
        5,
        'Editar setor'
    ),
    (
        41,
        'c3b74e3b-8c99-4bc0-8221-d5d4f9a27756',
        'SETOR_EXCLUIR',
        'ATIVO',
        5,
        'Excluir setor'
    );
/*!40000 ALTER TABLE `roles` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `servicos`
--

DROP TABLE IF EXISTS `servicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `servicos` (
    `id` int NOT NULL AUTO_INCREMENT,
    `uuid` char(36) NOT NULL,
    `descricao` varchar(255) NOT NULL,
    `situacao` enum('ATIVO', 'INATIVO') NOT NULL,
    `valor` decimal(10, 2) NOT NULL,
    `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `data_atualizacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `contrato_id` int DEFAULT NULL,
    `setor_id` int DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `FK_7b80741fec5891bf8de4bd87cf8` (`contrato_id`),
    KEY `FK_462d2f8ed3158ff35e35b87ce9a` (`setor_id`),
    CONSTRAINT `FK_462d2f8ed3158ff35e35b87ce9a` FOREIGN KEY (`setor_id`) REFERENCES `setores` (`id`) ON DELETE CASCADE,
    CONSTRAINT `FK_7b80741fec5891bf8de4bd87cf8` FOREIGN KEY (`contrato_id`) REFERENCES `contratos` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `servicos`
--

LOCK TABLES `servicos` WRITE;
/*!40000 ALTER TABLE `servicos` DISABLE KEYS */
;
/*!40000 ALTER TABLE `servicos` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `setores`
--

DROP TABLE IF EXISTS `setores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `setores` (
    `id` int NOT NULL AUTO_INCREMENT,
    `uuid` char(36) NOT NULL,
    `descricao` varchar(255) NOT NULL,
    `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `data_atualizacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `situacao` enum('ATIVO', 'INATIVO') NOT NULL DEFAULT 'ATIVO',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `setores`
--

LOCK TABLES `setores` WRITE;
/*!40000 ALTER TABLE `setores` DISABLE KEYS */
;

INSERT INTO
    `setores`
VALUES (
        1,
        '40a4f152-6b4b-47d4-a3ed-71ee978fae73',
        'Adminsitrativo',
        '2024-06-01 12:02:33',
        '2024-06-01 12:02:33',
        'ATIVO'
    ),
    (
        2,
        'ed8506a9-1fd6-4372-8b3b-c6c26a4529c2',
        'Engenharia civil',
        '2024-06-01 12:02:50',
        '2024-06-01 12:02:50',
        'ATIVO'
    ),
    (
        3,
        '5977a9e0-98eb-4488-9849-a2841b137b3f',
        'Meio Ambiente',
        '2024-06-01 12:03:01',
        '2024-06-01 12:03:01',
        'ATIVO'
    ),
    (
        4,
        '450110b7-96a0-4cc4-bf94-7814335f1b2e',
        'Segurança no Trabalho',
        '2024-06-01 12:03:10',
        '2024-06-01 12:03:10',
        'ATIVO'
    );
/*!40000 ALTER TABLE `setores` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `usuarios` (
    `id` int NOT NULL AUTO_INCREMENT,
    `uuid` char(36) NOT NULL,
    `nome` varchar(255) NOT NULL,
    `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `data_atualizacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `email` varchar(100) NOT NULL,
    `username` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `situacao` enum('ATIVO', 'INATIVO') NOT NULL DEFAULT 'ATIVO',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 65 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */
;

INSERT INTO
    `usuarios`
VALUES (
        63,
        '7748082e-ef3e-443c-b210-392c197933a8',
        'Master',
        '2024-06-15 17:06:58',
        '2024-06-19 00:09:15',
        'master@gmail.com',
        'master@gmail.com',
        '$2b$10$D1RecLO/LMOvIZ222PmDA.TR3wFpx4RwekAI7B3/ABP4La4.mgdX2',
        'ATIVO'
    ),
    (
        64,
        '9b571e9e-646c-4cbc-991a-8cdc4ea81104',
        'Funcionario Fulano',
        '2024-06-16 21:20:57',
        '2024-06-16 21:21:53',
        'funcionario@teste.com',
        'funcionario@teste.com',
        '$2b$10$tpB.CrDMB//luVCA0eGbAOrfwNBcZaowuL8KmEkb3lFk8pynoJlCW',
        'ATIVO'
    );
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `usuarios_roles`
--

DROP TABLE IF EXISTS `usuarios_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `usuarios_roles` (
    `role_id` int NOT NULL,
    `id` int NOT NULL AUTO_INCREMENT,
    `uuid` char(36) NOT NULL,
    `usuarioId` int DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `FK_25bde7adfa5d3084b099da64769` (`role_id`),
    KEY `FK_8a1065c1be08623ec6bdf6af991` (`usuarioId`),
    CONSTRAINT `FK_25bde7adfa5d3084b099da64769` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
    CONSTRAINT `FK_8a1065c1be08623ec6bdf6af991` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 280 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `usuarios_roles`
--

LOCK TABLES `usuarios_roles` WRITE;
/*!40000 ALTER TABLE `usuarios_roles` DISABLE KEYS */
;

INSERT INTO
    `usuarios_roles`
VALUES (
        36,
        273,
        '4d85557e-7dde-472f-90c4-960a3e7854ee',
        63
    ),
    (
        37,
        275,
        '431d9ee1-8dbb-4ff4-8894-b8119984eb53',
        64
    ),
    (
        25,
        276,
        'b5ff6dd8-9ba7-4016-a768-0939e42686f9',
        63
    ),
    (
        26,
        277,
        '393a919c-35c6-40fb-98be-b6be5a0653f6',
        63
    ),
    (
        27,
        278,
        'ccbebf1c-409a-4458-8c1b-7c08b5627d50',
        63
    ),
    (
        28,
        279,
        '4d617835-cf18-4eab-9a87-0e7ce0c2c454',
        63
    );
/*!40000 ALTER TABLE `usuarios_roles` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Dumping routines for database 'erp'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;

-- Dump completed on 2024-06-22 21:30:49