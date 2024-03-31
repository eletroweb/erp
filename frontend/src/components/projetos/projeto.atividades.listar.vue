<template>
    <el-card class="box-card" shadow="never">
        <template #header>
            <div class="card-header">
                <span>Atividades do Projeto</span>
            </div>

            <AtividadesFromularioProjeto />

            <el-collapse v-model="activeNames" @change="handleChange" v-if="atividadesStore.atividades.length > 0">

                <table style="width: 100%; border: 0px; padding: 0;">
                    <thead>
                        <th>
                        <td style="width: 5px;">
                            <el-tooltip placement="top">
                                <template #content> <b>Prioridade</b>
                                    <br />Arraste a atividade para cima ou para baixo
                                    <br /> para ordenar a priorização de execução</template>
                                <el-icon>
                                    <InfoFilled />
                                </el-icon>
                            </el-tooltip>

                        </td>
                        <td style="width: 476px;">
                            Atividade
                        </td>
                        <td style="width: 131px">
                            Data Início
                        </td>
                        <td style="width: 131px">
                            Data Fim
                        </td>
                        <td style="width: 149px;">
                            Situação
                        </td>
                        </th>
                    </thead>
                </table>

                <div v-for="atividade in atividadesStore.atividades" class="draggable-item">
                    <el-collapse-item :name="atividade.uuid">
                        <template #title>
                            <table style="width: 100%;" id="atividades">
                                <tbody>
                                    <tr>
                                        <td style="width: 46px;">
                                            <el-tooltip class="box-item" effect="dark" content="Prioridade de execução"
                                                placement="top-start">
                                                <el-tag type="primary">
                                                    #{{ atividade.prioridade }}
                                                </el-tag>
                                            </el-tooltip>
                                        </td>
                                        <td style="width: 200px;">
                                            {{ atividade.descricao }}
                                        </td>
                                        <td style="width: 64px">
                                            <ElIcon class="mr-3">
                                                <Timer />
                                            </ElIcon> {{ $moment.format(atividade.data_inicio) }}
                                        </td>
                                        <td style="width: 64px">
                                            <ElIcon class="mr-3">
                                                <Timer />
                                            </ElIcon>
                                            {{ $moment.format(atividade.data_fim) }}
                                        </td>
                                        <td style="width: 55px;">
                                            <el-tag v-if="atividade.situacao" type="success">Concluída</el-tag>
                                            <el-tag v-else type="info">Pendente</el-tag>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </template>
                        <div>
                            {{ atividade.observacao }}
                            <el-button type="danger" @click="atividadesStore.deletar(atividade.uuid)">Excluir</el-button>
                        </div>
                    </el-collapse-item>
                </div>
            </el-collapse>

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