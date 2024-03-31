<template>
    <el-card class="box-card" shadow="never">
        <template #header>
            <div class="card-header">
                <span>Atividades do Projeto</span>
            </div>

            <AtividadesFromularioProjeto />

            <el-table v-if="atividadesStore.atividades.length > 0" :data="atividadesStore.atividades" stripe>
                <el-table-column prop="descricao" label="Descrição" width="350px">
                    <template #default="atividade">
                        {{ atividade.row.descricao }}
                    </template>
                </el-table-column>

                <el-table-column prop="data_inicio" label="Data Início" width="150">
                    <template #default="data_inicio">
                        <ElIcon class="mr-3">
                            <Timer />
                        </ElIcon> {{ $moment.format(data_inicio.row.data_inicio) }}
                    </template>
                </el-table-column>

                <el-table-column prop="data_fim" label="Data Fim" width="150">
                    <template #default="data_fim">
                        <ElIcon class="mr-3">
                            <Timer />
                        </ElIcon> {{ $moment.format(data_fim.row.data_fim) }}
                    </template>
                </el-table-column>


                <el-table-column prop="situacao" label="Situação" width="150">
                    <template #default="atividade">
                        <el-tag v-if="atividade.row.situacao" type="success">Concluída</el-tag>
                        <el-tag v-else type="info">Pendente</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="acao" label="">
                    <template #default="atividade">
                        <el-button type="primary" plain size="small"
                            @click="atividadesStore.editar(atividade.row.uuid)">Editar</el-button>
                    </template>
                </el-table-column>
            </el-table>


            <el-empty v-else description="Ainda não existem atividades associadas a este projeto" />
        </template>
    </el-card>

    <div v-for="(item, index) in items" :key="index" class="draggable-item" ref="draggableItems"
        @mousedown="startDrag(index, $event)" @mousemove="drag($event)" @mouseup="endDrag" @mouseleave="endDrag"
        :style="{ top: item.top + 'px', left: item.left + 'px' }">
        {{ item.content }}
    </div>
</template>

<script>
import { ProjetoAtividadesStore } from '@/store/ProjetoAtividadesStore'
import AtividadesFromularioProjeto from './projeto.atividades.formulario.vue'
import { useRoute } from "vue-router";

export default {
    name: "ProjetoAtividades",
    data() {
        return {
            confirmacaoVisivel: false,
            atividades: [],
        }
    },
    setup() {
        const atividadesStore = ProjetoAtividadesStore()

        const route = useRoute();
        const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        if (uuidPattern.test(route.params.id)) {
            atividadesStore.listar(route.params.id)
            atividadesStore.projeto = route.params.id
        }

        return { atividadesStore }
    },
    async mounted() {

    },
    components: {
        AtividadesFromularioProjeto
    },
    methods: {
        tableRowClassName(rowIndex) {
            if (rowIndex === 1) {
                return 'warning-row'
            } else if (rowIndex === 3) {
                return 'success-row'
            }
            return ''
        },
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

table tr td {
    border-bottom: 1px dotted #cccccc;
}

table td,
table th td {
    text-align: left;
    width: 200px;
}

.draggable-item {
    cursor: move;
}
</style>