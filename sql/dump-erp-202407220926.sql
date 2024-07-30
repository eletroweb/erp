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
);
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
    `cep` varchar(9) NOT NULL,
    `bairro` varchar(255) DEFAULT NULL,
    `numero` varchar(255) DEFAULT NULL,
    `situacao` enum('ATIVO', 'INATIVO') NOT NULL,
    `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `data_atualizacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `setor_id` int DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `FK_788e6db8c862f167114a4850603` (`setor_id`),
    CONSTRAINT `FK_788e6db8c862f167114a4850603` FOREIGN KEY (`setor_id`) REFERENCES `setores` (`id`) ON DELETE CASCADE
);
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
);
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
);
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
);
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `contratos`
--

LOCK TABLES `contratos` WRITE;
/*!40000 ALTER TABLE `contratos` DISABLE KEYS */
;

INSERT INTO
    `contratos`
VALUES (
        1,
        '632fb75f-6f12-4d81-a186-bfe02a5dc22f',
        'Contrato 1',
        1,
        100.00,
        '2024-01-01 03:00:00',
        '2024-12-01 03:00:00',
        '2024-07-08 01:09:59',
        '2024-07-08 01:09:59'
    ),
    (
        2,
        '48b3f2e8-1cea-4afb-8899-248dedc5b5bd',
        'Contrato 2',
        1,
        150000.00,
        '2024-01-01 03:00:00',
        '2024-12-30 03:00:00',
        '2024-07-18 00:23:38',
        '2024-07-18 00:23:38'
    );
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
    `uuid` char(36) DEFAULT NULL,
    `razaoSocial` varchar(255) NOT NULL,
    `nomeFantasia` varchar(255) NOT NULL,
    `logomarca` varchar(255) DEFAULT NULL,
    `situacao` enum('ATIVO', 'INATIVO') NOT NULL DEFAULT 'ATIVO',
    `usuarioId` int DEFAULT NULL,
    `cnpj` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `cep` varchar(255) NOT NULL,
    `estado` varchar(255) NOT NULL,
    `cidade` varchar(255) NOT NULL,
    `endereco` varchar(255) NOT NULL,
    `numero` varchar(255) NOT NULL,
    `complemento` varchar(255) DEFAULT NULL,
    `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `data_atualizacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `IDX_bca01e81336515f4cebb70bb67` (`razaoSocial`),
    UNIQUE KEY `IDX_9614cd4c5235257aba92cb6b66` (`nomeFantasia`),
    UNIQUE KEY `IDX_f5ed71aeb4ef47f95df5f8830b` (`cnpj`),
    UNIQUE KEY `REL_ce30afa75c4fbd4697af6ea062` (`usuarioId`),
    CONSTRAINT `FK_ce30afa75c4fbd4697af6ea0621` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`)
);
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
        88,
        '869633a7-1f6d-43c0-afe2-ceca71d8b9f5',
        '1',
        '2',
        '5305e92c-5276-4112-9636-1738243f2eba.png',
        'ATIVO',
        278,
        '3',
        '4',
        '65',
        '6',
        '7',
        '8',
        '9',
        '10',
        '2024-07-08 00:14:01',
        '2024-07-08 00:14:09'
    ),
    (
        89,
        '7e7308af-5713-4da3-81cb-202d4b58fde2',
        '123',
        '23',
        '7f9c9267-a2f5-41e4-8dff-cd3e723878f8.png',
        'ATIVO',
        279,
        '23',
        '23',
        '2',
        '2',
        '2',
        '2',
        '2',
        '2',
        '2024-07-08 00:47:06',
        '2024-07-08 00:47:22'
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
    `usuarioId` int DEFAULT NULL,
    `empresaId` int DEFAULT NULL,
    `proprietario` tinyint NOT NULL DEFAULT '0',
    PRIMARY KEY (`id`),
    KEY `FK_410eb25d6f00f36a09ab1346ef9` (`usuarioId`),
    KEY `FK_43c45348b6f55f0273dd51f167c` (`empresaId`),
    CONSTRAINT `FK_410eb25d6f00f36a09ab1346ef9` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`),
    CONSTRAINT `FK_43c45348b6f55f0273dd51f167c` FOREIGN KEY (`empresaId`) REFERENCES `empresas` (`id`)
);
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `empresas_usuarios`
--

