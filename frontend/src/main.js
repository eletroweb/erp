import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {createPinia} from 'pinia'
import VueApexCharts from "vue3-apexcharts";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

const app = createApp(App).use(Quasar, quasarUserOptions)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const pinia = createPinia()

app.config.globalProperties.$moment = {
  timeAgo(date) {
    return moment(date).fromNow()
  },
  format(date) {
    return moment(date).format("DD/MM/YYYY")
  },
}

app.use(router)
app.use(ElementPlus)
app.use(pinia)
app.use(VueApexCharts);
app.mount('#app')
