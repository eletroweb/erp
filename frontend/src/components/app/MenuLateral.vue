<template>
  <el-aside width="200px">
    <a href="/">
      <img src="/images/logo.png" style="margin-left: 20px;">
    </a>
    <el-menu default-active="1" class="el-menu-vertical-demo" :router="true">
      <div v-for="menu in menuLateralStore.load()">
        <el-menu-item :index="`/${menu.path}`" :disabled="menu.visibility"
          v-if="authorizationStore.hasAuthorization(menu.roles)">
          <el-icon>
            <component :is="menu.icon">
              <template #title>{{ menu.label }}</template>
            </component>
          </el-icon>
          <template #title>{{ menu.label }}</template>
        </el-menu-item>
      </div>
    </el-menu>

  </el-aside>
</template>

<script lang="ts" setup>
import { AuthorizationStore } from '@/store/AuthorizationStore'
import { MenuLateralStore } from '@/store/MenuLateralStore'

const authorizationStore = AuthorizationStore()
const menuLateralStore = MenuLateralStore()
</script>