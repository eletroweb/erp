<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Serviços</span>
                <ServicosBarraDePesquisa />
                <el-button type="success" @click="servicoStore.novo()" class="btnCadastrar">
                    Cadastrar
                </el-button>
            </div>
        </template>
        <el-table v-if="servicoStore.servicos.length > 0" :data="servicoStore.servicos" stripe style="width: 99%">
            <!-- el-table-column prop="uuid" label="ID" width="300" / -->
            <el-table-column prop="descricao" label="Descrição" width="400" />
            <el-table-column prop="valor" label="Valor" width="150" />

            <el-table-column prop="situacao" label="Situação" width="150">
                <template #default="servico">
                    <el-tag v-if="servico.row.situacao" type="success">Ativado</el-tag>
                    <el-tag v-else type="info">Desativado</el-tag>
                </template>
            </el-table-column>            
            <el-table-column prop="situacao" label="">
                <template #default="servico">
                    <el-button type="primary" size="small" @click="servicoStore.exibir(servico.row.uuid)" plain>Editar</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-empty v-else description="Nenhum serviço cadastrado" />

    </el-card>
</template>

<script>
import { useServicoStore } from '@/store/ServicoStore'
import ServicosBarraDePesquisa from './ServicosBarraDePesquisa.vue'


export default {
    setup() {
        const servicoStore = useServicoStore()
        servicoStore.listar()
        return { servicoStore }
    },
    mounted() {
    },
    components: {
        ServicosBarraDePesquisa
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