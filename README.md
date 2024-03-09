# ERP - Enterprise Resource Planning

## Como configurar o ambiente

1. Instale o mysql/mariadb
2. Execute o ddl.sql localizado no diretorio sql/
3. No diretorio backend execute

```shell
npm install
```

4. No postamn, importe a collection de requisções doc/ERP.postman_collection.json
5. No postamn, importe as variáveis de ambiente doc/ERP.postman_environment
6. No postman, selecione a variávle de Ambiente ERP
7. execute o backend via package.json selecionando a opção script ou dentro do diretório backend no terminal, execute:

```shell
npm run dev
```

8. Realize chamadas a API através da collection do postman importada no passo 4.


# Git
excluindo uma branch remota
git push origin -d nomebranch


<el-button type="success" @click="$router.push({ name: 'cadastrar-setor' })">Cadastrar</el-button>


# Keycloak
 bin\kc.bat start-dev

http://localhost:8080/


# Requisitos

## Setor 
RF1.1 Cadastrar Setor
RF1.2 Editar Setor
RF1.3 Excluir Setor
RF1.4 Listar Setor
RF1.7 Desativar/Ativar Setor

## Cliente
RF2.1 Cadastrar Cliente
RF2.2 Editar Cliente
RF2.3 Excluir Cliente
RF2.4 Listar Clientes
RF2.5 Associar contrato ao serviço
RF2.6 Asscoiar setor ao Cliente
RF2.7 Desativar/Ativar Cliente
RF2.8 Validar duplicidade de email
RF2.9 Validar duplicidade de CPF/CNPJ
RF2.10 Validar telefone

## Contrato 
RF3.1 Cadastrar Contrato
RF3.2 Editar Contrato
RF3.3 Excluir Contrato
RF3.4 Listar Contrato
RF3.5 Desativar/Ativar Contrato

## Projeto
RF4.1 Cadastrar Projeto
RF4.2 Editar Projeto
RF4.3 Excluir Projeto
RF4.4 Listar Projeto
RF4.5 Desativar/Ativar Projeto
RF4.6 Vincular cliente ao projeto

## Serviços
RF5.1 Cadastrar Serviço
RF5.2 Editar Serviço
RF5.3 Excluir Serviço
RF5.4 Listar Serviço
RF5.5 Associar contrato ao serviço
RF5.6 Asscoiar setor ao Serviço
RF5.7 Desativar/Ativar Serviço

# Backend

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Frontend

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Headed Component Tests with [Cypress Component Testing](https://on.cypress.io/component)

```sh
npm run test:unit:dev # or `npm run test:unit` for headless testing
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```
