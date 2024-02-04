<template>
  <el-container class="layout-container-demo">
    <el-aside width="200px">
      <img src="/images/logo.png" style="margin-left: 20px;">
      <el-menu default-active="1" class="el-menu-vertical-demo" :router="true">
        <el-menu-item index="/">
          <el-icon>
            <HomeFilled />
          </el-icon>
          <template #title>Dashboard</template>
        </el-menu-item>

        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <Menu />
            </el-icon>
            <span>Setores</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/setores">
              <el-icon>
                <Expand />
              </el-icon>
              Listar</el-menu-item>
            <el-menu-item index="/setores/cadastrar-setor">
              <el-icon>
                <Plus />
              </el-icon>
              Cadastrar</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <el-menu-item index="/contratos">
          <el-icon><Tickets /></el-icon>
          <template #title>Contratos</template>
        </el-menu-item>

        <el-sub-menu index="3" disabled>
          <template #title>
            <el-icon>
              <Document />
            </el-icon>
            <span>Ordem de Serviço</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/ordem-servico">
              <el-icon>
                <Expand />
              </el-icon>
              Listar</el-menu-item>
            <el-menu-item index="1-2">
              <el-icon>
                <Plus />
              </el-icon>
              Cadastrar</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <el-menu-item index="3" disabled>
          <el-icon>
            <UserFilled />
          </el-icon>
          <template #title>Clientes</template>
        </el-menu-item>

        <el-menu-item index="4">
          <el-icon>
            <setting />
          </el-icon>
          <template #title>Configurações</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped></style>

<script>
import { RouterView } from 'vue-router'

export default {
  data() {
    return {
    };
  },
}
</script>
