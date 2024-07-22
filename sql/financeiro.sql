-- Tota l de receitas e despesas
SELECT
	SUM(CASE WHEN categoria = 'RECEITA' THEN valor_cobranca ELSE 0 END) AS receita,
	SUM(CASE WHEN categoria = 'DESPESA' THEN valor_cobranca ELSE 0 END) AS despesa
FROM
	financeiro;


-- Registros financeiros por setor e contrato
select
	financeiro.descricao registro,
	setores.descricao setor,
	contratos.descricao contrato
from
	financeiro
left join setores on
	setores.id = financeiro.setor_id
left join contratos on
	contratos.id = financeiro.contrato_id;


select * from financeiro;	

-- Describe tables
DESCRIBE financeiro;
DESCRIBE setores;
DESCRIBE contratos;

id uuid categoria tipo descricao fornecedor observacao data_vencimento data_pagamento valor_cobranca parcelada numero_parcelas situacao setor_id contrato_id empresaId

SELECT * FROM financeiro where categoria = 'DESPESA' order by data_vencimento ASC;
SELECT * FROM financeiro WHERE data_vencimento <= CURRENT_DATE + INTERVAL 5 DAY and situacao in ('PENDENTE','VENCIDA') and categoria = 'DESPESA' order by data_vencimento ASC;