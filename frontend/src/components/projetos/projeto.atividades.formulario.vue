<template>

    <el-button id="btnCadastrar" type="success" @click="atividadeStore.novo()" name="btnCadastrar">
        Adicionar Atividade
    </el-button>


    <el-drawer v-model="atividadeStore.exibirFormulario" title="Atividade" size="50%">
        <div>
            <h2>
                {{ atividadeStore.atividade.descricao }}
            </h2>

            <el-form :model="atividadeStore.atividade" label-width="120px" v-if="atividadeStore.exibirFormulario">
                <el-form-item label="Descrição">
                    <el-input v-model="atividadeStore.atividade.descricao" name="responsavel" id="responsavel" />
                </el-form-item>

                <el-form-item label="Setor">
                    <el-radio-group v-model="atividadeStore.atividade.setor.uuid" class="ml-4" name="setor">
                        <div v-for="setor in this.setores" :key="setor.uuid" style="    margin-right: 20px;">
                            <el-radio ce :label="setor.uuid" size="large">
                                {{ setor.descricao }}
                            </el-radio>
                        </div>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="Início">
                    <el-col :span="7">
                        <el-date-picker :locale="ptBR" format="DD/MM/YYYY"
                            v-model="atividadeStore.atividade.data_inicio" type="date" placeholder="Data Início"
                            style="width: 100%" />
                    </el-col>
                    <el-col :span="3">
                        <span style=" margin-left: 18px;">
                            Fim
                        </span>
                    </el-col>
                    <el-col :span="10">
                        <el-date-picker :locale="ptBR" format="DD/MM/YYYY" v-model="atividadeStore.atividade.data_fim"
                            type="date" placeholder="Data Fim" style="width: 100%" />
                    </el-col>
                </el-form-item>

                <el-form-item label="Observação">
                    <el-input v-model="atividadeStore.atividade.observacao" type="textarea" name="observacao"
                        id="observacao" />
                </el-form-item>

                <el-form-item label="Situação">
                    <el-switch v-model="atividadeStore.atividade.situacao" />
                </el-form-item>

                <el-form-item>
                    <el-button v-if="!atividadeStore.editarRegistro" type="primary" @click="atividadeStore.cadastrar()">
                        Salvar
                    </el-button>

                    <el-button v-else type="primary" @click="atividadeStore.salvarEdicao()">
                        Salvar alteração
                    </el-button>

                    <el-button type="info" plain @click="atividadeStore.exibirFormulario = false">
                        Cancelar
                    </el-button>


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
                            <el-button type="danger" @click="confirmacaoVisivel = true">Excluir</el-button>
                        </template>
                    </el-popover>


                </el-form-item>

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
    height: 300px;
}
</style>