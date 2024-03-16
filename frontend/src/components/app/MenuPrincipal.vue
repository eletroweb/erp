<template>
  <el-menu  :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false">
    <div class="flex-grow" />
    <el-sub-menu index="1">
      <template #title>Yonatha A Almeida</template>
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
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>