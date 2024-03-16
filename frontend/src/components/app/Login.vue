<template>
  <div class="login-container">
    <h1>Login</h1>
    <form>
      <el-form-item label="E-mail">
        <el-input v-model="login.user.username" id="username" />
      </el-form-item>

      <el-form-item label="Senha">
        <el-input v-model="login.user.password" type="password" id="password" required />
      </el-form-item>
      <el-form-item>
        <el-button @click="login.login()" type="primary">Login</el-button>
      </el-form-item>
    </form>
  </div>
</template>

<script>
import { LoginStore } from '@/store/LoginStore'

export default {
  setup() {
    const login = LoginStore()
    return { login }
  },
};
</script>

<style scoped>
/* Add styling as needed */
</style>