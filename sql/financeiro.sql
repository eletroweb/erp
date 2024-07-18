-- Tota l de receitas e despesas
SELECT
	SUM(CASE WHEN categoria = 'RECEITA' THEN valor_cobranca ELSE 0 END) AS receita,
	SUM(CASE WHEN categoria = 'DESPESA' THEN valor_cobranca ELSE 0 END) AS despesa
FROM
	financeiro;