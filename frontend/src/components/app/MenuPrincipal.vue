<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false">

    <div class="flex-grow" />
    <el-popover placement="bottom" :width="400" trigger="hover">
      <template #reference>
        <div class="q-gutter-md q-ml-none notificacoes">
          <el-badge :value="alertStore.history.length" class="item">
            <Button icon="pi pi-bell" severity="Success" text raised rounded aria-label="Notification" />
          </el-badge>
        </div>
      </template>

      <template v-if="alertStore.history.length == 0">
        <el-empty description="Não existem notificações" />
      </template>

      <template v-else>
        <b>Notificações</b>
        <br />
        <br />
        <div v-for="notification in alertStore.history">
          <Message severity="success">{{ notification[0] }}</Message>
          <br />
        </div>
      </template>
    </el-popover>

    <el-sub-menu index="1">
      <template #title>
        {{ login.getUserInfo().fullName }}
      </template>
      <el-menu-item index="2-1" @click="login.logout()">
        <el-link href="#">Sair</el-link>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script>
import { LoginStore } from '@/store/LoginStore'
import { onMounted, ref, inject } from 'vue';
import Message from 'primevue/message';
import { AlertStore } from '@/store/AlertStore'
import Button from 'primevue/button';

export default {
  name: 'MenuPrincipal',
  setup() {

    const alertStore = AlertStore()

    const login = LoginStore()
    const message = ref('');
    const socket = inject('socket');

    onMounted(() => {
      socket.on('connect', () => {
        message.value = 'Conectado ao servidor';
        console.log(message.value);
      });

      socket.on('invoicePending', (data) => {
        console.log("Mensagem recebida do servidor: ", data);
        message.value = data;
      });

      socket.on('disconnect', () => {
        message.value = 'Não conectado ao servidor';
      });
    });
    return {
      message,
      login,
      alertStore
    };
  },
  components: {
    Message,
    Button
  },
  data() {
    return {
      activeIndex: 1,
    };
  },
};
</script>

<style>
.flex-grow {
  flex-grow: 1;
}

.notificacoes {
  top: 10px;
  position: relative;
  right: 18px;
  cursor: pointer;
}

.notificacoes button {
  cursor: pointer;
}
</style>