<template>
  <el-menu default-active="2" :collapse="menuCollapse" @open="handleOpen" @close="handleClose"
    class="el-menu-vertical-demo" :router="true">

    <el-menu-item index="1" @click="toggleMenu()" class="first">
      <img :class="logoClass" src="/images/logo.png" alt="Agilmax" />
    </el-menu-item>
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

    <el-menu-item @click="toggleMenu()">
        <el-icon>
          <ArrowRight v-if="menuCollapse"/>
          <ArrowLeft v-else/>
        </el-icon>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { AuthorizationStore } from '@/store/AuthorizationStore'
import { MenuLateralStore } from '@/store/MenuLateralStore'

export default {
  setup() {
    const authorizationStore = AuthorizationStore()
    const menuLateralStore = MenuLateralStore()
    return { authorizationStore, menuLateralStore }
  },
  data() {
    return {
      menuCollapse: false,
      logoClass: "logo-opened"
    }
  },
  mounted() {
  },
  methods: {
    toggleMenu() {
      this.menuCollapse = !this.menuCollapse
      if (this.menuCollapse) {
        this.logoClass = "logo-closed"
      } else {
        this.logoClass = "logo-opened"
      }
    }
  },
};
</script>

<style>
.logo-opened {
  width: 100%;
  margin-left: 0;
  position: relative;
}

.logo-closed {
  width: 55px;
  left: -14px;
  position: relative;
}

.first {
  height: auto;
}
</style>