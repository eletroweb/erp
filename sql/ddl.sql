-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: erp
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cliente_contratos`
--

DROP TABLE IF EXISTS `cliente_contratos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente_contratos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) DEFAULT (uuid()),
  `cliente_id` int DEFAULT NULL,
  `contrato_id` int DEFAULT NULL,
  `situacao` int DEFAULT '1',
  `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `cliente_id` (`cliente_id`),
  KEY `contrato_id` (`contrato_id`),
  CONSTRAINT `cliente_contratos_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cliente_contratos_ibfk_2` FOREIGN KEY (`contrato_id`) REFERENCES `contratos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente_contratos`
--

LOCK TABLES `cliente_contratos` WRITE;
/*!40000 ALTER TABLE `cliente_contratos` DISABLE KEYS */;
/*!40000 ALTER TABLE `cliente_contratos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) NOT NULL,
  `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `documento` varchar(20) NOT NULL,
  `estado` varchar(2) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `complemento` varchar(255) DEFAULT NULL,
  `setor_id` int DEFAULT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefone` varchar(50) NOT NULL,
  `endereco` varchar(100) DEFAULT NULL,
  `situacao` enum('1','0') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_788e6db8c862f167114a4850603` (`setor_id`),
  CONSTRAINT `FK_788e6db8c862f167114a4850603` FOREIGN KEY (`setor_id`) REFERENCES `setores` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (108,'e0d41f3f-0194-4086-95c9-bfba58b60439','2024-04-21 22:43:04','2024-05-07 23:47:45','06713832482','SP','Sao Paulo','Complemento A',50,'Cliente QA','clienteqa@email.com','83999999991','Rua A','1'),(114,'685e2d41-2853-4ec1-a43b-d0ff637f7181','2024-04-28 21:40:03','2024-05-07 23:47:49','06713832482','PB','João Pessoa','N 123, próximo do XPTO',51,'Cliente QA2','clienteqa2@email.com','83999999992','Rua Exemplo','1');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes_atributos`
--

DROP TABLE IF EXISTS `clientes_atributos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes_atributos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) DEFAULT (uuid()),
  `cliente_id` int DEFAULT NULL,
  `chave` varchar(255) DEFAULT NULL,
  `valor` varchar(255) DEFAULT NULL,
  `situacao` int DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `cliente_id` (`cliente_id`),
  CONSTRAINT `clientes_atributos_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes_atributos`
--

LOCK TABLES `clientes_atributos` WRITE;
/*!40000 ALTER TABLE `clientes_atributos` DISABLE KEYS */;
/*!40000 ALTER TABLE `clientes_atributos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colaboradores`
--

DROP TABLE IF EXISTS `colaboradores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
  `situacao` enum('1','0') NOT NULL,
  `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colaboradores`
--

