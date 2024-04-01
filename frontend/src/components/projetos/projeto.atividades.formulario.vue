<template>

    <el-button id="btnCadastrar" type="success" @click="atividadeStore.novo()" name="btnCadastrar">
        Adicionar Atividade
    </el-button>


    <el-drawer v-model="atividadeStore.exibirFormulario" title="" size="50%">
        <div>
            <h4>
                {{ atividadeStore.atividade.descricao }}
            </h4>

            <el-form :model="atividadeStore.atividade" label-width="120px" v-if="atividadeStore.exibirFormulario">

                <q-input filled v-model="atividadeStore.atividade.descricao" label="Descrição" />

                <q-btn-toggle v-model="atividadeStore.atividade.situacao" class="situacao-toggle" no-caps rounded
                    unelevated toggle-color="primary" color="white" text-color="primary" :options="[
        { label: 'PENDENTE', value: 0 },
        { label: 'EM ANDAMENTO', value: 1 },
        { label: 'CANCELADA', value: 2 },
        { label: 'PAUSADA', value: 3 },
        { label: 'CONCLUÍDA', value: 4 },
    ]" />

                <div class="q-pa-md q-gutter-sm" style="height: 80px;">
                    <q-avatar v-for="n in 5" :key="n" size="40px" class="overlapping" :style="`left: ${n * 5}px`">
                        <img style="border-style: none;
    border: 1px solid #1976D2;
    padding: 1px;" :src="`https://cdn.quasar.dev/img/avatar${n + 1}.jpg`">
                    </q-avatar>
                </div>

                <label>Setor</label>


                <div v-for="setor in this.setores" :key="setor.uuid" style="    margin-right: 20px;">
                    <q-radio keep-color v-model="atividadeStore.atividade.setor.uuid" :val="setor.uuid"
                        :label="setor.descricao" color="blue" />
                </div>

                <label>Período</label>
                <q-date landscape v-model="atividadeStore.atividade.periodo" range />

                <div class="q-pa-md" style="max-width: 600px">
                    <q-input v-model="atividadeStore.atividade.observacao" filled type="textarea" label="Observação" />
                </div>

                <q-btn-group push style="position: absolute;top: 13px;">
                        <q-btn v-if="!atividadeStore.editarRegistro" 
                        @click="atividadeStore.cadastrar()" 
                        push
                        color="secondary"
                        label="Salvar" />

                        <q-btn v-else @click="atividadeStore.salvarEdicao()" push label="Salvar alteração"/>

                        <q-btn @click="atividadeStore.exibirFormulario = false" color="white" text-color="black"
                            label="Cancelar" />

                        <el-popover :visible="confirmacaoVisivel" placement="top" :width="200"
                            v-if="atividadeStore.atividade.uuid">
                            <p>Deseja confirma a exclusão da atividade
                                <el-tag type="danger">
                                    {{ atividadeStore.atividade.descricao }}
                                </el-tag>
                            </p>
                            <div style="text-align: right; margin: 0; display: flex;">
                                <el-button size="small" type="danger"
                                    @click="atividadeStore.deletar(atividadeStore.atividade.uuid)">Confirmar</el-button>
                            </div>
                            <template #reference>
                                <q-btn @click="confirmacaoVisivel = true" color="white" text-color="black"
                                    label="Excluir" />
                            </template>
                        </el-popover>
                    </q-btn-group>

            </el-form>
        </div>
    </el-drawer>

</template>

<script>
import { ProjetoAtividadesStore } from '@/store/ProjetoAtividadesStore'
import { SetorStore } from '../../store/SetorStore'

export default {
    name: "ProjetoAtividadesFormulario",
    props: ['projeto'],
    setup() {
        const atividadeStore = ProjetoAtividadesStore()
        return { atividadeStore }
    },
    async mounted() {
        const setorStore = SetorStore()
        this.setores = await setorStore.listar();
    },
    components: {
    },
    data() {
        return {
        }
    },
    methods: {
        tableRowClassName(rowIndex) {
            if (rowIndex === 1) {
                return 'warning-row'
            } else if (rowIndex === 3) {
                return 'success-row'
            }
            return ''
        }
    }
}
</script>

<style>
h4 {
    padding: 0;
    margin: 0;
    margin-top: 10px;
    margin-bottom: 10px;
}

.card-header {
    position: relative;
    height: 50px;
}

.btnCadastrar {
    position: absolute;
    right: 0;
}

#btnCadastrar {
    position: absolute;
    top: 32px;
    right: 37px;
}

.el-drawer__header {
    margin-bottom: 0px;
}

.el-drawer__body {
    padding-top: 10px;
}

#observacao {
    height: 200px;
}

.q-date--landscape-standard {
    min-width: 580px !important;
}

label {
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 10px;
    display: block;
}

.situacao-toggle span {
    font-size: 12px;
}
</style>