<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Contratos</span>
                <el-button type="success" @click="contratoStore.novo()">
                    Cadastrar
                </el-button>
            </div>
        </template>
        <el-table v-if="contratoStore.contratos.length > 0" :data="contratoStore.contratos" stripe style="width: 700px%">
            <!-- el-table-column prop="uuid" label="ID" width="300" / -->
            <el-table-column prop="descricao" label="Descrição" width="200" />

            
            <el-table-column prop="orcamento" label="Orçamento" width="150">
                <template #default="orcamento">
                    <el-tag type="info"> 
                        R$ {{ orcamento.row.orcamento }}</el-tag>
                </template>
            </el-table-column>

            <el-table-column prop="data_inicio" label="Data Início" width="100">
                <template #default="data_inicio">
                   {{ data_inicio.row.data_inicio }}
                </template>
            </el-table-column>
            
            <el-table-column prop="data_fim" label="Data Fim" width="100">
                <template #default="data_fim">
                   {{ data_fim.row.data_fim }}
                </template>
            </el-table-column>

            <el-table-column prop="situacao" label="Situação" width="100">
                <template #default="contrato">
                    <el-tag v-if="contrato.row.situacao === 1" type="success">Ativado</el-tag>
                    <el-tag v-else type="info">Desativado</el-tag>
                </template>
            </el-table-column>

            <el-table-column prop="acao" label="">
                <template #default="contrato">
                    <el-button type="primary" size="small" @click="contratoStore.exibir(contrato.row.uuid)" plain>Editar</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-empty v-else description="Nenhum contrato cadastrado" />

    </el-card>
</template>

<script>
import { useContratoStore } from '@/store/ContratoStore'

export default {
    setup() {
        const contratoStore = useContratoStore()
        contratoStore.listar()
        return { contratoStore }
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