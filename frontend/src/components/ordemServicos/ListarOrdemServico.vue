<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Ordem de Serviços</span>
                <el-button type="success" @click="ordemServicoStore.novo()" class="btnCadastrar">
                    Cadastrar
                </el-button>
            </div>
        </template>
        <el-table v-if="ordemServicoStore.ordemServicos.length > 0" :data="ordemServicoStore.ordemServicos" stripe style="width: 700px">
            <!-- el-table-column prop="uuid" label="ID" width="300" / -->
            <el-table-column prop="descricao" label="Descrição" width="200" />
            <el-table-column prop="situacao" label="Situação" width="70" />
            <el-table-column prop="valor" label="Valor" width="150" />
            <el-table-column prop="cliente_id" label="Cliente" width="150" />


            <el-table-column prop="situacao" label="Situação" width="150">
                <template #default="ordemServico">
                    <el-tag v-if="ordemServico.row.situacao" type="success">Ativado</el-tag>
                    <el-tag v-else type="info">Desativado</el-tag>
                </template>
            </el-table-column>

            <el-table-column prop="situacao" label="">
                <template #default="ordemServico">
                    <el-button type="primary" size="small" @click="ordemServicoStore.exibir(ordemServico.row.uuid)" plain>Editar</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-empty v-else description="Nenhuma ordem de serviço cadastrada" />

    </el-card>
</template>

<script>
import { useOrdemServicoStore } from '@/store/OrdemServicoStore'

export default {
    setup() {
        const ordemServicoStore = useOrdemServicoStore()
        ordemServicoStore.listar()
        return { ordemServicoStore }
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
     width: 99%;
 }
</style>