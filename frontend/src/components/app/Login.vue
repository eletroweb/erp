<template>
  <div class="container" id="container">
    <div class="form-container sign-in-container">
      <img class="logo" src="/images/logo-login.png">
    </div>
    <div class="overlay-container">
      <form @submit.prevent="login.login()">
        <br>
        <!-- span>Informe seu nome de usuário e senha</span-->
        <input type="email" v-model="login.user.email" id="email" placeholder="Email" />
        <input v-model="login.user.password" type="password" id="password" required placeholder="Senha" />
        <!-- a href="#">Esqueceu a senha?</a-->
        <button>Entrar</button>
      </form>
    </div>
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
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  border: 1px solid #512CD4;
  background-color: #512CD4;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  margin-top: 20px;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #FFFFFF;
}

form {
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  border: 1px solid #512CD4;
  border-radius: 10px;
  background: #ffffff;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0px 35px rgba(0, 0, 0, 0.25), 0 9px 10px rgba(0, 0, 0, 0);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
  margin: auto;
  margin-top: 100px;
}

.container button {
  cursor: pointer;
}

.logo {
  margin-left: 19%;
  width: 75%;
  margin-top: 53%;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}
</style>