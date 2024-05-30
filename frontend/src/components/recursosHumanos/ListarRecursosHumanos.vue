<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Colaboradores</span>

                <el-button type="success" @click="recursosHumanosStore.novo()"
                    v-if="authorizationStore.hasAuthorizationOfThisAction(RolesEnum.COLABORADOR_CADASTRAR)">
                    Cadastrar
                </el-button>

            </div>
        </template>
        <el-table v-if="recursosHumanosStore.colaboradores.length > 0" :data="recursosHumanosStore.colaboradores" stripe
            style="width: 99%">
            <el-table-column prop="nome" label="Nome" width="400" />
            <el-table-column prop="cargo" label="Cargo" width="200"/>
            <el-table-column prop="telefone" label="Telefone" width="120" />            
            <el-table-column prop="email" label="E-mail" width="250" />            
            <el-table-column prop="situacao" label="Situação" width="100">
                <template #default="colaborador">
                    <el-tag v-if="colaborador.row.situacao" type="success">Ativado</el-tag>
                    <el-tag v-else type="info">Desativado</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="acao" label="">
                <template #default="colaborador">
                    <el-button type="primary" size="small" @click="recursosHumanosStore.exibir(colaborador.row.uuid)"
                        plain v-if="authorizationStore.hasAuthorizationOfThisAction(RolesEnum.COLABORADOR_EDITAR)">
                        Editar
                    </el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-empty v-else description="Nenhum colaborador cadastrado" />
    </el-card>
</template>

<script>
import { RecursosHumanosStore } from '@/store/RecursosHumanosStore'
import { AuthorizationStore } from '@/store/AuthorizationStore'
import { RolesEnum } from '@/enum/RolesEnum'

export default {
    setup() {
        const recursosHumanosStore = RecursosHumanosStore()
        const authorizationStore = AuthorizationStore()
        recursosHumanosStore.listar()
        return { recursosHumanosStore, authorizationStore, RolesEnum }

    },
    mounnted() {
    },
    components: {
    },
    methods: {
    }
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