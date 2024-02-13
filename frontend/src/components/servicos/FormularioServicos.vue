<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Cadastrar Serviço</span>
                <el-popover :visible="confirmacaoVisivel" placement="top" :width="200" v-if="id">
                    <p>Deseja confirma a exclusão do Serviço
                        <el-tag type="danger">
                            {{ servicoStore.servico.descricao }}
                        </el-tag>
                    </p>
                    <div style="text-align: right; margin: 0; display: flex;">
                        <el-button size="small" type="primary" plain
                            @click="confirmacaoVisivel = false">Cancelar</el-button>
                        <el-button size="small" type="danger"
                            @click="servicoStore.excluir(servicoStore.servico.uuid)">Confirmar</el-button>
                    </div>
                    <template #reference>
                        <el-button type="danger" @click="confirmacaoVisivel = true">Excluir</el-button>
                    </template>
                </el-popover>
            </div>
        </template>

        <el-form :model="servicoStore.servico" label-width="120px">

            <el-form-item label="Contrato">
                <el-col :span="13">
                    <el-form-item label="">
                        <el-input v-model="servicoStore.servico.contrato" name="contrato" disabled />
                    </el-form-item></el-col>
            </el-form-item>
                        
            <el-form-item label="Descrição">
                <el-col :span="13">
                    <el-form-item label="">
                        <el-input v-model="servicoStore.servico.descricao" name="descricao" />
                    </el-form-item></el-col>
            </el-form-item>

            <el-form-item label="Valor">
                <el-col :span="13">
                    <el-form-item label="">
                        <el-input v-model="servicoStore.servico.valor" name="valor" />
                    </el-form-item></el-col>
            </el-form-item>

            <el-form-item label="Área">
                <el-radio-group v-model="servicoStore.servico.setor" class="ml-4" name="setor">
                    <div v-for="setor in this.setores" :key="setor.uuid" style="    margin-right: 20px;">
                        <el-radio ce :label="setor.uuid" size="large">
                            {{ setor.descricao }}
                        </el-radio>
                    </div>
                </el-radio-group>
            </el-form-item>
            
            <el-form-item label="Situação">
                <el-switch v-model="servicoStore.servico.situacao" />
            </el-form-item>

            <el-form-item>

                <el-button v-if="this.id == null" type="primary" @click="servicoStore.cadastrar()">
                    Salvar
                </el-button>

                <el-button v-else type="primary" @click="servicoStore.editar(servicoStore.servico.uuid)">
                    Salvar alterações
                </el-button>

                <el-button class="btn" @click="servicoStore.cancelar()">Cancelar</el-button>
            </el-form-item>

        </el-form>
    </el-card>
</template>

<script>
import { useServicoStore } from '../../store/ServicoStore'
import { SetorStore } from '../../store/SetorStore'

export default {
    setup() {
        const servicoStore = useServicoStore()
        return { servicoStore }
    },
    data() {
        return {
            id: null,
            setores: [],
            setorSelecionado: null
        }
    },

    async mounted() {
        // TODO mover isso para um utilitário
        const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        if (uuidPattern.test(this.$route.params.id)) {
            this.id = this.$route.params.id
            this.servicoStore.carregarServico(this.id)
        }

        const setorStore = SetorStore()
        this.setores = await setorStore.listar();
        this.getSetor()
    },
    methods: {
        getSetor() {
            if (this.servicoStore.servico.setor && this.servicoStore.servico.setor.uuid) {
                this.setorSelecionado = this.servicoStore.servico.setor.uuid
            } else {
                this.setorSelecionado = this.setores[0].uuid
            }
        }
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