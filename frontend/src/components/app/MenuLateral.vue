<template>
  <el-menu default-active="2" :collapse="menuCollapse" class="el-menu-vertical-demo" :router="true">

    <el-menu-item index="1" @click="toggleMenu()" class="first">
      <div :class="logoClass">
        <EmpresaLogomarcaPrincipal />
      </div>
    </el-menu-item>

    <div v-for="(menu, index) in menuLateralStore.load()" :key="index">
      <el-sub-menu v-if="menu.submenu" :index="`${index}`">
        <template #title>
          <el-icon>
            <component :is="menu.icon">
              <template #title>{{ menu.label }}</template>
            </component>
          </el-icon>
          <span>{{ menu.label }} </span>
        </template>
        <el-menu-item v-for="(submenuItem, subIndex) in menu.submenu" :key="subIndex" :index="`/${submenuItem.path}`">
          <template #title>
            <el-icon>
              <component :is="submenuItem.icon">
                <template #title>{{ submenuItem.label }}</template>
              </component>
            </el-icon>
            {{ submenuItem.label }}
          </template>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else :index="`/${menu.path}`" :disabled="menu.visibility"
        v-if="displayMenu(menu)">
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
        <ArrowRight v-if="menuCollapse" />
        <ArrowLeft v-else />
      </el-icon>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { AuthorizationStore } from '@/store/AuthorizationStore'
import { MenuLateralStore } from '@/store/MenuLateralStore'
import { UsuarioLogadoStore } from '@/store/UsuarioLogadoStore'
import EmpresaLogomarcaPrincipal from '@/components/configuracoes/empresa/EmpresaLogomarcaPrincipal.vue'

export default {
  setup() {
    const authorizationStore = AuthorizationStore()
    const menuLateralStore = MenuLateralStore()
    const usuariologadoStore = UsuarioLogadoStore()
    
    return { authorizationStore, menuLateralStore, usuariologadoStore }
  },
  data() {
    return {
      menuCollapse: false,
      logoClass: "logo-opened"
    }
  },
  components: {
    EmpresaLogomarcaPrincipal
  },
  methods: {
    toggleMenu() {
      this.menuCollapse = !this.menuCollapse
      if (this.menuCollapse) {
        this.logoClass = "logo-closed"
      } else {
        this.logoClass = "logo-opened"
      }
    },
    displayMenu(menu) {
      if (this.usuariologadoStore.settings.has_company && this.authorizationStore.hasAuthorization(menu.roles)
        || menu.path === 'configuracoes' && this.authorizationStore.hasAuthorization(menu.roles)
      ) {
          return true
      }

      return false
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
  display: none
}

.first {
  height: auto;
}
</style>