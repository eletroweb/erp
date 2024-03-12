<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Clientes</span>
                <el-button class="btnCadastrar" type="success" @click="clienteStore.novo()" name="btnCadastrar">
                    Cadastrar
                </el-button>
            </div>
        </template>
        <el-table v-if="clienteStore.clientes.length > 0" :data="clienteStore.clientes" stripe style="width: 700px%">
            <el-table-column prop="nome" label="Nome" width="250" />
            <el-table-column prop="telefone" label="Telefone" width="120" />
            <el-table-column prop="email" label="E-mail" width="250" />
            <el-table-column prop="situacao" label="Situação" width="100">
                <template #default="cliente">
                    <el-tag v-if="cliente.row.situacao" type="success">Ativado</el-tag>
                    <el-tag v-else type="info">Desativado</el-tag>
                </template>
            </el-table-column>

            <el-table-column prop="situacao" label="">
                <template #default="cliente">
                    <el-button type="primary" size="small" @click="clienteStore.exibir(cliente.row.uuid)" plain>Editar</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-empty v-else description="Nenhum cliente cadastrado" />

    </el-card>
</template>

<script>
import { ClienteStore } from '@/store/ClienteStore'

export default {
    setup() {
        const clienteStore = ClienteStore()
        clienteStore.listar()
        return { clienteStore }
    },
    mounted() {
    },
    components: {
    },
    methods: {
    }
}
</script>

<style scoped> .card-header {
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
     width: 900px;
 }
</style>