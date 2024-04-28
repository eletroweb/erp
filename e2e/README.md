# Testes automatizados
Para a realização dos testes e2e, crie o seguinte usuário com email qa@teste.com e senha 123456

Crie um cliente chamado "Cliente QA" e outro "Cliente QA2"

Certifique-se de que você possui exatamente os setores "Engenharia civil e "Meio Ambiente" cadastrados

Implemente separadamente os testes para cada funcionalidade, exemplo
projeto.cadastrar.spec.js
projeto.editar.spec.js
projeto.excluir.spec.js

Após a conclusão dos testes, crie um último contendo a execução da bateria completa seguindo a ordem, utilizeo exemplo contido em 
cypress/e2e/projetos/projeto.all.spec.js


## SQL
```sql
INSERT INTO erp.clientes (uuid,data_cadastro,data_atualizacao,documento,estado,cidade,complemento,setor_id,nome,email,telefone,endereco,situacao) VALUES
	 ('e0d41f3f-0194-4086-95c9-bfba58b60439','2024-04-21 19:43:04.000','2024-04-28 17:33:33.000','06713832484','SP','Sao Paulo','Complemento A',50,'Cliente QA','clienteqa@email.com','83999999991','Rua A','1'),
	 ('a3c4f039-c2d5-44ba-905a-62bade993af6','2024-04-21 19:43:26.000','2024-04-28 17:33:59.000','66022596017','SP','Sao Paulo','Complemento A',50,'Cliente QA2','clienteqa2@email.com','83999999992','Rua A','0'),
	 ('a3c4f039-c2d5-44ba-905a-62bade993af7','2024-04-21 19:43:26.000','2024-04-28 17:33:59.000','06713832486','SP','Sao Paulo','Complemento A',50,'Pedro Andreade','clienteqa@email.com','83999999993','Rua A','0');
```