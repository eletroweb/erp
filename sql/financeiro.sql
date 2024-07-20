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