<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Atividades do Projeto</span>
                <el-button class="btnCadastrar" type="success" @click="projetoStore.novo()" name="btnCadastrar">
                    Adicionar Atividade
                </el-button>
            </div>

            <el-table :data="atividadesStore.atividades" stripe style="width: 99%">
                <el-table-column prop="descricao" label="Descrição" width="300" />

                <el-table-column prop="area" label="Área" width="220">
                    <template #default="area">
                        {{ area.row.setor.descricao }}
                    </template>
                </el-table-column>

                <el-table-column prop="data_inicio" label="Início" width="100">
                    <template #default="data_inicio">
                        {{ $moment.format(data_inicio.row.data_inicio) }}
                    </template>
                </el-table-column>

                <el-table-column prop="data_fim" label="Fim" width="130">
                    <template #default="data_fim">
                        {{ $moment.format(data_fim.row.data_fim) }}
                    </template>
                </el-table-column>

                <el-table-column prop="situacao" label="Situação" width="100">
                    <template #default="atividade">
                        <el-tag v-if="atividade.row.situacao" type="success">Ativado</el-tag>
                        <el-tag v-else type="info">Desativado</el-tag>
                    </template>
                </el-table-column>


            </el-table>
        </template>
    </el-card>
</template>

<script>
import { projetoAtividadesStore } from '@/store/ProjetoAtividadesStore'

export default {
    name: "ProjetoAtividades",
    setup() {
        const atividadesStore = projetoAtividadesStore()
        atividadesStore.listar()
        return { atividadesStore }
    },
    mounted() {
    },
    components: {
    },
    methods: {
    }
}
</script>

<style>

.card-header {
    position: relative;
    height: 50px;
}
.btnCadastrar {
    position: absolute;
    right: 0;
}
</style>