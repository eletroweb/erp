import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import VueApexCharts from "vue3-apexcharts";
import money from 'v-money3'

import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css'
import Aura from '@primevue/themes/aura';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Button from 'primevue/button';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component('Button', Button);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Tag', Tag);

const pinia = createPinia()

app.config.globalProperties.$moment = {
  timeAgo(date) {
    return moment(date).fromNow()
  },
  format(date) {
    if (date === null)
      return null

    return moment(date).format("DD/MM/YYYY")
  },
}

app.config.warnHandler = (msg, vm, trace) => {
  //console.warn(`[Vue warn]: teste ${msg}\nTrace: ${trace}`);
};


// Primevue
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});

app.use(router)
app.use(ElementPlus)
app.use(pinia)
app.use(VueApexCharts);
app.use(money);
app.mount('#app')
