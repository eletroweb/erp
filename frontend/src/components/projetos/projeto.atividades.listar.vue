<template>
    <el-card class="box-card" shadow="never">
        <template #header>
            <div class="card-header">
                <span>Atividades do Projeto</span>
                <el-button class="btnCadastrar" type="success" @click="projetoStore.novo()" name="btnCadastrar">
                    Adicionar Atividade
                </el-button>
            </div>

            <AtividadesFromularioProjeto />


            <el-collapse v-model="activeNames" @change="handleChange">

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
                        <td style="width: 400px;">
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
                        </div>
                    </el-collapse-item>
                </div>
            </el-collapse>


            <div style="display: none;">
                <el-table :row-class-name="tableRowClassName" :data="atividadesStore.atividades" stripe
                    style="width: 99%">
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
                            <el-tag v-if="atividade.row.situacao" type="success">Concluída</el-tag>
                            <el-tag v-else type="info">Pendente</el-tag>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
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
            items: [
                { content: 'Item 1', top: 50, left: 50 },
                { content: 'Item 2', top: 150, left: 50 },
                { content: 'Item 3', top: 250, left: 50 }
            ],
            dragging: false,
            selectedIndex: null,
            startX: 0,
            startY: 0,
            startLeft: 0,
            startTop: 0
        }
    },
    setup() {
        const atividadesStore = ProjetoAtividadesStore()

        const route = useRoute();
        const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        if (uuidPattern.test(route.params.id)) {
            atividadesStore.listar(route.params.id)
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
        startDrag(index, event) {
            this.dragging = true;
            this.selectedIndex = index;
            this.startX = event.clientX;
            this.startY = event.clientY;
            this.startLeft = this.items[index].left;
            this.startTop = this.items[index].top;
        },
        drag(event) {
            if (this.dragging) {
                const offsetX = event.clientX - this.startX;
                const offsetY = event.clientY - this.startY;
                this.items[this.selectedIndex].left = this.startLeft + offsetX;
                this.items[this.selectedIndex].top = this.startTop + offsetY;
            }
        },
        endDrag() {
            this.dragging = false;
        }
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