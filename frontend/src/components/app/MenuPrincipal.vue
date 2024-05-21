<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false">

      <div class="flex-grow" />
      <!-- el-popover placement="bottom" :width="400" trigger="hover">
        <template #reference>
          <div class="q-gutter-md q-ml-none notificacoes">
            <el-badge :value="3" class="item">
              <el-button>Notificações</el-button>
            </el-badge>
          </div>
        </template>

        <b>Notificações</b>
        <br />
        <br />
        <el-timeline style="max-width: 600px">
          <el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp">
            {{ activity.content }}
          </el-timeline-item>
        </el-timeline>
      </el-popover -->

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

<script lang="ts" setup>
import { ref } from 'vue'
import { LoginStore } from '@/store/LoginStore'

const activeIndex = ref('1')
const login = LoginStore()


const activities = [
  {
    content: 'Cadastrou um projeto',
    timestamp: '31/03/2024 17:14',
  },
  {
    content: 'Adicionou a atividade Levantamento de documentos do cliente',
    timestamp: '31/03/2024 17:10',
  },
  {
    content: 'Cadastrou uma ordem de serviço',
    timestamp: '31/03/2024 17:00',
  },
]
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

.notificacoes button{
  cursor: pointer;
}

</style>