LOCK TABLES `colaboradores` WRITE;
/*!40000 ALTER TABLE `colaboradores` DISABLE KEYS */;
/*!40000 ALTER TABLE `colaboradores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contratos`
--

DROP TABLE IF EXISTS `contratos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contratos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) NOT NULL,
  `situacao` int NOT NULL DEFAULT '1',
  `orcamento` decimal(10,2) NOT NULL,
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `descricao` varchar(100) NOT NULL,
  `data_inicio` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_fim` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contratos`
--

LOCK TABLES `contratos` WRITE;
/*!40000 ALTER TABLE `contratos` DISABLE KEYS */;
INSERT INTO `contratos` VALUES (37,'5a89144b-bdd1-4b6a-9034-a4f346b7bbd2',1,20000.00,'2024-03-10 22:24:02','2024-03-10 22:24:02','Contrato 1','2024-03-04 03:00:00','2024-03-10 22:24:02'),(38,'e5e6fc56-04ba-4b0f-9bf0-faba0ecfe1a6',1,20000.00,'2024-03-10 22:24:24','2024-03-10 22:24:24','Contrato 1','2024-03-04 03:00:00','2024-03-21 03:00:00'),(39,'861db6d4-0794-4fb6-afb4-0d3ee10da9c3',1,20000.00,'2024-03-13 23:50:19','2024-03-13 23:50:19','Contrato 1','2024-03-04 03:00:00','2024-03-13 23:50:19'),(40,'a5b93035-d7b1-4a4a-b009-690ca1a9c2eb',1,20000.00,'2024-03-13 23:50:36','2024-03-13 23:50:36','Contrato 1','2024-03-04 03:00:00','2024-03-21 03:00:00');
/*!40000 ALTER TABLE `contratos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `financeiro_financeiro`
--

DROP TABLE IF EXISTS `financeiro_financeiro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `financeiro_financeiro` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) NOT NULL,
  `tipo` enum('FIXA','VARIAVEL') NOT NULL DEFAULT 'VARIAVEL',
  `descricao` varchar(255) NOT NULL,
  `observacao` varchar(255) DEFAULT NULL,
  `data_vencimento` datetime DEFAULT NULL,
  `data_pagamento` datetime DEFAULT NULL,
  `valor_cobranca` decimal(10,2) NOT NULL,
  `parcelada` tinyint NOT NULL DEFAULT '0',
  `situacao` enum('PAGA','PENDENTE','VENCIDA','ARQUIVADO') NOT NULL DEFAULT 'PENDENTE',
  `numero_parcelas` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financeiro_financeiro`
--

LOCK TABLES `financeiro_financeiro` WRITE;
/*!40000 ALTER TABLE `financeiro_financeiro` DISABLE KEYS */;
/*!40000 ALTER TABLE `financeiro_financeiro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `financeiro_financeiro_parcelas`
--

DROP TABLE IF EXISTS `financeiro_financeiro_parcelas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `financeiro_financeiro_parcelas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) NOT NULL,
  `parcela` int NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `data_vencimento` date NOT NULL,
  `situacao` enum('PAGA','PENDENTE','VENCIDA','ARQUIVADO') NOT NULL,
  `financeiroId` int DEFAULT NULL,
  `comprovante` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9379edce1b0d62cb45fc4718166` (`financeiroId`),
  CONSTRAINT `FK_9379edce1b0d62cb45fc4718166` FOREIGN KEY (`financeiroId`) REFERENCES `financeiro_financeiro` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financeiro_financeiro_parcelas`
--

LOCK TABLES `financeiro_financeiro_parcelas` WRITE;
/*!40000 ALTER TABLE `financeiro_financeiro_parcelas` DISABLE KEYS */;
/*!40000 ALTER TABLE `financeiro_financeiro_parcelas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fornecedores`
--

DROP TABLE IF EXISTS `fornecedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fornecedores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `telefone` varchar(50) NOT NULL,
  `complemento` varchar(255) DEFAULT NULL,
  `situacao` enum('1','0') NOT NULL,
  `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `uuid` char(36) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `documento` varchar(20) NOT NULL,
  `estado` varchar(2) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `endereco` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fornecedores`
--

LOCK TABLES `fornecedores` WRITE;
/*!40000 ALTER TABLE `fornecedores` DISABLE KEYS */;
/*!40000 ALTER TABLE `fornecedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `os`
--

DROP TABLE IF EXISTS `os`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `os` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) NOT NULL,
  `cliente_id` int NOT NULL,
  `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `setor_id` int DEFAULT NULL,
  `descricao` varchar(255) NOT NULL,
  `situacao` enum('1','0') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_924ec33d218efb6f0e8e81e6e61` (`cliente_id`),
  KEY `FK_9bd2a1c1d1e00fe875fc81e94f7` (`setor_id`),
  CONSTRAINT `FK_924ec33d218efb6f0e8e81e6e61` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_9bd2a1c1d1e00fe875fc81e94f7` FOREIGN KEY (`setor_id`) REFERENCES `setores` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `os`
--

LOCK TABLES `os` WRITE;
/*!40000 ALTER TABLE `os` DISABLE KEYS */;
/*!40000 ALTER TABLE `os` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `os_atributos`
--

DROP TABLE IF EXISTS `os_atributos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `os_atributos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) DEFAULT (uuid()),
  `os_id` int DEFAULT NULL,
  `atributo_id` int DEFAULT NULL,
  `valor` text,
  PRIMARY KEY (`id`),
  KEY `os_id` (`os_id`),
  KEY `atributo_id` (`atributo_id`),
  CONSTRAINT `os_atributos_ibfk_1` FOREIGN KEY (`os_id`) REFERENCES `os` (`id`) ON DELETE CASCADE,
  CONSTRAINT `os_atributos_ibfk_2` FOREIGN KEY (`atributo_id`) REFERENCES `os_configuracao_atributos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `os_atributos`
--

LOCK TABLES `os_atributos` WRITE;
/*!40000 ALTER TABLE `os_atributos` DISABLE KEYS */;
/*!40000 ALTER TABLE `os_atributos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `os_configuracao_atributos`
--

DROP TABLE IF EXISTS `os_configuracao_atributos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `os_configuracao_atributos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) DEFAULT (uuid()),
  `descricao` varchar(255) DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `obrigatorio` tinyint(1) DEFAULT '0',
  `situacao` int DEFAULT '1',
  `setor` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `setor` (`setor`),
  CONSTRAINT `os_configuracao_atributos_ibfk_1` FOREIGN KEY (`setor`) REFERENCES `setores` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `os_configuracao_atributos`
--

LOCK TABLES `os_configuracao_atributos` WRITE;
/*!40000 ALTER TABLE `os_configuracao_atributos` DISABLE KEYS */;
/*!40000 ALTER TABLE `os_configuracao_atributos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oss`
--

DROP TABLE IF EXISTS `oss`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oss` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) NOT NULL,
  `os_id` int NOT NULL,
  `servico_id` int NOT NULL,
  `quantidade` int NOT NULL DEFAULT '1',
  `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `situacao` enum('1','0') NOT NULL DEFAULT '0',
  `observacao` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_21245e71dcdd75dce110722566c` (`os_id`),
  KEY `FK_85dd5e4ed5cfe94424577e9a26a` (`servico_id`),
  CONSTRAINT `FK_21245e71dcdd75dce110722566c` FOREIGN KEY (`os_id`) REFERENCES `os` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_85dd5e4ed5cfe94424577e9a26a` FOREIGN KEY (`servico_id`) REFERENCES `servicos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oss`
--

LOCK TABLES `oss` WRITE;
/*!40000 ALTER TABLE `oss` DISABLE KEYS */;
/*!40000 ALTER TABLE `oss` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projetos`
--

DROP TABLE IF EXISTS `projetos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projetos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) NOT NULL,
  `cliente_id` int NOT NULL,
  `setor_id` int NOT NULL,
  `situacao` int NOT NULL DEFAULT '1',
  `orcamento` decimal(10,2) NOT NULL,
  `data_fim` date NOT NULL,
  `observacao` text,
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `data_inicio` date NOT NULL,
  `responsavel` text,
  PRIMARY KEY (`id`),
  KEY `FK_9fecf68c32703585c72b8b8ed9f` (`cliente_id`),
  KEY `FK_30eea3c64125b15a1170b5c92c6` (`setor_id`),
  CONSTRAINT `FK_30eea3c64125b15a1170b5c92c6` FOREIGN KEY (`setor_id`) REFERENCES `setores` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_9fecf68c32703585c72b8b8ed9f` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projetos`
--

LOCK TABLES `projetos` WRITE;
/*!40000 ALTER TABLE `projetos` DISABLE KEYS */;
/*!40000 ALTER TABLE `projetos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projetos_atividades`
--

DROP TABLE IF EXISTS `projetos_atividades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projetos_atividades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) NOT NULL,
  `observacao` text,
  `projeto_id` int DEFAULT NULL,
  `setor_id` int DEFAULT NULL,
  `data_inicio` date NOT NULL,
  `data_fim` date NOT NULL,
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `descricao` varchar(255) NOT NULL,
  `prioridade` int NOT NULL DEFAULT '0',
  `situacao` enum('PENDING','IN_PROGRESS','CANCELLED','PAUSED','COMPLETED') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_466a827d309d555c2d5ca7ab62a` (`projeto_id`),
  KEY `FK_61d6d9707b0aa051c464c301b6e` (`setor_id`),
  CONSTRAINT `FK_466a827d309d555c2d5ca7ab62a` FOREIGN KEY (`projeto_id`) REFERENCES `projetos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_61d6d9707b0aa051c464c301b6e` FOREIGN KEY (`setor_id`) REFERENCES `setores` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projetos_atividades`
--

LOCK TABLES `projetos_atividades` WRITE;
/*!40000 ALTER TABLE `projetos_atividades` DISABLE KEYS */;
/*!40000 ALTER TABLE `projetos_atividades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicos`
--

DROP TABLE IF EXISTS `servicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `contrato_id` int DEFAULT NULL,
  `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `setor_id` int DEFAULT NULL,
  `descricao` varchar(255) NOT NULL,
  `situacao` enum('1','0') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_462d2f8ed3158ff35e35b87ce9a` (`setor_id`),
  KEY `FK_7b80741fec5891bf8de4bd87cf8` (`contrato_id`),
  CONSTRAINT `FK_462d2f8ed3158ff35e35b87ce9a` FOREIGN KEY (`setor_id`) REFERENCES `setores` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_7b80741fec5891bf8de4bd87cf8` FOREIGN KEY (`contrato_id`) REFERENCES `contratos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicos`
--

LOCK TABLES `servicos` WRITE;
/*!40000 ALTER TABLE `servicos` DISABLE KEYS */;
INSERT INTO `servicos` VALUES (64,'f59f39d2-6d78-4ce4-b8cc-4b116e0178f1',1500.00,37,'2024-03-16 22:42:52','2024-03-16 22:42:52',51,'Pintura','1'),(65,'9678a798-da16-4745-854b-e9b7de5ec8d1',9000.00,37,'2024-03-23 16:29:14','2024-05-17 21:05:51',51,'Serviço A','0');
/*!40000 ALTER TABLE `servicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `setores`
--

DROP TABLE IF EXISTS `setores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `setores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `situacao` int NOT NULL DEFAULT '1',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `setores`
--

LOCK TABLES `setores` WRITE;
/*!40000 ALTER TABLE `setores` DISABLE KEYS */;
INSERT INTO `setores` VALUES (50,'fe37791e-c2f2-11ee-a1ba-641c679a799a','Meio Ambiente',1,'2024-02-04 00:18:59','2024-03-16 16:54:28'),(51,'d7a497c8-c2f5-11ee-a1ba-641c679a799a','Engenharia civil',1,'2024-02-04 00:24:39','2024-03-23 15:05:35'),(52,'dea04438-c2f3-11ee-a1ba-641c679a799a','Segurança do Trabalho',1,'2024-02-04 00:25:16','2024-02-04 00:39:13');
/*!40000 ALTER TABLE `setores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) NOT NULL,
  `situacao` int NOT NULL DEFAULT '1',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `nome` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'dd6ae8dd-d146-41be-811c-9c5fa1cf86da',1,'2024-02-05 10:36:23','2024-02-05 10:36:23','Fulano Sobrenome'),(2,'e6b1b23c-832c-4d4b-a430-4aa8725fb51c',1,'2024-04-21 14:17:33','2024-04-21 14:17:33','Fulano Sobrenome');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'erp'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-21 15:23:58
