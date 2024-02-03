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

8. Realize chamadas a API através da collection do postamn importada no passo 4.

