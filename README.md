tabela: clinetes
id
nome
email
documento
estado
cidade
endereco
complemento
situacao
data_cadastro
data_atualizacao
criado_por
setor_id

tabela: clientes_atributos
id
cliente_id
chave
valor
obrigatorio
situacao

tabela: os
id
cliente_id
descricao
prazo
situacao
data_cadastro
data_atualizacao
criado_por
setor_id

tabela: servicos
id
os_id
descricao
situacao
valor
criado_por
data_cadastro
data_atualizacao

tabela: os_atributos
id
os_id
atributo_id
valor

tabela:  os_configuracao_atributos
id
descricao
tipo
situacao
setor

tabela: setores
id
descricao
situacao
data_cadastro
data_atualizacao
criado_por