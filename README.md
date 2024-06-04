# ERP - Enterprise Resource Planning

# Testes automatizados
Para a realização dos testes e2e, crie o seguinte usuário com email qa@teste.com e senha 123456

Crie um cliente chamado "Cliente QA" e outro "Cliente QA2"

Crie um fornecedor chamado "Fornecedor QA3"

Certifique-se que você possui exatamente os setores "Engenharia civil e "Meio Ambiente" cadastrados

Implemente separadamente os testes para cada funcionalidade, exemplo
projeto.cadastrar.spec.js
projeto.editar.spec.js
projeto.excluir.spec.js

Após a conclusão dos testes, crie um último contendo a execução da bateria completa seguindo a ordem, utilizeo exemplo contido em 
cypress/e2e/projetos/projeto.all.spec.js

# Requisitos

## Setor 
RF1.1 Cadastrar Setor
RF1.2 Editar Setor
RF1.3 Excluir Setor
RF1.4 Listar Setor
RF1.7 Desativar/Ativar Setor

## Cliente
RF2.1 Cadastrar Cliente
    RF2.1.1 Preencher CEP
    Os dados de endereço, cidade e bairro devem ser preenchidos automaticamente quando o CEP for informado
RF2.2 Editar Cliente
RF2.3 Excluir Cliente
RF2.4 Listar Clientes
RF2.4.1 Pesquisar cliente
    RF2.4.1.1 Pesquisar cliente por nome
    RF2.4.1.2 Pesquisar cliente por CPF/CNPJ
    RF2.4.1.3 Pesquisar cliente por situação
    RF2.4.1.4 Limpar pesquisa
RF2.5 Associar contrato ao serviço
RF2.6 Asscoiar setor ao Cliente
RF2.7 Desativar/Ativar Cliente
RF2.8 Validar duplicidade de email
RF2.9 Validar duplicidade de CPF/CNPJ
RF2.10 Validar telefone
RF2.11 Validar email
RF2.12 Validar setor

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
RF4.7 Adicionar atividade ao projeto
RF4.8 Remover atividade do projeto
RF4.9 Editar atividade do projeto
RF4.10 Listar atividades do projeto

## Serviços
RF5.1 Cadastrar Serviço
RF5.2 Editar Serviço
RF5.3 Excluir Serviço
RF5.4 Listar Serviço
RF5.5 Associar contrato ao serviço
RF5.6 Asscoiar setor ao Serviço
RF5.7 Desativar/Ativar Serviço
RF5.8 Pesquisar serviço

## Atividade associada ao projeto
RF6.1 Adicionar Atividade do projeto
RF6.2 Editar Atividade do projeto
RF6.3 Excluir Atividade do projeto
RF6.4 Listar Atividades do projeto

## Ordem Serviços
RF7.1 Cadastrar Ordem Serviço
RF7.2 Editar Ordem Serviço
RF7.3 Excluir Ordem Serviço
RF7.4 Listar Ordem Serviço

## Autenticação
RF8.1 Login de usuário
O sistema deverá permitir que o usuário realize a autenticação através do email e senha

## Autorização
RF9.1 Impedir que usuário que não possui role, acesse funcionalidades não permitidas
RF9.1.1 Permitir que o usuário com role master tenha acesso a todas as funcinalidades
RF9.1.2 Permitir que o usuário com role restrito tenha acesso limitado as funcionalidades

## Serviços da OS
RF10.1 Associar Serviço a OS
RF11 Associar responsável a atividade no projeto

## Despesas
RF12.1 Listar despesas
    RF12.1.1 Exportar despesas em CSV
RF12.2 Cadastrar despesa
    RF12.2.1 Adicionar parcela
        RF12.2.1.1 Quanto uma despesa não é parcelada a data de vencimento da parcela deve ser igual a data de vencimento da despesa;
        RF12.2.1.2 Quando uma despesa é parcelada, a data de vencimento da primeira parcela deve ser igual a data de vencimento da despesa e as subsequentes serão mês+1
        RF12.2.1.3 Adicionar data de pagamento a parcela
