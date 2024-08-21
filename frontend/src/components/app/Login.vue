<template>
  <div class="container" id="container">
    <!-- Exibe a mensagem de sucesso ou erro -->
     <Message 
      v-if="successMessage" 
      :severity="messageType" 
      v-html="successMessage" 
      :key="messageType"
      :life="5000"
      class="message-top"
    />
  
    <div class="form-container sign-in-container">
      <img class="logo" src="/images/logo-login.png">
    </div>
    <div class="overlay-container">
      <form @submit.prevent="login.login()" v-if="!signup.novo_usuario">
        <br>
        <input type="email" v-model="login.user.email" id="email" placeholder="Email" />
        <input v-model="login.user.password" type="password" id="password" required placeholder="Senha" />
        <button>Entrar</button>
        <a @click="signup.novo_usuario = true" href="#">Criar conta</a>
        <div class="card flex justify-center gap-4" id="mensagem">
          <a href="#" @click.prevent="handleForgotPassword">Esqueceu a senha?</a>
        </div>
      </form>

      <form @submit.prevent="signup.signup()" v-else>
        <br>
        <input type="text" v-model="signup.usuario.nome" id="nome" placeholder="Seu nome completo..." autocomplete="off" />
        <input type="email" v-model="signup.usuario.email" id="email" placeholder="Email..." autocomplete="off" />
        <input v-model="signup.usuario.password" type="password" id="password" required placeholder="Senha..." autocomplete="off" />
        <button>Cadastrar</button>
        <a @click="signup.novo_usuario = false" href="#">Já sou cadastrado</a>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { LoginStore } from '@/store/LoginStore';
import { Signup } from '@/store/Signup';
import Message from 'primevue/message';

export default {
  components: {
    Message,
  },
  setup() {
    const login = LoginStore();
    const signup = Signup();
    const successMessage = ref('');
    const messageType = ref(''); // Tipo de mensagem (ex: success, warn)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const handleForgotPassword = () => {
      const email = login.user.email;


      if (!email) {
        successMessage.value ='';
        successMessage.value ='<strong> Atenção: </strong> Informe o email que você deseja redefinir a senha';
        messageType.value = 'warn'; 
      } else if  (!emailRegex.test(email)) {
        successMessage.value ='';
        successMessage.value ='<strong> Por favor, insira um email válido </strong>';
        messageType.value = 'error'; 
      }else{
        successMessage.value ='';
        successMessage.value = `<strong> Instruções enviadas: </strong> Verifique seu email ${email} para redefinir sua senha`;
        messageType.value = 'success'; 
      }

      setTimeout(() => {
        successMessage.value = '';
        messageType.value = '';
      }, 5000); 
    };

    return {
      login,
      signup,
      successMessage,
      messageType,
      handleForgotPassword,
    };
  }
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

.message-top {
  margin: 20px;
  position: relative;
  z-index: 1000;
  white-space: auto;
  padding: 15px;
  font-size: 14px;
  
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
