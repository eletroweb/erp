import { createRouter, createWebHistory } from 'vue-router'
import { LoginStore } from '@/store/LoginStore'
import HomeView from '../views/DashboardView.vue'
import ListarSetores from '../components/setores/ListarSetores.vue'
import FormularioSetores from '../components/setores/FormularioSetores.vue'
import ListarContratos from '../components/contratos/ListarContratos.vue'
import FormularioContrato from '../components/contratos/FormularioContrato.vue'

import ListarCliente from '../components/clientes/ListarCliente.vue'
import FormularioCliente from '../components/clientes/FormularioCliente.vue'
import ListarServicos from '../components/servicos/ListarServicos.vue'
import FormularioServicos from '../components/servicos/FormularioServicos.vue'
import ListarProjeto from '@/components/projetos/ListarProjeto.vue'
import FormularioProjeto from '@/components/projetos/FormularioProjeto.vue'
import Login from '@/components/app/Login.vue'
import DashboardView from '@/views/DashboardView.vue'
import ListarRecursosHumanos from '../components/recursosHumanos/ListarRecursosHumanos.vue'
import FormularioRecursosHumanos from '../components/recursosHumanos/FormularioRecursosHumanos.vue'
import ListarFornecedores from '@/components/fornecedores/ListarFornecedores.vue'
import FormularioFornecedor from '@/components/fornecedores/FormularioFornecedor.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: ListarCliente
    },
    {
      path: '/clientes/cadastrar',
      name: 'cadastrar-cliente',
      component: FormularioCliente
    },
    {
      path: '/clientes/:id',
      name: 'editar-cliente',
      component: FormularioCliente
    },
    {
      path: '/setores',
      name: 'setores',
      component: ListarSetores
    },
    {
      path: '/setores/cadastrar',
      name: 'cadastrar-setor',
      component: FormularioSetores
    },
    {
      path: '/setores/:id',
      name: 'editar-setor',
      component: FormularioSetores
    },
    {
      path: '/contratos/',
      name: 'contratos',
      component: ListarContratos
    },
    {
      path: '/contratos/cadastrar',
      name: 'cadastrar-contrato',
      component: FormularioContrato
    },
    {
      path: '/contratos/:id',
      name: 'editar-contratos',
      component: FormularioContrato
    },
    {
      path: '/servicos',
      nome: 'servicos',
      component: ListarServicos
    },
    {
      path: '/servicos/cadastrar',
      name: 'cadastrar-servico',
      component: FormularioServicos
    },
    {
      path: '/servicos/:id',
      name: 'editar-servico',
      component: FormularioServicos
    },
    {
      path: '/projetos',
      nome: 'projetos',
      component: ListarProjeto
    },
    {
      path: '/projetos/cadastrar',
      name: 'cadastrar-projeto',
      component: FormularioProjeto
    },
    {
      path: '/projetos/:id',
      name: 'editar-projeto',
      component: FormularioProjeto
    },
    {
      path: '/rh',
      name: 'colaborador',
      component: ListarRecursosHumanos
    },
    {
      path: '/rh/colaborador/cadastrar',
      name: 'cadastrar-colaborador',
      component: FormularioRecursosHumanos
    },
    {
      path: '/rh/colaborador/:id',
      name: 'editar-colaborador',
      component: FormularioRecursosHumanos
      path: '/fornecedores',
      name: 'fornecedor',
      component: ListarFornecedores
    },
    {
      path: '/fornecedores/cadastrar',
      name: 'cadastrar-fornecedor',
      component: FormularioFornecedor
    },
    {
      path: '/fornecedores/:id',
      name: 'editar-fornecedor',
      component: FormularioFornecedor
    },
  ]
})



router.beforeEach((to, from, next) => {
 const login = LoginStore()
  if (login.isLoggedIn()) next()
  else next('/login')
})

export default router
