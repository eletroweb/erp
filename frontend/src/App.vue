<template>

  <el-container class="layout-container-demo" v-if="login.isLoggedIn()">
    <MenuLateral />
    <el-container>
      <el-main>
        <MenuPrincipal />
        <RouterView />
      </el-main>
    </el-container>
  </el-container>


  <el-container class="layout-container-demo" v-else>
    <el-container>
      <el-main>
        <Login />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped></style>

<script>
import { RouterView } from 'vue-router'
import MenuPrincipal from "@/components/app/MenuPrincipal.vue"
import MenuLateral from "@/components/app/MenuLateral.vue"
import Login from "@/components/app/Login.vue"
import { LoginStore } from '@/store/LoginStore'

export default {
  components: {
    MenuPrincipal,
    MenuLateral,
    Login
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
