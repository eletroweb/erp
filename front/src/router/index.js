import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListarSetores from '../components/setores/ListarSetores.vue'
import FormularioSetores from '../components/setores/FormularioSetores.vue'

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
  ]
})

export default router
