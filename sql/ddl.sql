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
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (115,'c5631fbb-7ab8-4473-9d97-f197f1bbd70d','2024-05-22 12:31:37','2024-05-22 12:31:37','06713832482','PB','Foz do iguaçu','2',51,'Yonatha Alves Almeida','yonathalmeida@gmail.com','83991732814','1','1');
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
-- Table structure for table `financeiro`
--

DROP TABLE IF EXISTS `financeiro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `financeiro` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) NOT NULL,
  `categoria` enum('RECEITA','DESPESA') NOT NULL DEFAULT 'DESPESA',
  `descricao` varchar(255) NOT NULL,
  `fornecedor` varchar(255) NOT NULL DEFAULT '0',
  `observacao` varchar(255) DEFAULT NULL,
  `data_vencimento` datetime DEFAULT NULL,
  `data_pagamento` datetime DEFAULT NULL,
  `valor_cobranca` varchar(255) NOT NULL,
  `parcelada` tinyint NOT NULL DEFAULT '0',
  `numero_parcelas` int NOT NULL,
  `situacao` enum('PAGA','PENDENTE','VENCIDA','ARQUIVADO') NOT NULL DEFAULT 'PENDENTE',
  `tipo` enum('FIXA','VARIAVEL') NOT NULL DEFAULT 'VARIAVEL',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financeiro`
--

