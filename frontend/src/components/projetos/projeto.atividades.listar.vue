<template>
    <AtividadesFromularioProjeto />

    <Fieldset v-if="atividadesStore.atividades.length > 0" legend="Atividades do projeto">
        <el-table :data="atividadesStore.atividades" stripe>
            <el-table-column prop="descricao" label="Descrição" width="220px">
                <template #default="atividade">
                    {{ atividade.row.descricao }}
                </template>
            </el-table-column>

            <el-table-column prop="setor" label="Setor" width="210px">
                <template #default="setor">
                    <q-chip outline color="primary" text-color="white" icon="star">
                        {{ setor.row.setor.descricao }}
                    </q-chip>
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
                    <Tag :severity="getStatus(atividade.row.situacao)" :value="getSituacao(atividade.row.situacao)"></Tag>
                </template>
            </el-table-column>

            <el-table-column prop="acao" label="">
                <template #default="atividade">
                    <el-button type="primary" plain
                        @click="atividadesStore.editar(atividade.row.uuid)">Editar</el-button>
                </template>
            </el-table-column>
        </el-table>
    </Fieldset>

    <el-empty v-else description="Ainda não existem atividades associadas a este projeto" />

    <!-- ProjetoAtividadesGantt /-->
</template>

<script>
import { ProjetoAtividadesStore } from '@/store/ProjetoAtividadesStore'
import AtividadesFromularioProjeto from './projeto.atividades.formulario.vue'
import ProjetoAtividadesGantt from './projeto.atividades.gantt.vue'
import { useRoute } from "vue-router";
import InputText from 'primevue/inputtext';
import Fieldset from 'primevue/fieldset';
import Tag from 'primevue/tag';

export default {
name: "ProjetoAtividades",
data() {
return {
    confirmacaoVisivel: false,
    atividades: []
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
AtividadesFromularioProjeto,
ProjetoAtividadesGantt,
InputText,
Fieldset
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
getSituacao(value) {
    const situacoes = [
        { label: 'PENDENTE', value: 'PENDING' },
        { label: 'EM ANDAMENTO', value: 'IN_PROGRESS' },
        { label: 'CANCELADA', value: 'CANCELLED' },
        { label: 'PAUSADA', value: 'PAUSED' },
        { label: 'CONCLUÍDA', value: 'COMPLETED' },
    ];

    for (const situacao of situacoes) {
        if (situacao.value === value) {
            return situacao.label;
        }
    }

    return null;
},
getStatus(value){
    if (value === 'IN_PROGRESS') {
        return 'info';
    } else if (value === 'CANCELLED') {
        return 'danger';
    } else if (value === 'PENDING') {
        return 'warn';
    } else if (value === 'COMPLETED') {
        return 'success';
    } else {
        return 'info';
    }
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

.p-tag-label {
font-size: 11px;
}
</style>