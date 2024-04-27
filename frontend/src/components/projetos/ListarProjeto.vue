<template>
    <el-card class="box-card" shadow="never">
        <template #header>
            <div class="card-header">
                <span>Projetos</span>
                <el-button class="btnCadastrar" type="success" @click="projetoStore.novo()" name="btnCadastrar">
                    Cadastrar
                </el-button>
            </div>
        </template>
        <el-table 
        v-if="projetoStore.projetos.length > 0" :data="projetoStore.projetos" stripe style="width: 99%">
            <el-table-column prop="cliente" label="Cliente" width="250">
                <template #default="cliente">
                 {{ cliente.row.cliente.nome }}
                </template>
            </el-table-column>
            <el-table-column prop="responsavel" label="Responsável" width="200" />

            <el-table-column prop="orcamento" label="Orçamento" width="100">
                <template #default="projeto">
                 R$ {{ projeto.row.orcamento }}
                </template>
            </el-table-column>

            <el-table-column prop="data_inicio" label="Data Início" width="100">
                <template #default="projeto">
                 {{ $moment.format(projeto.row.data_inicio) }}
                </template>
            </el-table-column>

            <el-table-column prop="data_fim" label="Data Fim" width="100">
                <template #default="projeto">
                 {{ $moment.format(projeto.row.data_fim) }}
                </template>
            </el-table-column>

            <el-table-column prop="situacao" label="Situação" width="110">
                <template #default="projeto">
                    <el-tag v-if="projeto.row.situacao" type="success">Em andamento</el-tag>
                    <el-tag v-else type="info">Cancelado</el-tag>
                </template>
            </el-table-column>

            <el-table-column prop="situacao" label="">
                <template #default="projeto">
                    <el-button type="primary" size="small" @click="projetoStore.exibir(projeto.row.uuid)" plain>Editar</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-empty v-else description="Nenhum projeto cadastrado" />

    </el-card>

    
</template>

<script>
import { useProjetoStore } from '@/store/ProjetoStore'

export default {
    setup() {
        const projetoStore = useProjetoStore()
        projetoStore.listar()
        return { projetoStore }
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