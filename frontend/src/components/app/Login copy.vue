<template>
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="login.handleSubmit()">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="login.username" required />
        <br />
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="login.password" required />
        <br />
        <button type="submit">Login</button>
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
  