LOCK TABLES `empresas_usuarios` WRITE;
/*!40000 ALTER TABLE `empresas_usuarios` DISABLE KEYS */
;

INSERT INTO `empresas_usuarios` VALUES (62, 278, 88, 1), (63, 279, 89, 1);
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
);
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
    `empresaId` int DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `FK_9462c6a416498ce097ad5d89bfb` (`setor_id`),
    KEY `FK_c0da56ad28dc57040b60b2b5978` (`contrato_id`),
    KEY `FK_0d97adf202b22995b4ea97cf9a3` (`empresaId`),
    CONSTRAINT `FK_0d97adf202b22995b4ea97cf9a3` FOREIGN KEY (`empresaId`) REFERENCES `empresas` (`id`),
    CONSTRAINT `FK_9462c6a416498ce097ad5d89bfb` FOREIGN KEY (`setor_id`) REFERENCES `setores` (`id`) ON DELETE CASCADE,
    CONSTRAINT `FK_c0da56ad28dc57040b60b2b5978` FOREIGN KEY (`contrato_id`) REFERENCES `contratos` (`id`) ON DELETE CASCADE
);
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
        4,
        'c5278fc0-1bcb-46aa-bd88-ba9c02de0276',
        'DESPESA',
        'VARIAVEL',
        'Brisanet',
        'Brisanet',
        NULL,
        '2024-07-25 00:00:00',
        '2024-07-17 22:05:58',
        '104.6',
        0,
        1,
        'PAGA',
        1,
        1,
        89
    ),
    (
        5,
        '14e803fb-5d6b-4ea5-9678-c8e19152299c',
        'DESPESA',
        'VARIAVEL',
        'Água',
        'Cagepa',
        NULL,
        '2024-07-10 00:00:00',
        '2024-07-18 09:02:54',
        '92.04',
        0,
        1,
        'PAGA',
        1,
        1,
        89
    ),
    (
        6,
        '89ecec75-d458-4d2d-a10b-30c15eaa55ef',
        'DESPESA',
        'VARIAVEL',
        'Aluguel ',
        '0',
        NULL,
        '2024-07-24 00:00:00',
        NULL,
        '2200',
        0,
        1,
        'PAGA',
        1,
        1,
        89
    ),
    (
        7,
        '3a151938-2cd7-4bb7-ac0c-c586a46df364',
        'DESPESA',
        'VARIAVEL',
        'Energia',
        'Copel',
        NULL,
        '2024-07-16 00:00:00',
        NULL,
        '72',
        0,
        1,
        'PAGA',
        1,
        1,
        89
    ),
    (
        8,
        '6fb47090-62c5-4885-ad12-db24da73460d',
        'DESPESA',
        'VARIAVEL',
        'Internet',
        'TelecomFoz',
        NULL,
        '2024-07-25 00:00:00',
        NULL,
        '103',
        0,
        1,
        'PENDENTE',
        1,
        1,
        89
    ),
    (
        9,
        '3ba88751-29b5-4e76-abbd-7c7c08a2e35f',
        'DESPESA',
        'VARIAVEL',
        'Internet Móvel',
        'Vivo',
        NULL,
        '2024-07-23 00:00:00',
        NULL,
        '156.99',
        0,
        1,
        'PAGA',
        1,
        1,
        89
    ),
    (
        11,
        '015657bb-3877-4216-ae7f-ccc6db35912d',
        'RECEITA',
        'VARIAVEL',
        'Salário',
        'Empresa 1',
        NULL,
        '2024-07-01 00:00:00',
        '2024-07-19 23:53:20',
        '2500',
        0,
        1,
        'PAGA',
        NULL,
        1,
        89
    ),
    (
        14,
        '4eb2601d-a73f-419f-b441-0761e913a3a8',
        'RECEITA',
        'VARIAVEL',
        'Exemplo Simples',
        '0',
        '1',
        '2024-07-19 00:00:00',
        '2024-07-19 23:47:32',
        '100',
        1,
        4,
        'PAGA',
        2,
        NULL,
        89
    ),
    (
        15,
        '81670d63-b16b-48ca-a58a-63985142ba9c',
        'RECEITA',
        'VARIAVEL',
        'Exemplo 1',
        '12323',
        NULL,
        '2024-07-19 00:00:00',
        '2024-07-19 23:51:45',
        '100',
        1,
        5,
        'PAGA',
        1,
        NULL,
        89
    ),
    (
        17,
        'ab1b54eb-6d03-47d2-8270-f2d1bab17d00',
        'RECEITA',
        'VARIAVEL',
        'Receita Exemplo 2',
        '0',
        NULL,
        '2024-07-10 00:00:00',
        NULL,
        '1000',
        1,
        4,
        'VENCIDA',
        1,
        NULL,
        89
    ),
    (
        18,
        '1ab6f219-7e15-4fef-ad52-c127bdd36ee7',
        'RECEITA',
        'VARIAVEL',
        'Salário',
        'Accenture',
        NULL,
        '2024-07-31 00:00:00',
        '2024-07-21 23:08:00',
        '2500',
        0,
        2,
        'PAGA',
        1,
        NULL,
        89
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
);
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
        54,
        '325b6851-23b3-430c-aa92-8c85e1b9f565',
        1,
        104.60,
        '2024-07-10',
        '2024-07-17',
        'PAGA',
        'c5278fc0-1bcb-46aa-bd88-ba9c02de0276-1.jpeg',
        'null',
        4
    ),
    (
        56,
        '0683b9b1-0f16-4799-b4ab-9739ddb604fe',
        1,
        92.04,
        '2024-10-07',
        '2024-07-18',
        'PAGA',
        '14e803fb-5d6b-4ea5-9678-c8e19152299c-1.jpeg',
        'null',
        5
    ),
    (
        57,
        '996be1d5-8282-412f-baa5-0633bced5518',
        1,
        2200.00,
        '2024-07-01',
        NULL,
        'PENDENTE',
        NULL,
        NULL,
        6
    ),
    (
        58,
        '529985c4-14c9-4e76-8ed6-f9aaa2bcdbfb',
        1,
        72.00,
        '2024-07-16',
        NULL,
        'VENCIDA',
        NULL,
        NULL,
        7
    ),
    (
        59,
        '812a8b7f-5ce4-4bcb-bf81-0ff679c1586e',
        1,
        103.00,
        '2024-07-16',
        NULL,
        'VENCIDA',
        NULL,
        NULL,
        8
    ),
    (
        60,
        '110786e2-66f9-4952-ab5b-87a5f3dc2d0a',
        1,
        156.99,
        '2024-07-17',
        NULL,
        'VENCIDA',
        NULL,
        NULL,
        9
    ),
    (
        186,
        '1b8cf7ce-8b52-4b59-81b4-974a0e779072',
        1,
        2500.00,
        '2024-07-01',
        '2024-07-20',
        'PAGA',
        NULL,
        'null',
        11
    ),
    (
        187,
        'f425e07a-87ef-4e37-9aaf-8b5983355b60',
        1,
        25.00,
        '2024-07-19',
        '2024-07-19',
        'PAGA',
        NULL,
        'null',
        14
    ),
    (
        188,
        '3493dfcb-0ca6-473a-9290-ed21644c3ecc',
        2,
        25.00,
        '2024-08-19',
        '2024-07-19',
        'PAGA',
        NULL,
        'null',
        14
    ),
    (
        189,
        'f8a3f66d-6482-4326-9b80-cd1505d51d54',
        3,
        25.00,
        '2024-09-19',
        '2024-07-20',
        'PAGA',
        NULL,
        'null',
        14
    ),
    (
        190,
        '05a4f68b-4dc0-47b9-b6a4-ab9c11cdde6a',
        4,
        25.00,
        '2024-10-19',
        '2024-07-20',
        'PAGA',
        NULL,
        'null',
        14
    ),
    (
        191,
        'b9dbb387-11e1-46be-b1ee-a0d6d65b646d',
        1,
        20.00,
        '2024-07-19',
        '2024-07-01',
        'PAGA',
        NULL,
        'null',
        15
    ),
    (
        192,
        '5dbdcd7b-237c-4ca2-a0ed-499cf58491a0',
        2,
        20.00,
        '2024-08-19',
        '2024-07-02',
        'PAGA',
        NULL,
        'null',
        15
    ),
    (
        193,
        'd009b3ae-d1e5-4f04-8bb7-1aaa97d04db4',
        3,
        20.00,
        '2024-09-19',
        '2024-07-03',
        'PAGA',
        NULL,
        'null',
        15
    ),
    (
        194,
        '85daab6b-9960-423c-92da-36516d3e98e0',
        4,
        20.00,
        '2024-10-19',
        '2024-07-04',
        'PAGA',
        NULL,
        'null',
        15
    ),
    (
        195,
        '01891d77-3b62-481f-9ac0-a2d76c096b55',
        5,
        20.00,
        '2024-11-19',
        '2024-07-05',
        'PAGA',
        NULL,
        'null',
        15
    ),
    (
        239,
        'cbc1a12c-6060-4a2f-abc1-80b237b918b3',
        1,
        250.00,
        '2024-07-10',
        NULL,
        'VENCIDA',
        NULL,
        NULL,
        17
    ),
    (
        240,
        '71ac578a-f5a1-47af-a3b6-8e68e3efdee7',
        2,
        250.00,
        '2024-08-10',
        NULL,
        'PENDENTE',
        NULL,
        NULL,
        17
    ),
    (
        241,
        '9d72505a-083d-42b7-814e-e0990e468ef0',
        3,
        250.00,
        '2024-09-10',
        NULL,
        'PENDENTE',
        NULL,
        NULL,
        17
    ),
    (
        242,
        'e70fe571-d21c-4689-8948-9b4c514c47a5',
        4,
        250.00,
        '2024-10-10',
        NULL,
        'PENDENTE',
        NULL,
        NULL,
        17
    ),
    (
        261,
        'df2e6da7-375d-4c8e-a973-1362c92b3329',
        1,
        1250.00,
        '2024-07-31',
        NULL,
        'PENDENTE',
        NULL,
        NULL,
        18
    ),
    (
        262,
        '49249074-0f0c-4896-8bec-a9c2d6da79da',
        2,
        1250.00,
        '2024-08-31',
        NULL,
        'PENDENTE',
        NULL,
        NULL,
        18
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
    `empresaId` int DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `FK_c1e027ed0d8c7af187565393616` (`empresaId`),
    CONSTRAINT `FK_c1e027ed0d8c7af187565393616` FOREIGN KEY (`empresaId`) REFERENCES `empresas` (`id`)
);
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
);
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
);
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
);
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
    `situacao` enum('ATIVO', 'INATIVO') NOT NULL DEFAULT 'ATIVO',
    `orcamento` decimal(10, 2) NOT NULL,
    `data_inicio` date NOT NULL,
    `data_fim` date NOT NULL,
    `observacao` text,
    `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `data_atualizacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `cliente_id` int NOT NULL,
    `setor_id` int NOT NULL,
    PRIMARY KEY (`id`),
    KEY `FK_9fecf68c32703585c72b8b8ed9f` (`cliente_id`),
    KEY `FK_30eea3c64125b15a1170b5c92c6` (`setor_id`),
    CONSTRAINT `FK_30eea3c64125b15a1170b5c92c6` FOREIGN KEY (`setor_id`) REFERENCES `setores` (`id`) ON DELETE CASCADE,
    CONSTRAINT `FK_9fecf68c32703585c72b8b8ed9f` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE
);
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
);
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
);
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
);
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
    `situacao` enum('ATIVO', 'INATIVO') NOT NULL DEFAULT 'ATIVO',
    `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `data_atualizacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `empresaId` int DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `FK_32e02144bde7c8b0b6a52393a4c` (`empresaId`),
    CONSTRAINT `FK_32e02144bde7c8b0b6a52393a4c` FOREIGN KEY (`empresaId`) REFERENCES `empresas` (`id`)
);
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
        'c84b22bc-1fdb-4707-819c-9fda504187bc',
        'Administração',
        'ATIVO',
        '2024-07-08 00:55:02',
        '2024-07-08 00:56:54',
        89
    ),
    (
        2,
        '5451342f-6a14-490f-9104-9b5d54849948',
        'Engenharia civil',
        'ATIVO',
        '2024-07-08 00:55:06',
        '2024-07-08 00:55:06',
        89
    ),
    (
        3,
        '6af6f44d-f1c9-42b4-95d7-ab9c83da3e0f',
        'Segurança do Trabalho',
        'ATIVO',
        '2024-07-08 01:05:53',
        '2024-07-08 01:05:53',
        89
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
    PRIMARY KEY (`id`),
    UNIQUE KEY `IDX_446adfc18b35418aac32ae0b7b` (`email`),
    UNIQUE KEY `IDX_9f78cfde576fc28f279e2b7a9c` (`username`)
);
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
        278,
        '5305e92c-5276-4112-9636-1738243f2eba',
        'Yonatha Alves Almesida',
        '2024-07-07 01:14:50',
        '2024-07-07 01:14:50',
        'yonathalmeida@gmail.com',
        'yonathalmeida',
        '$2b$10$zjyHGcjmcEq6cKKx7YKyIOhwH1ampej7KIMdwiPnmvk8BKHA2V6tC',
        'ATIVO'
    ),
    (
        279,
        '7f9c9267-a2f5-41e4-8dff-cd3e723878f8',
        'Master 1',
        '2024-07-08 00:45:15',
        '2024-07-18 10:30:43',
        'master@gmail.com',
        'master',
        '$2b$10$RBMOg55Daihywq8GLBUJX.1yiNafIenPCRnKQemsUJE/lq7OIo5uy',
        'ATIVO'
    ),
    (
        280,
        '4f3fc1e5-c065-48ed-896e-dee17704fe7f',
        'Master 2',
        '2024-07-21 18:32:15',
        '2024-07-21 18:32:15',
        'master2@gmail.com',
        'master2',
        '$2b$10$F/ExkCZsbBttdMU5psKxMuZf4dhaRRMZpgjrOEd.TX3QiEe8nVZ16',
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
);
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
        427,
        '90c8feb7-2b83-4c89-9f1e-5518174b3924',
        278
    ),
    (
        36,
        428,
        '7e784a2a-0ced-4687-a7e2-c2c8a22b4efe',
        279
    ),
    (
        28,
        429,
        'b17bedc5-9834-4b7e-bbcc-91e08cbf02eb',
        279
    ),
    (
        27,
        430,
        '429470dc-6d07-4812-9e55-b03bb1f134a8',
        279
    ),
    (
        26,
        431,
        'ae45e79d-57fe-4107-bd2e-82795c1ae59b',
        279
    ),
    (
        25,
        432,
        '200d6ebe-5cf6-4146-81c6-2279835a462c',
        279
    ),
    (
        36,
        433,
        'a9f54265-f750-4630-95c2-8e2cc2259e1a',
        280
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

-- Dump completed on 2024-07-22  9:26:50