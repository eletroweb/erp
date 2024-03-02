import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {createPinia} from 'pinia'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const pinia = createPinia()

app.config.globalProperties.$filters = {
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
app.mount('#app')
