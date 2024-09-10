em node tenho esses dados, e gostaria que você me retornasse criasse uma função que recepa o mes, exemplo 
o id do mes, exemplo 1 (janeiro) e retorne toda as atividades contidas em todas as etapas que tenham data inicio em janeiro

            meses: [
  {
    "id": 1,
    "nome": "January",
    "style": {
      "width": "580px"
    }
  },
  {
    "id": 2,
    "nome": "February",
    "style": {
      "width": "270px"
    }
  }
],
            etapas: [
                {
                    nome_etapa: "Planejamento",
                    data_inicio_etapa: "2024-01-01",
                    data_fim_etapa: "2024-02-15",
                    atividades: [
                        {
                            nome_atividade: "Análise de Requisitos",
                            data_inicio_atividade: "2024-01-01",
                            data_fim_atividade: "2024-01-10",
                            duracao_dias: 30
                        },
                        {
                            nome_atividade: "Aprovação de Projeto",
                            data_inicio_atividade: "2024-01-11",
                            data_fim_atividade: "2024-01-21",
                            duracao_dias: 14
                        },
                        {
                            nome_atividade: "Atdividade x",
                            data_inicio_atividade: "2024-01-22",
                            data_fim_atividade: "2024-01-31",
                            duracao_dias: 14
                        }
                    ]
                },
                {
                    nome_etapa: "Fundação",
                    data_inicio_etapa: "2024-02-01",
                    data_fim_etapa: "2024-02-28",
                    atividades: [
                        {
                            nome_atividade: "Escavação",
                            data_inicio_atividade: "2024-01-10",
                            data_fim_atividade: "2024-01-15",
                            duracao_dias: 15
                        },
                        {
                            nome_atividade: "Lançamento de Concreto",
                            data_inicio_atividade: "2024-02-16",
                            data_fim_atividade: "2024-02-28",
                            duracao_dias: 12
                        }
                    ]
                },
            ]

veja que a etapa Fundação possui também uma atividade do mês de janeiro, 

logo se eu passar: 1, então ele vai buscar todas atividades contida em todas as etapas do mes de janeiro
no caso: Análise de Requisitos, Aprovação de Projeto, Atdividade x, Escavação