RF12.3 Excluir despesa
RF12.4 Alterar despesa
        RF12.4.1.1 Salvar a data de pagamento ao realizar o pagamento integral da despesa
    RF12.4.2 Definir situação de despesa
        RF12.4.2.1 PAGA Alterar a situação da despesa para PAGA quando todas as parcelas estiverem com situação paga
        RF12.4.2.2 PENDENTE 
        RF12.4.2.3 VENCIDA Quando houver uma ou mais parcelas vencidas com data inferior a data atual
        RF12.4.2.4 ARQUIVADA Todos os campos de uma despesa devem ficar desabilitados
    RF12.4.3 Editar centro de custo
    Quando uma despesa esta definida com o centro de custo por setor e é alterada para centro de custo contrato, a coluna setor_id na tabela financeiro do registro deve ser definida como null; O mesmo ocorrerá caso seja alterado para centro de custo setor, a coluna contrato_id deverá ser definida como null

RF12.5 Listar parcelas de despesa
RF12.5.1 Realizar pagamento de parcela
RF12.5.2 Anexar comprovante de pagamento na parcela
RF12.5.3 Baixar comprovante de pagamento na parcela
RF12.6.1 Adicionar parcela a despesa
RF12.7.1 Vincular centro de custo do tipo setor ou contrato a despesa 

## Recursos Humanos
RF12.1 Cadastrar Colaborador
    RF12.1.2 Associar cargo ao colaborador
RF12.2 Listar Colaborador
RF12.3 Editar Colaborador
RF12.4 Excluir Colaborador

## Fornecedor
RF13.1 Cadastrar Fornecedor
RF13.2 Editar Fornecedor
RF13.3 Excluir Fornecedor
RF13.4 Listar Fornecedor
RF13.4.1 Pesquisar fornecedor
    RF13.4.1.1 Pesquisar fornecedor por nome
    RF13.4.1.2 Pesquisar fornecedor por CPF/CNPJ
    RF13.4.1.3 Pesquisar fornecedor por situação
    RF13.4.1.4 Limpar pesquisa
RF13.5 Associar contrato ao serviço do fornecedor
RF13.6 Desativar/Ativar Fornecedor
RF13.7 Validar duplicidade de email do fornecedor
RF13.8 Validar duplicidade de CPF/CNPJ do fornecedor
RF13.9 Validar telefone do fornecedor
RF13.10 Validar email do fornecedor

## Receita
RF14.1 Cadastrar receita
RF14.2 Listar receita
RF14.3 Editar receita
RF14.4 Excluir receita

## Configurações
RF15.1 Configuração da empresa

# Padrão de nomeclatura de branch e de commit
Branches devem possui os seguintes prefixos para cada caso

feature 
    caso seja implementação de uma nova funcionalidade
bug
    Caso seja um bug
test
    Caso seja implementação de teste

Além o prefixo deve-se usar o sufixo com o numero do card que gerou essa demanda,
exemplo:

feature/1
bug/2
test/36

## Mensagens dos commits
As mensagens dos commits devem possui o exemplo

git commit -m "feature/1 RF3.1 Cadastrar Contrato"
git commit -m "test/36 RF8.1 Login de usuário"
git commit -m "bug/6 RF3.1 Cadastrar Contrato"

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

C:\Program Files\keycloak-23.0.6\bin\kc.bat start-dev

http://localhost:8080/


  interface Token {
    isExpired(): boolean
    hasRole(roleName: string): boolean
    hasApplicationRole(appName: string, roleName: string): boolean
    hasRealmRole(roleName: string): boolean,
    content: {
      realm_access: {
        roles: string[]
      }
    }
  }

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


<svg viewBox="0 0 18 18" height="18" width="18" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 18 18"><title>psa-verified</title><polygon id="Star-2" fill="#00DA60" points="9,16 7.1,16.9 5.8,15.2 3.7,15.1 3.4,13 1.5,12 2.2,9.9 1.1,8.2 2.6,6.7 2.4,4.6 4.5,4 5.3,2 7.4,2.4 9,1.1 10.7,2.4 12.7,2 13.6,4 15.6,4.6 15.5,6.7 17,8.2 15.9,9.9 16.5,12 14.7,13 14.3,15.1 12.2,15.2 10.9,16.9 "></polygon><polygon id="Check-Icon" fill="#FFFFFF" points="13.1,7.3 12.2,6.5 8.1,10.6 5.9,8.5 5,9.4 8,12.4 "></polygon></svg>
