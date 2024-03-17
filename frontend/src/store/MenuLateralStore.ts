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
        label: "Setores",
        path: "setores",
        roles: ['MASTER', 'SETOR_LISTAR', 'SETOR_CADASTRAR', 'SETOR_EDITAR', 'SETOR_EXCLUIR'],
        icon: 'Menu',
        order: 2
      },
      {
        label: "Contratos",
        path: "contratos",
        roles: ['MASTER', 'CONTRATO_LISTAR', 'CONTRATO_CADASTRAR', 'CONTRATO_EDITAR', 'CONTRATO_EXCLUIR'],
        icon: 'Tickets',
        order: 3
      },
      {
        label: "Projetos",
        path: "projetos",
        roles: ['MASTER', 'PROJETO_LISTAR', 'PROJETO_CADASTRAR', 'PROJETO_EDITAR', 'PROJETO_EXCLUIR'],
        icon: 'GoldMedal',
        order: 4
      },
      {
        label: "Serviços",
        path: "servicos",
        roles: ['MASTER', 'SERVICO_LISTAR', 'SERVICO_CADASTRAR', 'SERVICO_EDITAR', 'SERVICO_EXCLUIR'],
        icon: 'Box',
        order: 5
      },
      {
        label: "Ordem Serviço",
        path: "ordem-servico",
        roles: ['MASTER', 'ORDEM_SERVICO_LISTAR', 'ORDEM_SERVICO_CADASTRAR', 'ORDEM_SERVICO_EDITAR', 'ORDEM_SERVICO_EXCLUIR'],
        icon: 'Document',
        order: 6,
        visibility: 'disabled'
      },
      {
        label: "Configurações",
        path: "ordem-servico",
        roles: ['MASTER'],
        icon: 'setting',
        order: 7
      },
    ]
  }),
  actions: {
    load() {
      return this.menuList.sort((a, b) => a.order - b.order)
    }
  },
})