LOCK TABLES `financeiro` WRITE;
/*!40000 ALTER TABLE `financeiro` DISABLE KEYS */;
INSERT INTO `financeiro` VALUES (4,'23b997f8-2252-480e-9986-93d78e78354f','DESPESA','Energia','Copel',NULL,'2024-05-25 00:00:00',NULL,'1.00',0,1,'PENDENTE','VARIAVEL'),(5,'dfaf1beb-6711-456c-b04b-e957218aaf42','RECEITA','Pagamento cliente 1','Cliente 1',NULL,'2024-05-31 00:00:00',NULL,'1000.00',0,10,'PENDENTE','FIXA'),(6,'daee39d8-cd61-4b1a-b04f-ce249a6b264d','RECEITA','Pagamento cliente 2','Cliente 1',NULL,'2024-05-31 00:00:00',NULL,'1000.00',1,10,'PENDENTE','FIXA'),(7,'75896f7e-039f-4aa5-92d3-9ef713410000','RECEITA','Pagamento cliente 3','Cliente 1',NULL,'2024-05-31 00:00:00',NULL,'1000.00',1,10,'PAGA','FIXA'),(8,'2fe8db88-39f2-4974-9443-f0906e27b218','RECEITA','Pagamento cliente 4','Cliente 1',NULL,'2024-05-31 00:00:00',NULL,'1000.00',1,10,'PAGA','FIXA'),(9,'273be21e-7be1-461d-a364-c2557947f098','RECEITA','Pagamento cliente 5','Cliente 1',NULL,'2024-05-31 00:00:00',NULL,'1000.00',1,10,'PAGA','FIXA'),(10,'edeef214-e857-44f3-bc63-a5da04833046','DESPESA','Aluguel','0',NULL,'2024-06-05 00:00:00',NULL,'6000.00',1,12,'PAGA','VARIAVEL'),(11,'983749b4-223d-4b1a-a7ca-1f84fe81a40f','DESPESA','Agua','Cagepa',NULL,'2024-06-01 00:00:00','2024-05-25 12:58:00','50.00',0,1,'PAGA','VARIAVEL'),(12,'63ed208d-41d2-4165-8343-ee45ee8f5159','DESPESA','Conta 1','',NULL,'2024-06-01 00:00:00','2024-05-25 12:58:00','50.00',0,1,'PAGA','VARIAVEL'),(13,'5c517c6a-4457-49f5-96b1-be957a9c77ac','RECEITA','Pagamento cliente 6','Cliente 1',NULL,'2024-05-31 00:00:00',NULL,'1000.00',1,10,'PENDENTE','FIXA'),(15,'6cc29511-5dba-4f4f-84ec-782699785aa7','DESPESA','Conta 2','',NULL,'2024-06-01 00:00:00','2024-05-25 12:58:00','50.00',0,1,'PAGA','VARIAVEL'),(16,'d43fba33-ffe1-4997-aec0-93c4d1e4a473','DESPESA','Conta 3','',NULL,'2024-06-01 00:00:00','2024-05-25 12:58:00','50.00',0,1,'PAGA','VARIAVEL');
/*!40000 ALTER TABLE `financeiro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `financeiro_despesas`
--

DROP TABLE IF EXISTS `financeiro_despesas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `financeiro_despesas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) NOT NULL,
  `tipo` enum('FIXA','VARIAVEL') NOT NULL DEFAULT 'VARIAVEL',
  `descricao` varchar(255) NOT NULL,
  `observacao` varchar(255) DEFAULT NULL,
  `data_vencimento` datetime DEFAULT NULL,
  `data_pagamento` datetime DEFAULT NULL,
  `valor_cobranca` decimal(10,2) NOT NULL,
  `parcelada` tinyint NOT NULL DEFAULT '0',
  `numero_parcelas` int NOT NULL,
  `situacao` enum('PAGA','PENDENTE','VENCIDA','ARQUIVADO') NOT NULL DEFAULT 'PENDENTE',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financeiro_despesas`
--

LOCK TABLES `financeiro_despesas` WRITE;
/*!40000 ALTER TABLE `financeiro_despesas` DISABLE KEYS */;
/*!40000 ALTER TABLE `financeiro_despesas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `financeiro_despesas_parcelas`
--

DROP TABLE IF EXISTS `financeiro_despesas_parcelas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `financeiro_despesas_parcelas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) NOT NULL,
  `parcela` int NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `data_vencimento` date NOT NULL,
  `situacao` enum('PAGA','PENDENTE','VENCIDA','ARQUIVADO') NOT NULL,
  `comprovante` varchar(255) DEFAULT NULL,
  `despesaId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9379edce1b0d62cb45fc4718166` (`despesaId`),
  CONSTRAINT `FK_9379edce1b0d62cb45fc4718166` FOREIGN KEY (`despesaId`) REFERENCES `financeiro_despesas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financeiro_despesas_parcelas`
--

LOCK TABLES `financeiro_despesas_parcelas` WRITE;
/*!40000 ALTER TABLE `financeiro_despesas_parcelas` DISABLE KEYS */;
/*!40000 ALTER TABLE `financeiro_despesas_parcelas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `financeiro_parcelas`
--

DROP TABLE IF EXISTS `financeiro_parcelas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `financeiro_parcelas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) NOT NULL,
  `parcela` int NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `data_vencimento` date NOT NULL,
  `situacao` enum('PAGA','PENDENTE','VENCIDA','ARQUIVADO') NOT NULL,
  `comprovante` varchar(255) DEFAULT NULL,
  `financeiroId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_caae013a51227ee253bef721795` (`financeiroId`),
  CONSTRAINT `FK_caae013a51227ee253bef721795` FOREIGN KEY (`financeiroId`) REFERENCES `financeiro` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financeiro_parcelas`
--

LOCK TABLES `financeiro_parcelas` WRITE;
/*!40000 ALTER TABLE `financeiro_parcelas` DISABLE KEYS */;
INSERT INTO `financeiro_parcelas` VALUES (6,'4969ffc9-ea7e-46ef-addf-f825cb3d11d3',1,1.00,'2024-05-25','PENDENTE',NULL,4),(17,'3a4fc777-0284-4826-a0a7-b67731dd0ddb',1,100.00,'2024-05-31','PENDENTE',NULL,6),(18,'6666e302-06cd-4523-81d1-261af94c45b2',2,100.00,'2024-06-30','PENDENTE',NULL,6),(19,'48a017b6-7905-45fa-8019-a7d167ad688b',3,100.00,'2024-07-30','PENDENTE',NULL,6),(20,'0ef1aa2d-f9af-4772-a93e-8c9f1d9667b9',4,100.00,'2024-08-30','PENDENTE',NULL,6),(21,'45b26203-4a30-44a1-ac69-be46d54299b9',5,100.00,'2024-09-30','PENDENTE',NULL,6),(22,'54557fd5-227c-4b43-8156-23adfad6f81a',6,100.00,'2024-10-30','PENDENTE',NULL,6),(23,'b5e1d6ea-b44e-4160-9c9e-02236ce33514',7,100.00,'2024-11-30','PENDENTE',NULL,6),(24,'cc0662c0-629a-46fe-b436-43bc96d8a58d',8,100.00,'2024-12-30','PENDENTE',NULL,6),(25,'b3014d30-52cd-4f13-94b1-4e6795fa4d50',9,100.00,'2025-01-30','PENDENTE',NULL,6),(26,'b69e3b18-21c2-4200-a5a4-719d05c48918',10,100.00,'2025-02-28','PENDENTE',NULL,6),(27,'45fbe545-7aa5-4bc5-a98d-12fe0d0d07c3',1,100.00,'2024-05-31','PENDENTE',NULL,7),(28,'4559421d-60fa-4094-b731-d4d8b4adbc3c',2,100.00,'2024-06-30','PENDENTE',NULL,7),(29,'ea39f22c-03fa-43fa-b047-57095659d4c8',3,100.00,'2024-07-30','PENDENTE',NULL,7),(30,'85339825-8443-48ef-8940-886cae77bb67',4,100.00,'2024-08-30','PENDENTE',NULL,7),(31,'e1b359fd-7aaf-4fb8-a0f6-b8cc92deea88',5,100.00,'2024-09-30','PENDENTE',NULL,7),(32,'50ee8ae6-c54f-4ad9-a819-6f4e1a16f9da',6,100.00,'2024-10-30','PENDENTE',NULL,7),(33,'228e23c4-b4bd-4b31-af9b-ef09cc81490c',7,100.00,'2024-11-30','PENDENTE',NULL,7),(34,'88c07152-b5ec-4123-aa41-f1248bfc6e1f',8,100.00,'2024-12-30','PENDENTE',NULL,7),(35,'35bbdc8b-1afa-4960-bff7-e98ea0530d24',9,100.00,'2025-01-30','PENDENTE',NULL,7),(36,'bc4882cd-938a-4c61-8258-ee2c868886eb',10,100.00,'2025-02-28','PENDENTE',NULL,7),(37,'af49cee9-9f48-47b2-bf9c-88c893b79af1',1,100.00,'2024-05-31','PENDENTE',NULL,8),(38,'d3cc5b4a-1e69-47fc-bf41-15178ac4a4dc',2,100.00,'2024-06-30','PENDENTE',NULL,8),(39,'e01bcd47-73e3-417f-94a6-007a2d392214',3,100.00,'2024-07-30','PENDENTE',NULL,8),(40,'fceb6b31-090c-4ddb-ac86-c433ea1ddf5c',4,100.00,'2024-08-30','PENDENTE',NULL,8),(41,'751b62cf-b9c5-4ff2-86a1-1eeb0a6d5d7b',5,100.00,'2024-09-30','PENDENTE',NULL,8),(42,'025c438d-9038-467c-b018-fc15964bdb5b',6,100.00,'2024-10-30','PENDENTE',NULL,8),(43,'ed7b9fb1-476e-4c93-819e-b8008446fc0b',7,100.00,'2024-11-30','PENDENTE',NULL,8),(44,'d6fc4695-2d30-4204-9755-77333274f724',8,100.00,'2024-12-30','PENDENTE',NULL,8),(45,'4dddcf39-a3a1-49e2-8339-760ed5574600',9,100.00,'2025-01-30','PENDENTE',NULL,8),(46,'ae5cf851-b3b5-4d85-b81e-94ab51764568',10,100.00,'2025-02-28','PENDENTE',NULL,8),(47,'9d13c340-5c6b-4f6e-a597-106c356a8bbf',1,100.00,'2024-05-31','PENDENTE',NULL,9),(48,'489fee71-f149-4a9a-9ed5-f1fd00ee1b79',2,100.00,'2024-06-30','PENDENTE',NULL,9),(49,'67563874-15fe-47ee-a125-73d0b20e282f',3,100.00,'2024-07-30','PENDENTE',NULL,9),(50,'bb1ee6b5-a8a5-43ef-8cea-e6e2c10b4ba5',4,100.00,'2024-08-30','PENDENTE',NULL,9),(51,'a046c75a-697d-4a04-a3a8-df65e069fc31',5,100.00,'2024-09-30','PENDENTE',NULL,9),(52,'dc0f8471-47fe-46e8-b992-0b0074f7959d',6,100.00,'2024-10-30','PENDENTE',NULL,9),(53,'17ee92d3-de31-4096-85f8-988480cc7dd1',7,100.00,'2024-11-30','PENDENTE',NULL,9),(54,'9088c8ab-fe73-48b6-9ffa-69e024868358',8,100.00,'2024-12-30','PENDENTE',NULL,9),(55,'a3556bfe-ef31-4682-ac69-f7e97ea47542',9,100.00,'2025-01-30','PENDENTE',NULL,9),(56,'ef6e25e1-8ac0-4fc8-9d32-9f0c013ee608',10,100.00,'2025-02-28','PENDENTE',NULL,9),(57,'3eaad6ac-91b2-4089-9f36-835522ee8974',1,500.00,'2024-06-05','PAGA',NULL,10),(58,'ce5444ea-b025-4619-95a1-5fc89e4fa843',2,500.00,'2024-07-05','PAGA',NULL,10),(59,'f7322b39-8bca-428e-90cb-6a63f7885607',3,500.00,'2024-08-05','PAGA',NULL,10),(60,'3ed8b897-9d73-47a7-8c19-e892ffde8550',4,500.00,'2024-09-05','PAGA',NULL,10),(61,'f6f37d0f-bf74-4f5e-84b0-d306c6355185',5,500.00,'2024-10-05','PAGA',NULL,10),(62,'492bc544-ae4b-4aae-b0c7-b0494ca391bb',6,500.00,'2024-11-05','PAGA',NULL,10),(63,'85f9399f-2288-431c-970f-e6df9b7ca160',7,500.00,'2024-12-05','PAGA',NULL,10),(64,'5ce54c4d-312f-414b-bc72-3f554ae2fe58',8,500.00,'2025-01-05','PAGA',NULL,10),(65,'67823c12-eb41-40ba-b6cc-654326c75dc6',9,500.00,'2025-02-05','PAGA',NULL,10),(66,'3b712e26-3a0d-44b2-9b19-89a3104e6fcf',10,500.00,'2025-03-05','PAGA',NULL,10),(67,'e34df10c-edb9-4bea-b58b-1e136cfe8a25',11,500.00,'2025-04-05','PAGA',NULL,10),(68,'df0a0b66-9323-4785-98b3-559b72b93733',12,500.00,'2025-05-05','PAGA',NULL,10),(72,'5e01ebf2-57e6-404f-8f5c-2182af45d64c',1,100.00,'2024-05-31','PAGA',NULL,5),(73,'63501895-598c-4e5e-a866-d3c79c3087e6',2,100.00,'2024-06-30','PAGA',NULL,5),(74,'17fbdbe6-aa98-457e-aca9-488724192e8e',3,100.00,'2024-07-30','PAGA',NULL,5),(75,'e42c027d-e8d6-4aa4-90bc-d46630de5293',4,100.00,'2024-08-30','PAGA',NULL,5),(76,'c1a7d638-c0b1-4638-9b79-116b9c74aa01',5,100.00,'2024-09-30','PENDENTE',NULL,5),(77,'93d29ecc-dcc7-4412-a3dd-c3ce0208185e',6,100.00,'2024-10-30','PENDENTE',NULL,5),(78,'99177217-04de-44b3-a28a-317ffb5e2c3e',7,100.00,'2024-11-30','PENDENTE',NULL,5),(79,'774b3a75-e16f-4179-bcf2-72888c9544ad',8,100.00,'2024-12-30','PENDENTE',NULL,5),(80,'8b9f55c9-2836-44b9-bddb-20c93006baec',9,100.00,'2025-01-30','PENDENTE',NULL,5),(81,'cb41fcbe-10d0-4bbf-b9b9-13f5bf75e24f',10,100.00,'2025-02-28','PENDENTE',NULL,5),(82,'af58199e-8846-4fec-8bfb-d7f7d90ba881',1,50.00,'2024-06-01','PAGA',NULL,11),(83,'8a549e8f-3368-4aa7-8dde-4e877183c15b',1,50.00,'2024-06-01','PAGA',NULL,12),(84,'dd2ac20f-9e17-480c-9e42-62ef50a2b470',1,100.00,'2024-05-31','PENDENTE',NULL,13),(85,'de0e80af-f43d-4b31-bff5-062d6a026bbc',2,100.00,'2024-06-30','PENDENTE',NULL,13),(86,'6497b429-e626-4390-8401-3dfd713a7539',3,100.00,'2024-07-30','PENDENTE',NULL,13),(87,'970992ae-ff44-4f69-a336-3367168511ed',4,100.00,'2024-08-30','PENDENTE',NULL,13),(88,'40736208-8469-44b4-ba27-01a6b8616740',5,100.00,'2024-09-30','PENDENTE',NULL,13),(89,'5ec1f60d-82b9-4731-bd16-7d3c1efad21b',6,100.00,'2024-10-30','PENDENTE',NULL,13),(90,'d13d13f3-e1a2-4768-86da-21b8ba75ec7b',7,100.00,'2024-11-30','PENDENTE',NULL,13),(91,'89d52a36-f6ad-43b6-81f2-ed934ad615ce',8,100.00,'2024-12-30','PENDENTE',NULL,13),(92,'d3dc27b7-2e21-4ef3-91e4-6ceee7d4cd0d',9,100.00,'2025-01-30','PENDENTE',NULL,13),(93,'eb43172b-cc96-485a-af2d-fe659c0f9d42',10,100.00,'2025-02-28','PENDENTE',NULL,13),(104,'7bfee74f-a89d-4858-9bb1-fc485683a439',1,50.00,'2024-06-01','PAGA',NULL,15),(105,'b86ea85d-b28a-446c-8c54-25b8bf81801f',1,50.00,'2024-06-01','PAGA',NULL,16);
/*!40000 ALTER TABLE `financeiro_parcelas` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fornecedores`
--

LOCK TABLES `fornecedores` WRITE;
/*!40000 ALTER TABLE `fornecedores` DISABLE KEYS */;
INSERT INTO `fornecedores` VALUES (14,'8333391924',NULL,'0','2024-05-21 22:24:57','2024-05-21 22:24:57','14419cd4-97ee-4ccc-a872-8093879be326','Energisa','contato@energisa.com.br','00.864.214/0001-06','PB','Campina Grande',NULL);
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

-- Dump completed on 2024-05-25 15:02:51
