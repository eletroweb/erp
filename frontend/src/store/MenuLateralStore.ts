import { RolesEnum } from "@/enum/RolesEnum"
import { defineStore } from "pinia"

export const MenuLateralStore = defineStore('MenuLateralStore', {
  state: () => ({
    menuList: [
      {
        label: "Dashboard",
        path: "",
        icon: 'HomeFilled',
        roles: ['*'],
        order: 0
      },
      {
        label: "Clientes",
        path: "clientes",
        roles: [RolesEnum.CLIENTE_LISTAR],
        icon: 'UserFilled',
        order: 1
      },
      {
        label: "Financeiro",
        path: "financeiro",
        roles: [RolesEnum.MASTER],
        icon: 'money',
        order: 2,
        submenu: [
          {
            label: "Receita",
            path: "financeiro/receita",
            roles: [RolesEnum.MASTER],
            icon: 'DocumentChecked',
            order: 1,
          },
          {
            label: "Despesa",
            path: "financeiro/despesa",
            roles: [RolesEnum.MASTER],
            icon: 'DocumentDelete',
            order: 2,
          },
          {
            label: "Relatório",
            path: "financeiro/",
            roles: [RolesEnum.MASTER],
            icon: 'PieChart',
            order: 3,
          },
        ]
      },
      {
        label: "Recursos Humanos",
        path: "rh",
        roles: ['MASTER', 'COLABORADOR_LISTAR', 'COLABORADOR_CADASTRAR', 'COLABORADOR_EDITAR', 'COLABORADOR_EXCLUIR'],
        icon: 'Folder',
        order: 3,
      },
      {
        label: "Setores",
        path: "setores",
        roles: ['MASTER', 'SETOR_LISTAR', 'SETOR_CADASTRAR', 'SETOR_EDITAR', 'SETOR_EXCLUIR'],
        icon: 'Menu',
        order: 4
      },
      {
        label: "Contratos",
        path: "contratos",
        roles: ['MASTER', 'CONTRATO_LISTAR', 'CONTRATO_CADASTRAR', 'CONTRATO_EDITAR', 'CONTRATO_EXCLUIR'],
        icon: 'Tickets',
        order: 5
      },
      {
        label: "Projetos",
        path: "projetos",
        roles: ['MASTER', 'PROJETO_LISTAR', 'PROJETO_CADASTRAR', 'PROJETO_EDITAR', 'PROJETO_EXCLUIR'],
        icon: 'GoldMedal',
        order: 6
      },
      {
        label: "Serviços",
        path: "servicos",
        roles: ['MASTER', 'SERVICO_LISTAR', 'SERVICO_CADASTRAR', 'SERVICO_EDITAR', 'SERVICO_EXCLUIR'],
        icon: 'Box',
        order: 7
      },
      /*{
        label: "Ordem Serviço",
        path: "ordem-servico",
        roles: ['MASTER', 'ORDEM_SERVICO_LISTAR', 'ORDEM_SERVICO_CADASTRAR', 'ORDEM_SERVICO_EDITAR', 'ORDEM_SERVICO_EXCLUIR'],
        icon: 'Document',
        order: 8,
        visibility: 'disabled'
      },*/
      {
        label: "Fornecedores",
        path: "fornecedores",
        roles: ['MASTER', 'FORNECEDOR_LISTAR', 'FORNECEDOR_CADASTRAR', 'FORNECEDOR_EDITAR', 'FORNECEDOR_EXCLUIR'],
        icon: 'Avatar',
        order: 9,
      },
      {
        label: "Configurações",
        path: "ordem-servico",
        roles: ['MASTER'],
        icon: 'setting',
        order: 10,
      },
    ]
  }),
  actions: {
    load() {
      return this.menuList.sort((a, b) => a.order - b.order)
    }
  },
})