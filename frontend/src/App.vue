<template>
  <el-container class="layout-container-demo" v-if="login.isLoggedIn()">
    <MenuLateral />
    <el-container>
      <el-main>
        <MenuPrincipal />
        <Alert />
        <RouterView />
      </el-main>
    </el-container>
  </el-container>

  <Login v-else />
</template>


<style scoped></style>

<script>
import { RouterView } from 'vue-router'
import MenuPrincipal from "@/components/app/MenuPrincipal.vue"
import MenuLateral from "@/components/app/MenuLateral.vue"
import Login from "@/components/app/Login.vue"
import Alert from "@/components/app/Alert.vue"
import { LoginStore } from '@/store/LoginStore'
import ProgressSpinner from 'primevue/progressspinner';

import Message from 'primevue/message';


export default {
  components: {
    MenuPrincipal,
    MenuLateral,
    Login,
    Alert,
    ProgressSpinner,
    Message
  },
  data() {
    return {
    };
  },
  setup() {
    const login = LoginStore()
    return { login }
  },
}
</script>
