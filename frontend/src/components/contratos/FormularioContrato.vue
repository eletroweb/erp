<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Cadastrar Contrato</span>
                <el-popover :visible="confirmacaoVisivel" placement="top" :width="200" v-if="id">
                    <p>Deseja confirma a exclusão do contrato
                        <el-tag type="danger">
                            {{ contratoStore.contrato.descricao }}
                        </el-tag>
                    </p>
                    <div style="text-align: right; margin: 0; display: flex;">
                        <el-button size="small" type="primary" plain
                            @click="confirmacaoVisivel = false">Cancelar</el-button>
                        <el-button size="small" type="danger"
                            @click="contratoStore.excluir(contratoStore.contrato.uuid)">Confirmar</el-button>
                    </div>
                    <template #reference>
                        <el-button type="danger" @click="confirmacaoVisivel = true">Excluir</el-button>
                    </template>
                </el-popover>

            </div>
        </template>

        <el-form :model="contratoStore.contrato" label-width="120px">
            <el-form-item label="Nome">
                <el-input v-model="contratoStore.contrato.descricao" />
            </el-form-item>

            <el-form-item label="Orçamento">

                <el-input v-model="contratoStore.contrato.orcamento" placeholder="Orçamento">
                    <template #prepend>R$</template>
                </el-input>
            </el-form-item>



            <el-form-item label="Início">
                <el-col :span="5">
                    <el-date-picker :locale="ptBR" format="DD/MM/YYYY" v-model="contratoStore.contrato.data_inicio"
                        type="date" placeholder="Data Início" style="width: 100%" />
                </el-col>
                <el-col :span="2">
                    <span style=" margin-left: 18px;">
                        Fim
                    </span>
                </el-col>
                <el-col :span="5">
                    <el-date-picker :locale="ptBR" format="DD/MM/YYYY" v-model="contratoStore.contrato.data_fim" type="date"
                        placeholder="Data Fim" style="width: 100%" />
                </el-col>
            </el-form-item>

            <el-form-item label="Situação">
                <el-switch v-model="contratoStore.contrato.situacao" />
            </el-form-item>
            <el-form-item>

                <el-button v-if="this.id == null" type="primary" @click="contratoStore.cadastrar()">
                    Salvar
                </el-button>

                <el-button v-else type="primary" @click="contratoStore.editar(contratoStore.contrato.uuid)">
                    Salvar alterações
                </el-button>

                <el-button class="btn" @click="contratoStore.cancelar()">Cancelar</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import { useContratoStore } from '../../store/ContratoStore'
import { ElConfigProvider } from 'element-plus'
import ptBR from 'element-plus/dist/locale/pt-br.mjs'

export default {
    setup() {
        const contratoStore = useContratoStore()
        return { contratoStore, locale: ptBR, }
    },
    components: {
        ElConfigProvider,
    },
    data() {
        return {
            confirmacaoVisivel: false,
            id: null
        }
    },
    async mounted() {
        // TODO mover isso para um utilitário
        const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        if (uuidPattern.test(this.$route.params.id)) {
            this.id = this.$route.params.id
            this.contratoStore.carregarContrato(this.id)
        }
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