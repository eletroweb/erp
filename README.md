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
RF1 Cadastrar Setor
RF2 Editar Setor
RF3 Excluir Setor
RF4 Listar Setor
RF7 Desativar/Ativar Setor

## Serviços
RF5 Cadastrar Serviço
RF6 Editar Serviço
RF7 Excluir Serviço
RF8 Listar Serviço
RF9 Associar contrato ao serviço
RF10 Asscoiar setor ao Serviço
RF1 Desativar/Ativar Serviço

## Cliente
RF12 Cadastrar Cliente
RF13 Editar Cliente
RF14 Excluir Cliente
RF15 Listar Cliente
RF16 Associar contrato ao serviço
RF17 Asscoiar setor ao Cliente
RF18 Desativar/Ativar Cliente

## Contrato 
RF19 Cadastrar Contrato
RF20 Editar Contrato
RF21 Excluir Contrato
RF22 Listar Contrato
RF23 Desativar/Ativar Contrato