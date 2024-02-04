import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListarSetores from '../components/setores/ListarSetores.vue'
import FormularioSetores from '../components/setores/FormularioSetores.vue'
import ListarContratos from '../components/contratos/ListarContratos.vue'
import FormularioContrato from '../components/contratos/FormularioContrato.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
  ]
})

export default router
