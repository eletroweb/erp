<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Clientes</span>
                <ClienteBarraDePesquisa />
                <el-button class="btnCadastrar" type="success" @click="clienteStore.novo()" name="btnCadastrar"
                    v-if="authorizationStore.hasAuthorizationOfThisAction(RolesEnum.CADASTRAR_CLIENTE)">
                    Cadastrar
                </el-button>
            </div>
        </template>

        <li v-for="clientes in this.clienteStore.clientes.nome" :key="clientes.id">{{ clientes.nome }}</li>
        <el-table v-if="clienteStore.clientes.length > 0" :data="clienteStore.clientes" stripe style="width: 99%">
            <el-table-column prop="nome" label="Nome" width="400" />
            <el-table-column prop="documento" label="CPF/CNPJ" width="130" />
            <el-table-column prop="telefone" label="Telefone" width="120" />
            <el-table-column prop="email" label="E-mail" width="250" />
            <el-table-column prop="situacao" label="Situação" width="100">
                <template #default="cliente">
                    <el-tag v-if="cliente.row.situacao" type="success">Ativado</el-tag>
                    <el-tag v-else type="info">Desativado</el-tag>
                </template>
            </el-table-column>

            <el-table-column prop="acao" label="">
                <template #default="cliente">
                    <el-button type="primary" size="small" @click="clienteStore.exibir(cliente.row.uuid)" plain
                        v-if="authorizationStore.hasAuthorizationOfThisAction(RolesEnum.EDITAR_CLIENTE)">
                        Editar
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-empty v-else description="Nenhum cliente cadastrado" />
    </el-card>
</template>

<script>

import { ClienteStore } from '@/store/ClienteStore'
import { AuthorizationStore } from '@/store/AuthorizationStore'
import { RolesEnum } from '@/enum/RolesEnum'
import ClienteBarraDePesquisa from './ClienteBarraDePesquisa.vue'


export default {
    setup() {
        const clienteStore = ClienteStore()
        const authorizationStore = AuthorizationStore()
        clienteStore.listar()
        return { clienteStore, authorizationStore, RolesEnum }
    },

    components: {
        ClienteBarraDePesquisa
    },

    methods: {
    },

    computed: {
    },

}
</script>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 99%;
}
</style>@/enum/SystemEnum@/enum/RolesEnum