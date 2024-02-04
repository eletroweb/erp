<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Setores</span>
                <el-button type="success" @click="setorStore.novo()">
                    Cadastrar
                </el-button>
            </div>
        </template>
        <el-table v-if="setorStore.setores.length > 0" :data="setorStore.setores" stripe style="width: 700px%">
            <!-- el-table-column prop="uuid" label="ID" width="300" / -->
            <el-table-column prop="descricao" label="Descrição" width="500" />

            <el-table-column prop="situacao" label="Situação" width="250">
                <template #default="setor">
                    <el-tag v-if="setor.row.situacao === 1" type="success">Ativado</el-tag>
                    <el-tag v-else type="info">Desativado</el-tag>
                </template>
            </el-table-column>

            <el-table-column prop="situacao" label="">
                <template #default="setor">
                    <el-button type="primary" size="small" @click="setorStore.exibir(setor.row.uuid)" plain>Editar</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-empty v-else description="Nenhum setor cadastrado" />

    </el-card>
</template>

<script>
import { useSetorStore } from '@/store/SetorStore'

export default {
    setup() {
        const setorStore = useSetorStore()
        setorStore.listar()
        return { setorStore }
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